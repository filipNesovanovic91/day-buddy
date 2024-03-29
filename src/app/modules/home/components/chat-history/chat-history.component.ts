import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ChatHistory } from '../../models/chat-history.model';
import { Router } from '@angular/router';
import { MessageUtilityService } from '../../services/message-utility.service';
import { ChatHistoryService } from '../../services/chat-history.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  @Input() chatHistory: ChatHistory[] = [];
  @Output() reloadChatHistory = new EventEmitter<void>();

  constructor(
    private router: Router,
    private messageUtilityService: MessageUtilityService,
    private chatHistoryService: ChatHistoryService,
  ) {}

  ngOnInit(): void {}

  selectChat(chatId: number) {
    this.reloadChatHistory.emit();
    // Emit an event to inform the parent component to open the selected chat
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['home/chat/' + chatId]);
  }

  startNewChat() {
    const chatId = this.messageUtilityService.getChatId();
    if (chatId > 0) {
      this.reloadChatHistory.emit();
    }
    // Emit an event to inform the parent component to start a new chat
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['home/chat']);
  }

  public deleteChat(chatId: number, event: Event): void {
    event.stopPropagation();
    const urlChatId = this.messageUtilityService.getUrlChatId()
    this.messageUtilityService.setDeleteInProgres(true);
    this.chatHistoryService.deleteChatById(chatId).pipe(
      take(1),
      tap(() => {
        this.reloadChatHistory.emit();
        if(chatId === urlChatId) {
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
      
          this.router.onSameUrlNavigation = 'reload';
      
          this.router.navigate(['home/chat']);
        }
      })
    ).subscribe();
  }

  public clearChatHistory(): void {
    const chatIdUrl = this.messageUtilityService.getUrlChatId();
    this.chatHistoryService.clearChatHistory(chatIdUrl).pipe(
      take(1),
      tap(() => {
        this.reloadChatHistory.emit(); 
      })
    ).subscribe();
  }

  ngOnDestroy(): void {}
}
