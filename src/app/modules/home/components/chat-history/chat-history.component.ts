import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { IChatHistory } from "../../models/chat-history.model";

@Component({
    selector: 'app-chat-history',
    templateUrl: './chat-history.component.html',
    styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
    @Output() openChat = new EventEmitter<number>();
     // Mock chat history data
     chatHistory: IChatHistory[] = [
        { chatId: 1, userId: 1, createdAt: new Date(), content: 'Hi there!', isCurrent: false, title: 'Monday', updatedAt: new Date()}
    ];

    constructor() {

    }

    ngOnInit(): void {
        
    }

    selectChat(chatId: number) {
        // Emit an event to inform the parent component to open the selected chat
        this.openChat.emit(chatId);
    }

    startNewChat() {
        // Emit an event to inform the parent component to start a new chat
        this.openChat.emit(0); 
    }


    ngOnDestroy(): void {
        
    }
}