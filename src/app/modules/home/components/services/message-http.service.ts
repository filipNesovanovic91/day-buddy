import { Injectable } from "@angular/core";
import { CoreHttpService } from "../../../../core/http/core-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../../environments/environment';
import { AuthService } from "../../../auth/services/auth.service";
import { ChatMessageModel } from "../../models/chat-message.model";
import { NewMessage } from "../../models/new-message.model";
import { ChatHistory } from "../../models/chat-history.model";
import { Observable, map } from "rxjs";
import { ExistingChatModel } from "../../models/existing-chat.model";
import { MessageUtilityService } from "../../services/message-utility.service";

@Injectable()
export class MessageHttpService extends CoreHttpService { 
    private connection: any;  

    constructor(protected override http: HttpClient, private messageUtilityService: MessageUtilityService, private authService: AuthService) {
        super(http);
    }

    connectSignalR() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(environment.apiUrl + '/newChat').build();
        this.connection.start().then(() => console.log('Connection opened!'));
        this.connection.on('message', (response: ChatMessageModel) => {
            console.log(response);  
          this.messageUtilityService.addMessages(this.messageUtilityService.getMessages().concat(response));  
        });
    }

    reconnectSignalR() {
        if (this.connection) {
            // Check if the connection is in the 'Connected' state or not
            if (this.connection.state === "Connected") {
                // If it's in the 'Connected' state, stop the connection
                this.connection.stop().then(() => {
                    console.log('Connection closed!'); 
                    // After the connection is stopped, reset UI and start a new connection
                    this.messageUtilityService.resetChatUI();
                    this.connectSignalR();
                })
            } else if (this.connection.state === "Disconnected") {
                // If it's in the 'Disconnected' or 'Connecting' state, simply start a new connection
                this.connectSignalR();
            }
        }
    }

    sendMessage(message: string) {
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

        let chatId = this.messageUtilityService.getChatId();
        

        const messageBody: NewMessage = {
            chatId: chatId,
            message: message
        };

        return this.post<any>(`new-message`, messageBody, options);
    }

    callApiFromButton(api: string) {
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

        return this.get<any>(api, '', options);
    }

    sendMessageToAI() {
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

        return this.post<any>(`chats`, {}, options);   
    }

    setSavedChatOnUI(chatId: number): Observable<ExistingChatModel> {
        const token = this.authService.getAccessToken();

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token 
        });
    
        // Set options with headers
        const options = {
            headers: headers
        };

        return this.get<ExistingChatModel>('chats/', `${chatId}`, options); 

    }

}