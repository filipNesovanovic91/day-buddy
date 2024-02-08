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
          this.messageUtilityService.addMessages(this.messageUtilityService.getMessages().concat(response));  
        });
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

        return this.post<any>(`new-message`, message, options);
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

        return this.post<any>(`Chat`, {}, options);  
    }

}