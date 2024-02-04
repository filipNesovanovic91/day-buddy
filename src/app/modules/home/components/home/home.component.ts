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

}
