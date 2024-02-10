import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthModel } from '../../models/auth.model';
import { Subject, concatMap, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({}); 
  private unsubscribe$ = new Subject<boolean>();

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    
  }

  loginUser() {

    const email = this.loginForm?.controls['email'].value;
    const password = this.loginForm?.controls['password'].value;

    const user: UserAuthModel = {
      email,
      password
    }

    this.authService.loginUser(user).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      if(result.accessToken) {
        this.router.navigate(['/home/chat']);  
      }
    });
  }

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
  }
}
