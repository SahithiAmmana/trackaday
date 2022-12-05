import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  constructor(
    public authenticationService:AuthenticationService, public router: Router
    ){
    }

    name: string = '';
    email: string = '';
  password: string = '';
  signUp() {
    this.authenticationService.SignUp(this.name, this.email, this.password);
    this.email = '';
    this.password = '';
    this.name = '';
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
      if(this.authenticationService.isLoggedIn){
        this.router.navigate(['list']);
      }
    }

}


