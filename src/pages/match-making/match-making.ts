import { Component, Input, SimpleChanges } from '@angular/core';

import { MatchMaking, User } from '../../ya/core/models';
import { MatchMakingService, UserService } from '../../ya/core/services';
import { Observable } from 'rxjs/Observable';
import { Participant } from '../../ya/core/models/match-making.model';

@Component({
    selector: 'ya-match-making',
    templateUrl: './match-making.html',
})
export class MatchMakingComponent {

    @Input() matchMaking: MatchMaking;

    participants: User[];

    constructor(
        private matchMakingService: MatchMakingService,
        private userService: UserService,

    ) {
    }

    ngOnInit(): void {

        let users = this.matchMaking.participants;
        if (users && users.length > 0) {

            //let acc: User[];
            Observable.from(users).switchMap((participant: Participant) => { return this.userService.findOne(participant.id) })
            .toArray()
            .subscribe(
                (users) => this.participants = users
            );

        } else {
            this.participants = [];
        }

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



}
