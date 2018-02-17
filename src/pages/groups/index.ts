import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GroupListPage } from './group-list';
import { GroupPage } from './group-page';
import { MatchMakingModule } from '../match-making/index';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatchMakingModule
  ],
  declarations: [
    GroupListPage,
    GroupPage
  ],
  exports: [
    GroupListPage,
    GroupPage
  ],
  providers: [
  ],
  entryComponents: [
    GroupListPage,
    GroupPage
  ],
})

export class GroupModule { }

export { GroupListPage } from './group-list';
