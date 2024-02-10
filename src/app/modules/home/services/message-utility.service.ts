import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
import { ChatMessageModel } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageUtilityService {
  private messagesSubject$ = new BehaviorSubject<ChatMessageModel[]>([]);
  public messages$ = this.messagesSubject$.asObservable();
  public chatId: number = 0;  

  constructor() {

  }

  addMessages(messages: ChatMessageModel[]): void {
    this.messagesSubject$.next(messages);
  }

  getMessages(): ChatMessageModel[] {
    return this.messagesSubject$.value;
  }

  addMessageToChat(message: ChatMessageModel): void {
    const currentMessages = this.messagesSubject$.value;
    const updatedMessages = [...currentMessages, message];
    this.messagesSubject$.next(updatedMessages);
  }

  resetChatUI() {
    this.messagesSubject$.next([]);
  }

  setChatId(chatId: number) {
    this.chatId = chatId;
  }

  getChatId():number {
    return this.chatId as number;
  }

  getFormatedChatHistoryTitle(currentDate: Date, updatedAtDate: Date): string {
    const diffTime = Math.abs(currentDate.getTime() - updatedAtDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return 'Previous 7 days';
    } else if (diffDays <= 30) {
      return 'Previous 30 days';
    } else {
      return 'More than 30 days ago';
    }
  }
}