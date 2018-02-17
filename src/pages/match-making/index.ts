import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MatchMakingComponent } from './match-making';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
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

