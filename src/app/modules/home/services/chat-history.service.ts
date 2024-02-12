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
        // TODO: refactor set of token into headers 
         // Move to Auth interceptor
         const token = this.authService.getAccessToken();

         const headers = new HttpHeaders({
             'Authorization': 'Bearer ' + token 
         });
     
         // Set options with headers
         const options = {
             headers: headers
         };

        return this.get<ChatHistory[]>(`chats`, '', options).pipe(
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

        // TODO: refactor set of token into headers 
        // Move to Auth interceptor
        const token = this.authService.getAccessToken();

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token 
        });
     
        // Set options with headers
        const options = {
            headers: headers
        };

        return this.delete<number>(`chats/${chatId}`, options);
    }

    clearChatHistory() {

        // TODO: refactor set of token into headers 
        // Move to Auth interceptor
        const token = this.authService.getAccessToken();

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token 
        });
     
        // Set options with headers
        const options = {
            headers: headers
        };

        return this.delete(`chats`, options);
    }

}