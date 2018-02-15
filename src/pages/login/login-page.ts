import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  
//   credentials: SignIn = {
//   	  email: '',
//   	  password: ''
//   };

  constructor(
    private nav: NavController,
    private navParams: NavParams,
  ) {
  
  }

  login() {
    console.log('Calling Login')
    //this.authService.emailSignIn(this.credentials).subscribe();
  }

  signup(){
    //this.authService.register(this.credentials);
  }
}
