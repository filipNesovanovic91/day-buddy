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

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  @Input() chatHistory: ChatHistory[] = [];
  @Output() reloadChatHistory = new EventEmitter<void>();
  @Output() deletSingleChat = new EventEmitter<number>();

  constructor(
    private router: Router,
    private messageUtilityService: MessageUtilityService
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

  public deleteChat(chatId: number): void {
    console.log('obrisi', chatId);
  }

  public clearChatHistory(): void {}

  ngOnDestroy(): void {}
}
