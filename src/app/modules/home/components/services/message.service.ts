import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject$ = new BehaviorSubject<string[]>([]);
  public messages$ = this.messagesSubject$.asObservable();

  constructor() {}

  addMessage(message: string) {
    const currentMessages = this.messagesSubject$.value;
    const updatedMessages = [...currentMessages, message];
    this.messagesSubject$.next(updatedMessages);
  }
}