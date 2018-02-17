import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'register-page',
  templateUrl: 'register-page.html',
})
export class RegisterPage {
  
  credentials: SignIn = {
  	  email: '',
  	  password: ''
  };

  constructor(private auth: AngularFireAuth
  ) {
  
  }

  register(){
    this.auth.auth.createUserWithEmailAndPassword(this.credentials.email, this.credentials.password).then();
  }
}


export class SignIn {
  email: string;
  password: string;
}