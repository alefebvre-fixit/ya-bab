import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { GroupListPage } from './group-list';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    GroupListPage,
  ],
  exports: [
    GroupListPage,
  ],
  providers: [
  ],
  entryComponents: [
    GroupListPage
  ],
})

export class GroupModule { }

export { GroupListPage } from './group-list';
