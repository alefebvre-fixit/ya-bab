import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  templateUrl: 'login-page.html',
})
export class LoginPage {
  
  credentials: SignIn = {
  	  email: '',
  	  password: ''
  };

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private afAuth: AngularFireAuth,
  ) {
  
  }

  login() {
    console.log('Calling Login')
    //this.authService.emailSignIn(this.credentials).subscribe();
  }

  public googleSignIn() {
    Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).subscribe(
      () => this.nav.push(TabsPage)
    );
  }

  public emailSignIn() {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)).subscribe(
      () => this.nav.push(TabsPage)
    )
    ;
  }

}


export class SignIn {
  email: string;
  password: string;
}