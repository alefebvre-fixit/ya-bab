import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GroupPage } from './group-page';
import { MatchMakingModule } from '../match-making/index';

@NgModule({
  declarations: [
    GroupPage
  ],
  imports: [
    MatchMakingModule,
    IonicPageModule.forChild(GroupPage),
  ],
  exports: [
    GroupPage,
  ]
})
export class GroupPageModule { }
