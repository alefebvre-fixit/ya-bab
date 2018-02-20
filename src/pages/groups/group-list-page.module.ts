import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GroupListPage } from './group-list-page';
import { MatchMakingModule } from '../match-making/index';

@NgModule({
  declarations: [
    GroupListPage
  ],
  imports: [
    MatchMakingModule,
    IonicPageModule.forChild(GroupListPage),
  ],
  exports: [
    GroupListPage,
  ]
})
export class GroupListPageModule { }
