import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { UserPage } from './user-page';
import { LetterAvatarModule } from '../../ya/letter-avatar';

@NgModule({
  declarations: [
    UserPage
  ],
  imports: [
    LetterAvatarModule, 
    IonicPageModule.forChild(UserPage),
  ],
  exports: [
    UserPage,
  ]
})
export class UserPageModule {}
