import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";

import { Observable, Subject, map, take, takeUntil, tap } from "rxjs";
import { AuthService } from "../../../auth/services/auth.service";
import { ChatMessageModel } from "../../models/chat-message.model";
import { ChatButton } from "../../models/chat-button.model";
import { MessageUtilityService } from "../../services/message-utility.service";
import { MessageHttpService } from "../../services/message-http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-main-chat',
    templateUrl: './main-chat.component.html',
    styleUrl: './main-chat.component.scss',
    providers: [MessageHttpService] 
})
export class MainChatComponent implements OnInit, OnDestroy {
    chatId = 0;
    messages$: Observable<ChatMessageModel[]> = this.messageUtilityService.messages$;  
    newMessage: string = '';
    disabledInputField: boolean = true; 
    private unsubscribe$ = new Subject<boolean>();


    constructor(private messageUtilityService: MessageUtilityService, private messageHttpService: MessageHttpService, private activatedRouter: ActivatedRoute) {
        
    }

    ngOnInit(): void {
        this.messageHttpService.connectSignalR(); 
        this.chatId = +this.activatedRouter.snapshot.paramMap.get('chatId')!;

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

    sendMessageToAI() {
        this.disabledInputField = false; 
        this.messageHttpService.sendMessageToAI().pipe(
            takeUntil(this.unsubscribe$),
            tap((response) =>{
                this.messageUtilityService.setChatId(response?.chatId)
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.messageHttpService.disconnectSignalR(); 
        this.messageUtilityService.resetChatUI(); 
        this.unsubscribe$.next(true);
    }
}
