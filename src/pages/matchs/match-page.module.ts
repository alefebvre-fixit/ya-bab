import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MatchPage } from './match-page';
import { LetterAvatarModule } from '../../ya/letter-avatar';
import { TeamFilterPipe } from '../shared/pipes/team-filter.pipe';

@NgModule({
  declarations: [
    MatchPage,
    TeamFilterPipe
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
