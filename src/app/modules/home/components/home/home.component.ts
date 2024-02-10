import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageHttpService } from '../services/message-http.service';
import { ChatHistory } from '../../models/chat-history.model';
import { Observable } from 'rxjs';
import { MessageUtilityService } from '../services/message-utility.service';
import { MainChatComponent } from '../chat/main-chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MainChatComponent) mainChatComponent!: MainChatComponent;

  chatHistory$: Observable<ChatHistory[]> = this.messageHttpService.getChatHistory(); 

  constructor(private authService: AuthService, private messageHttpService: MessageHttpService, private messageUtilityService: MessageUtilityService) {

  }

  ngOnInit(): void {
    const token = this.authService.getAccessToken();
    const decodedToken = this.authService.decodeToken(token ?? ''); 
    console.log(decodedToken);
  }

  ngOnDestroy(): void {
    
  }

  openChat(chatId: number) {
    if (chatId) {
      // Implement logic to open the selected chat
      this.messageHttpService.reconnectSignalR(); 
      this.messageHttpService.setSavedChatOnUI(chatId).subscribe(result => {
        if(result) {
          this.mainChatComponent.disabledInputField = false; 
          this.messageUtilityService.setChatId(chatId);  
          this.messageUtilityService.addMessages(result.messages); 
        }
      });
      console.log(`Opening current chat with Id ${chatId}`);
    } else {
      // Implement logic to start a new chat
      console.log('Starting a new chat...');
    }
  }

}
