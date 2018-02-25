import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';

import { MatchMaking } from '../../ya/core/models';
import { MatchMakingService, UserService } from '../../ya/core/services';

@IonicPage()
@Component({
    selector: 'score-page',
    templateUrl: 'score-page.html'
})
export class ScorePage {

    public matchMaking: MatchMaking;

    constructor(
        private navParams: NavParams,
        private matchMakingService: MatchMakingService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        let id = this.navParams.get('id');
        this.matchMakingService.findOne(id).subscribe(
            matchMaking => {
                this.matchMaking = matchMaking;
            }
        );
    }

    finish(): void {

    }



}
