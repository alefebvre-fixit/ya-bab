import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MatchPage } from './match-page';
import { LetterAvatarModule } from '../../ya/letter-avatar';

@NgModule({
  declarations: [
    MatchPage
  ],
  imports: [
    LetterAvatarModule, 
    IonicPageModule.forChild(MatchPage),
  ],
  exports: [
    MatchPage,
  ]
})
export class MatchPageModule {}
