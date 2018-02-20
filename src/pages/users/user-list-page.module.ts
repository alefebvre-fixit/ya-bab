import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { UserListPage } from './user-list-page';
import { LetterAvatarModule } from '../../ya/letter-avatar';

@NgModule({
  declarations: [
    UserListPage
  ],
  imports: [
    LetterAvatarModule, 
    IonicPageModule.forChild(UserListPage),
  ],
  exports: [
    UserListPage,
  ]
})
export class UserListPageModule {}
