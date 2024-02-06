import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MessageUtilityService } from "../services/message-utility.service";
import { Observable, Subject, map, take, takeUntil } from "rxjs";
import { AuthService } from "../../../auth/services/auth.service";
import { MessageHttpService } from "../services/message-http.service";
import { ChatMessageModel } from "../../models/chat-message.model";

@Component({
    selector: 'app-main-chat',
    templateUrl: './main-chat.component.html',
    styleUrl: './main-chat.component.scss'
})
export class MainChatComponent implements OnInit, OnDestroy {
    messages$: Observable<ChatMessageModel[]> = this.messageUtilityService.messages$;  
    newMessage: string = '';
    disabledInputField: boolean = true;
    private unsubscribe$ = new Subject<boolean>();


    constructor(private messageUtilityService: MessageUtilityService, private authService: AuthService, private messageHttpService: MessageHttpService) {

    }

    ngOnInit(): void {
        this.messageHttpService.listenSignalR();
        
    }

    sendMessage() { 
        const chatMessageModel: ChatMessageModel = {
            ai: false,
            buttons: [],
            mentor: 0,
            messages: [this.newMessage]
        };

        if (this.newMessage.trim() !== '') {
          this.messageUtilityService.addMessageToChat(chatMessageModel);
          // Mock the response from the DayBaddy
          // When we added BE integration, here we will put call to the API 
          //this.messageUtilityService.addMessageToChat(`DayBaddy: Mock response...`);
        //   this.messageHttpService.sendMessage(this.newMessage).pipe(
        //     take(1)
        //   ).subscribe(result => {
        //     console.log(result)
        //   })
          this.newMessage = '';
        }
    }

    sendMessageToAI() {
        this.disabledInputField = false;
        this.messageHttpService.sendMessageToAI().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
    }
}
