import { Component, OnDestroy, OnInit, Renderer2} from "@angular/core";

import { Observable, Subject, take, takeUntil, tap } from "rxjs";
import { ChatMessageModel } from "../../models/chat-message.model";
import { ChatButton } from "../../models/chat-button.model";
import { MessageUtilityService } from "../../services/message-utility.service";
import { MessageHttpService } from "../../services/message-http.service";
import { ActivatedRoute } from "@angular/router";
import { MentorModel } from "../../models/mentor.model";

@Component({
    selector: 'app-main-chat',
    templateUrl: './main-chat.component.html',
    styleUrl: './main-chat.component.scss',
    providers: [MessageHttpService] 
})
export class MainChatComponent implements OnInit, OnDestroy {
    chatId = 0;
    messages$: Observable<ChatMessageModel[]> = this.messageUtilityService.messages$; 
    typing$: Observable<boolean> = this.messageHttpService.isTyping$; 
    newMessage: string = '';
    disabledInputField: boolean = true; 
    profileMentor?: MentorModel;
    private unsubscribe$ = new Subject<boolean>();

    constructor(private messageUtilityService: MessageUtilityService, private messageHttpService: MessageHttpService, private activatedRouter: ActivatedRoute, private renderer: Renderer2) {
        
    }

    ngOnInit(): void {
        this.messageHttpService.connectSignalR(); 
        this.chatId = +this.activatedRouter.snapshot.paramMap.get('chatId')!;
        this.messageUtilityService.setUrlChatId(this.chatId);
        const deleteInProgres = this.messageUtilityService.getDeleteInProgres();
        if(deleteInProgres) {
          this.messageUtilityService.setDeleteInProgres(false);
          return;
        }

        if (this.chatId > 0) {
            // Implement logic to open the selected chat
            this.messageHttpService.setSavedChatOnUI(this.chatId).subscribe(result => {
              if(result) {
                this.disabledInputField = false; 
                this.messageUtilityService.setChatId(this.chatId);  
                this.messageUtilityService.addMessages(result.messages); 
              }
            });
            console.log(`Opening current chat with Id ${this.chatId}`);
          } 
    }
    
    disableButtonsAfterSelect(indexClicked: number, buttons: ChatButton[], api: string): void {
        buttons.forEach((button, index) => {
          button.selected = index !== indexClicked;
        }); 

        const urlApi = api.indexOf("chat/");
        const endpoint = api.substring(urlApi);

        this.messageHttpService.callApiFromButton(endpoint)
        .pipe(
            take(1)
        )
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
        this.messageHttpService.sendMessageToAI().pipe(
            takeUntil(this.unsubscribe$),
            tap((response) =>{
                this.messageUtilityService.setChatId(response?.chatId)
                this.messageUtilityService.setUrlChatId(response?.chatId)
            })
        ).subscribe();
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
        this.messageHttpService.disconnectSignalR(); 
        this.messageUtilityService.resetChatUI(); 
        this.unsubscribe$.next(true);
    }
}
