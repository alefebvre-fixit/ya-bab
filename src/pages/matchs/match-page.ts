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
    public unassigned$: Observable<Participant[]>;

    public blueTeam$: Observable<Participant[]>;
    public redTeam$: Observable<Participant[]>;


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
                
                let participants$ = this.matchMakingService.findParticipantsWithUsers(this.matchMaking.id);
                
                this.unassigned$ = participants$
                .map( participants => participants.filter( participant =>  { return (participant.team !== 'blue' && participant.team !== 'red')}));

                this.blueTeam$ = participants$
                .map( participants => participants.filter( participant =>  { return participant.team === 'blue' }));

                this.redTeam$ = participants$
                .map( participants => participants.filter( participant =>  { return participant.team === 'red' }));

            }
        );
    }


    assignRed(participant: Participant){
        this.matchMakingService.assignRedTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is red')
    }

    assignBlue(participant: Participant){
        this.matchMakingService.assignBlueTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is blue')
    }

    unassign(participant: Participant){
        this.matchMakingService.unassignTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is unassigned')
    }



}
