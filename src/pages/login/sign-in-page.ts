import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';

import { SignIn } from '../../ya/core/models';
import { UserService } from '../../ya/core/services';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  templateUrl: 'sign-in-page.html',
})
export class SignInPage {

  credentials: SignIn = {
    email: '',
    password: ''
  };

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private userService: UserService,
  ) {

  }

  public googleSignIn() {
    this.userService.googleSignIn().subscribe(
      () => this.nav.push(TabsPage)
    );
  }

  public emailSignIn() {

    this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true,
    }).present();


    this.userService.emailSignIn(this.credentials).subscribe(
      () => this.nav.push(TabsPage)
    );
  }

}