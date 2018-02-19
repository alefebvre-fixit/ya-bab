import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from '../ya/core/services';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'SignInPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const authObserver = userService.user$.subscribe(user => {
        if (user) {
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = 'SignInPage';
          authObserver.unsubscribe();
        }
      });


    });
  }
}
