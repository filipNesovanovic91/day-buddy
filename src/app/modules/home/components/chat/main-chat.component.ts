import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MessageUtilityService } from '../services/message-utility.service';
import { Observable, Subject, map, take, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageHttpService } from '../services/message-http.service';
import { ChatMessageModel } from '../../models/chat-message.model';
import { ChatButton } from '../../models/chat-button.model';
import { MentorModel } from '../../models/mentor.model';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent implements OnInit, OnDestroy {
  messages$: Observable<ChatMessageModel[]> =
    this.messageUtilityService.messages$;
  newMessage: string = '';
  disabledInputField: boolean = true;
  profileMentor?: MentorModel;
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private messageUtilityService: MessageUtilityService,
    private messageHttpService: MessageHttpService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.messageHttpService.connectSignalR();
  }

  disableButtonsAfterSelect(
    indexClicked: number,
    buttons: ChatButton[],
    api: string
  ): void {
    buttons.forEach((button, index) => {
      button.selected = index !== indexClicked;
    });

    const urlApi = api.indexOf('chat/');
    const endpoint = api.substring(urlApi);

    this.messageHttpService
      .callApiFromButton(endpoint)
      .pipe(take(1))
      .subscribe();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageHttpService.sendMessage(this.newMessage).subscribe();
      this.newMessage = '';
    }
  }

  sendMessageToAI() {
    this.disabledInputField = false;
    this.messageHttpService
      .sendMessageToAI()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((response) => {
          this.messageUtilityService.setChatId(response?.chatId);
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}
