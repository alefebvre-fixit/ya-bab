import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LetterAvatarModule } from '../../ya/letter-avatar';
import { ScorePage } from './score-page';

@NgModule({
  declarations: [
    ScorePage,
  ],
  imports: [
    LetterAvatarModule, 
    IonicPageModule.forChild(ScorePage),
  ],
  exports: [
    ScorePage,
  ],
})
export class ScorePageModule {}
