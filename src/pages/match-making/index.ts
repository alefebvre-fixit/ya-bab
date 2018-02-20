import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MatchMakingComponent } from './match-making';
import { LetterAvatarModule } from '../../ya/letter-avatar';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LetterAvatarModule,
  ],
  declarations: [
    MatchMakingComponent,
  ],
  exports: [
    MatchMakingComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
})

export class MatchMakingModule { }

