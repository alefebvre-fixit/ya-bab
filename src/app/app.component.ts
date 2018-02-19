import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login-page';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../ya/core/services';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const authObserver = userService.user$.subscribe( user => {
        if (user) {
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = 'LoginPage';
          authObserver.unsubscribe();
        }
      });


    });
  }
}
