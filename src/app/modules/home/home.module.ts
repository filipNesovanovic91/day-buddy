import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainChatComponent } from './components/chat/main-chat.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    MainChatComponent,
    ChatHistoryComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule, SharedModule],
})
export class HomeModule {}
