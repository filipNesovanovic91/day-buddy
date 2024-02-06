import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageUtilityService {
  private messagesSubject$ = new BehaviorSubject<string[]>([]);
  public messages$ = this.messagesSubject$.asObservable();

  constructor() {

  }

  addMessages(messages: string[]): void {
    this.messagesSubject$.next(messages);
  }

  getMessages(): string[] {
    return this.messagesSubject$.value;
  }

  addMessageToChat(message: string): void {
    const currentMessages = this.messagesSubject$.value;
    const updatedMessages = [...currentMessages, message];
    this.messagesSubject$.next(updatedMessages);
  }
}