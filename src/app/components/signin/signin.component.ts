import { Component, OnInit } from '@angular/core';
// import * as auth0 from 'auth0-js';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  constructor(
    public authenticationService:AuthenticationService
    ){
      // authenticationService.handleAuthentication();
    }

  email: string = '';
  password: string = '';
  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
    }
    
  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
    }
    
  signOut() {
    this.authenticationService.SignOut();
    }

    ngOnInit(): void {
    }
    
}
   

