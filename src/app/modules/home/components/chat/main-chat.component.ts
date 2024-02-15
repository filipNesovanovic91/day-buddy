import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { ChatMessageModel } from '../../models/chat-message.model';
import { ChatButton } from '../../models/chat-button.model';
import { MessageUtilityService } from '../../services/message-utility.service';
import { MessageHttpService } from '../../services/message-http.service';
import { ActivatedRoute } from '@angular/router';
import { MentorModel } from '../../models/mentor.model';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../models/user.model';
import { ExistingChatModel } from '../../models/existing-chat.model';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
  providers: [MessageHttpService],
})
export class MainChatComponent implements OnInit, OnDestroy {
  chatId = 0;
  messages$: Observable<ChatMessageModel[]> =
    this.messageUtilityService.messages$;
  typing$: Observable<boolean> = this.messageHttpService.isTyping$;
  newMessage: string = '';
  disabledInputField: boolean = true;
  profileMentor?: MentorModel;
  showMoreItems: boolean = false;
  user!: User;
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private messageUtilityService: MessageUtilityService,
    private messageHttpService: MessageHttpService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.messageHttpService.connectSignalR();
    this.chatId = +this.activatedRouter.snapshot.paramMap.get('chatId')!;
    this.messageUtilityService.setUrlChatId(this.chatId);
    const deleteInProgres = this.messageUtilityService.getDeleteInProgres();
    if (deleteInProgres) {
      this.messageUtilityService.setDeleteInProgres(false);
      return;
    }

    if (this.chatId > 0) {
      // Implement logic to open the selected chat
      this.messageHttpService
        .setSavedChatOnUI(this.chatId)
        .subscribe((result) => {
          if (result) {
            this.checkDisabledButtonsInResponse(result);
            this.disabledInputField = false;
            this.messageUtilityService.setChatId(this.chatId);
            this.messageUtilityService.addMessages(result.messages);
          }
        });
      console.log(`Opening current chat with Id ${this.chatId}`);
    }

    const token = this.authService.getAccessToken();
    this.user = this.authService.decodeToken(token ?? '');
  }

  checkDisabledButtonsInResponse(result: ExistingChatModel): ExistingChatModel {
    result.messages.forEach(message => {
      message.buttons.forEach(button => {
        button.isDisabled = !button.selected; 
      }); 
    });

    const lastMessageIndex = result.messages.length - 1;
    const lastMessage = result.messages[lastMessageIndex]; 
    const allButtonsDeselected = lastMessage.buttons.every(button => !button.selected);
    if(allButtonsDeselected) {
      lastMessage.buttons.forEach(button => {
        button.isDisabled = false;
      });
    }
    return result;
  }

  selectButton(
    indexClicked: number,
    buttons: ChatButton[],
    api: string
  ): void {
    buttons.forEach((button, index) => {
      button.selected = index === indexClicked;   
    });
    
    buttons.forEach((button) => {
      button.isDisabled = !button.selected; 
    }); 

    this.messageHttpService
      .callApiFromButton(api) 
      .pipe(take(1))
      .subscribe();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageHttpService.sendMessage(this.newMessage).subscribe();
      this.newMessage = '';
    }
  }

  sendSuggestionMessageToAI() {
    this.disabledInputField = false;
    this.messageHttpService
      .sendMessageToAI()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((response) => {
          this.messageUtilityService.setChatId(response?.chatId);
          this.messageUtilityService.setUrlChatId(response?.chatId);
        })
      )
      .subscribe();
  }

  openModal(mentor: MentorModel) {
    const modal = document.getElementById('modal');
    this.renderer.addClass(modal, 'display-block');
    this.profileMentor = mentor;
  }

  exitModal() {
    const modal = document.getElementById('modal');
    this.renderer.removeClass(modal, 'display-block');
  }

  toggleShowMore() {
    this.showMoreItems = !this.showMoreItems;
  }

  scheduleMeeting(scheduleApi: string) {  
    this.messageHttpService
      .callApiFromButton(scheduleApi) 
      .pipe(take(1))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.messageHttpService.disconnectSignalR();
    this.messageUtilityService.resetChatUI();
    this.unsubscribe$.next(true);
  }
}
