import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatHistory } from '../../models/chat-history.model';
import { Observable, take } from 'rxjs';
import { ChatHistoryService } from '../../services/chat-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  chatHistory$: Observable<ChatHistory[]> = this.chatHistoryService.getChatHistory();  

  constructor(private authService: AuthService, private chatHistoryService: ChatHistoryService) {

  }

  ngOnInit(): void {
    const token = this.authService.getAccessToken();
    const decodedToken = this.authService.decodeToken(token ?? ''); 
    console.log(decodedToken);
  }

  refreshChatHistory() {
    this.chatHistory$ = this.chatHistoryService.getChatHistory();  
  }

  ngOnDestroy(): void {
    
  }

}
