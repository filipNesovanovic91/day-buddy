import { Component } from "@angular/core";
import { MessageService } from "../services/message.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-main-chat',
    templateUrl: './main-chat.component.html',
    styleUrl: './main-chat.component.scss'
})
export class MainChatComponent {
    messages$: Observable<string[]> = this.messageService.messages$;  
    newMessage: string = '';


    constructor(private messageService: MessageService) {

    }

    sendMessage() { 
        if (this.newMessage.trim() !== '') {
          this.messageService.addMessage(`User: ${this.newMessage}`);
          // Mock the response from the DayBaddy
          // When we added BE integration, here we will put call to the API 
          this.messageService.addMessage(`DayBaddy: Mock response...`);
          this.newMessage = '';
        }
    }
}
