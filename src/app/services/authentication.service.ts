import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, updateCurrentUser } from "firebase/auth";
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // userData: Observable<firebase.User | null>;
  userData: any;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public toasterService: ToastrService,
    private db: AngularFireDatabase
  ) {
    /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if(res!=null && res.user!=null){
          console.log(res.user)
        }
        this.SetUserData(res.user);
        //window.alert('You are successfully signed up!');
        this.toasterService.success('You are successfully signed up!') ;
        console.log('You are successfully signed up!', res);
      })
      .catch(error => {
        //window.alert(error.message);
        this.toasterService.error(error.message) ;
        console.log('Some error', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.SetUserData(res.user);
        this.angularFireAuth.authState.subscribe(user => {
          if (user) {
            this.router.navigate(['list']);
          }
        })
        //window.alert('Logged in!');
        this.toasterService.success('Logged in!') ;
        console.log('Logged in!');
      })
      .catch(err => {
        //window.alert(err.message);
        this.toasterService.error(err.message) ;
        console.log('Something went wrong:', err.message);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) { 
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    const ref = this.db.list('Users/'+user.uid+'/details');
    ref.push(userData).then((resp)=>{
      console.log("#####################", resp);
    }).catch((error)=>{
      console.error(error);
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return (JSON.parse(localStorage.getItem('user')!) !== null);
  }

  

  get userID() : String {
    console.log("came to get userid")
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      return currentUser.uid;
    } else {
      return "";
    }
    // return String(getAuth().currentUser?.uid);
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        return user.uid;
      }
      else {
        return "";
      }
    })
    return "";
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      });
  }
}
