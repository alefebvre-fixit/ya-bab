import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MatchMaking, Participant } from '../../ya/core/models';
import { MatchMakingService } from '../../ya/core/services';

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
        public modalCtrl: ModalController,
        private matchMakingService: MatchMakingService
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


    assignRed(participant: Participant): void{
        this.matchMakingService.assignRedTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is red')
    }

    assignBlue(participant: Participant): void{
        this.matchMakingService.assignBlueTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is blue')
    }

    unassign(participant: Participant): void{
        this.matchMakingService.unassignTeam(this.matchMaking, participant);
        console.log(participant.user.displayName + ' is unassigned')
    }

    finish(): void{
        let modal = this.modalCtrl.create('ScorePage');
        modal.present();
    }


}
