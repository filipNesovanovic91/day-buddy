import { Injectable } from "@angular/core";
import { CoreHttpService } from "../../../../core/http/core-http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../../environments/environment';
import { MessageUtilityService } from "./message-utility.service";
import { AuthService } from "../../../auth/services/auth.service";
import { ChatMessageModel } from "../../models/chat-message.model";

@Injectable({
    providedIn: 'root',
})

export class MessageHttpService extends CoreHttpService {
    private connection = new signalR.HubConnectionBuilder().withUrl(environment.apiUrl + '/newChat').build(); 

    constructor(protected override http: HttpClient, private messageUtilityService: MessageUtilityService, private authService: AuthService) {
        super(http);
    }

    listenSignalR() {
        this.connection.start().then(() => console.log('Connection opened!'));
        this.connection.on('message', (response: ChatMessageModel) => {
            console.log(response);
            const previousMessages = this.messageUtilityService.getMessages();
            console.log(previousMessages);

          this.messageUtilityService.addMessages(this.messageUtilityService.getMessages().concat(response.messages));  
        });
    }

    mapMessageReponseFromSignalR(message: ChatMessageModel) {
        let responseMessage = message.messages 
    }

    sendMessage(message: string) {
        const token = this.authService.getAccessToken();

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token  
        });
    
        // Set options with headers
        const options = {
            headers: headers
        };

        return this.post<any>(`new-message`, message, options);
    }

    sendMessageToAI() {
        const token = this.authService.getAccessToken();

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token 
        });
    
        // Set options with headers
        const options = {
            headers: headers
        };

        return this.post<any>(`Chat`, {}, options);  
    }

}