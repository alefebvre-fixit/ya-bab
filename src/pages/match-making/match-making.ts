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

    public participants: Participant[] = [];

    constructor(
        public navCtrl: NavController,
        private matchMakingService: MatchMakingService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
       //this.findParticipants();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.findParticipants();
    }

    private findParticipants(){
        this.matchMakingService.findParticipantsWithUsers(this.matchMaking.id).subscribe(
            participants => {this.participants = participants}
        )
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
        return this.matchMakingService.isFull(this.matchMaking, this.participants);
    }



}
