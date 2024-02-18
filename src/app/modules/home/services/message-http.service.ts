import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as signalR from '@microsoft/signalr';

import { MessageUtilityService } from "./message-utility.service";


import { BehaviorSubject, Observable } from "rxjs";
import { CoreHttpService } from "../../../core/http/core-http.service";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../auth/services/auth.service";
import { ChatMessageModel } from "../models/chat-message.model";
import { NewMessage } from "../models/new-message.model";
import { ExistingChatModel } from "../models/existing-chat.model";

@Injectable()
export class MessageHttpService extends CoreHttpService {
    private connection = new signalR.HubConnectionBuilder().withUrl(environment.apiUrl + '/newChat').build();
    private isTyping$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
    public isTyping$ = this.isTyping$$.asObservable();

    constructor(protected override http: HttpClient, private messageUtilityService: MessageUtilityService, private authService: AuthService) {
        super(http);
    }

    connectSignalR() {
        this.connection.start().then(() => console.log('Connection opened!'));
        this.connection.on('typing', (response: boolean) => {
            this.setTyping(response);
        });
        this.connection.on('message', (response: ChatMessageModel) => {
            if(response.ai) {
              this.setTyping(false); 
            } 
          this.messageUtilityService.addMessages(this.messageUtilityService.getMessages().concat(response));  
        });
    }

    setTyping(typing: boolean) {
        this.isTyping$$.next(typing);
    }

    disconnectSignalR() {
        this.connection.stop().then(() => {
            console.log('Connection closed!'); 
            // After the connection is stopped, reset UI and start a new connection
            this.messageUtilityService.resetChatUI();
        })
    }

    sendMessage(message: string) {
        let chatId = this.messageUtilityService.getChatId();
        

        const messageBody: NewMessage = {
            chatId: chatId,
            message: message
        };

        return this.post<any>(`new-message`, messageBody);
    }

    callApiFromButton(api: string) {
        return this.get<any>(api, '');
    }

    sendMessageToAI() {
        return this.post<any>(`chats`, {});   
    }

    setSavedChatOnUI(chatId: number): Observable<ExistingChatModel> { 
        return this.get<ExistingChatModel>('chats/', `${chatId}`);
    }

}