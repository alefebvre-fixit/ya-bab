import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { SignUp } from '../../ya/core/models';
import { UserService } from '../../ya/core/services';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'register-page',
  templateUrl: 'register-page.html',
})
export class RegisterPage {

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

  register() {

    this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true,
    }).present();

    this.userService.signUp(this.signUp).subscribe(
      () => this.nav.push(TabsPage)
    );

  }


}
