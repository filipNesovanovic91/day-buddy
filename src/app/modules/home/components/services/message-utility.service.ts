import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessageModel } from '../../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageUtilityService {
  private messagesSubject$ = new BehaviorSubject<ChatMessageModel[]>([]);
  public messages$ = this.messagesSubject$.asObservable();

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
}