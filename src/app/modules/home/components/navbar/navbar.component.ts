import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  userImg!: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userImg = this.authService.userImg$;
  }

  ngOnDestroy(): void {}
}
