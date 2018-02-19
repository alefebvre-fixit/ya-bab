import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { User } from '../../ya/core/models';
import { UserService } from '../../ya/core/services/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user$: Observable<User>;

  constructor(
    private nav: NavController, 
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): void {
    this.userService.user$;
  }

  signOut(): void {

    this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true,
    }).present();

    this.userService.signOut().subscribe(
      () => this.nav.push('LoginPage')
    );

  }

}
