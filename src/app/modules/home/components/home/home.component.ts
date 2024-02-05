import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    const token = this.authService.getAccessToken();
    const decodedToken = this.authService.decodeToken(token ?? ''); 
    console.log(decodedToken);
  }

  ngOnDestroy(): void {
    
  }

  openChat(chatId: number) {
    if (chatId) {
      // Implement logic to open the selected chat
      console.log(`Opening current chat with Id ${chatId}`);
    } else {
      // Implement logic to start a new chat
      console.log('Starting a new chat...');
    }
  }

}
