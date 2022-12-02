import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import * as firebase from 'firebase/auth';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // userData: Observable<firebase.User | null>;
  userData: any;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router
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
        this.SetUserData(res.user);
        window.alert('You are successfully signed up!');
        console.log('You are successfully signed up!', res);
      })
      .catch(error => {
        window.alert(error.message);
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
        window.alert('Logged in!');
        console.log('Logged in!');
      })
      .catch(err => {
        window.alert(err.message);
        console.log('Something went wrong:', err.message);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return (JSON.parse(localStorage.getItem('user')!) !== null);
  }

  get userID() : String {
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
