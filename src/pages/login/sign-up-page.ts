import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { SignUp } from '../../ya/core/models';
import { UserService } from '../../ya/core/services';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'sign-up-page',
  templateUrl: 'sign-up-page.html',
})
export class SignUpPage {

  signUp: SignUp = {
    email: '',
    password: '',
    displayName: ''
  };

  constructor(
    private nav: NavController,
    private userService: UserService,
    public loadingCtrl: LoadingController
  ) {

  }

  doSignUp() {

    this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true,
    }).present();

    this.userService.signUp(this.signUp).subscribe(
      () => this.nav.push(TabsPage)
    );

  }


}
