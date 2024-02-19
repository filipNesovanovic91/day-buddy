import { Injectable } from "@angular/core";
import { CoreHttpService } from "../../../core/http/core-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../auth/services/auth.service";
import { ChatHistory } from "../models/chat-history.model";
import { map } from "rxjs";
import { MessageUtilityService } from "./message-utility.service";

@Injectable({
    providedIn: 'root'
})
export class ChatHistoryService extends CoreHttpService {

    constructor(protected override http: HttpClient, private authService: AuthService, private messageUtilityService: MessageUtilityService) {
        super(http)
    }

    getChatHistory() {
        return this.get<ChatHistory[]>(`chats`, '').pipe(
            map(chatHistory => {
              const currentDate = new Date();
              return chatHistory.map(item => {
                const updatedAtDate = new Date(item.updatedAt);
                item.updatedAt = this.messageUtilityService.getFormatedChatHistoryTitle(currentDate, updatedAtDate);
                return item;
              });
            })
        );
    }

    deleteChatById(chatId: number) {
        return this.delete<number>(`chats/${chatId}`);
    }

    clearChatHistory(chatId: number) {
        return this.delete(`clear-chat-history/${chatId}`);
    }

}