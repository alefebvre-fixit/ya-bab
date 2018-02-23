import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { User, MatchMaking, Participant } from '../../ya/core/models';
import { UserService, MatchMakingService } from '../../ya/core/services';
import { Observable } from 'rxjs/Observable';
import { MatchMakingModule } from '../match-making/index';

@IonicPage()
@Component({
    selector: 'match-page',
    templateUrl: 'match-page.html'
})
export class MatchPage {

    public matchMaking: MatchMaking;
    public participants$: Observable<Participant[]>;

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
                this.participants$ = this.matchMakingService.findParticipantsWithUsers(this.matchMaking.id);
            }
        );
    }




}
