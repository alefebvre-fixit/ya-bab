import { Component, Input, SimpleChanges } from '@angular/core';

import { MatchMaking, User } from '../../ya/core/models';
import { MatchMakingService, UserService } from '../../ya/core/services';
import { Observable } from 'rxjs/Observable';
import { Participant } from '../../ya/core/models';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
    selector: 'ya-match-making',
    templateUrl: './match-making.html',
})
export class MatchMakingComponent {

    @Input() matchMaking: MatchMaking;

    participants: Participant[] = [];
    participants2: Participant[] = [];

    first: Participant;

    constructor(
        public navCtrl: NavController,
        private matchMakingService: MatchMakingService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        // this.matchMakingService.findParticipantsWithUsers(this.matchMaking).subscribe(
        //     (users) => this.participants = users
        // );


        this.matchMakingService.getUser(this.matchMaking.participants[0]).subscribe(
            participant => {this.first = participant}
        );

        this.matchMakingService.getUsers(this.matchMaking.participants).subscribe(
            participants => {this.participants2 = participants}
        );



        this.matchMakingService.getUsersOneByOne(this.matchMaking.participants).subscribe(
            participant => {this.participants.push(participant)}
        );



    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }


    cancel(): void {

        if (!this.matchMaking) return;

        this.matchMakingService.delete(this.matchMaking.id);

    }

    join(): void {
        this.matchMakingService.join(this.matchMaking);
    }

    open(): void {
        this.matchMakingService.join(this.matchMaking);
    }

    pushMatchPage() {

        if (!this.matchMaking) return;

        this.navCtrl.push('MatchPage', {
            id: this.matchMaking.id,
        });

    }

    isFull(): boolean {
        return this.matchMakingService.isFull(this.matchMaking);
    }



}
