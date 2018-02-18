import { Component, Input } from '@angular/core';

import { MatchMaking } from '../../ya/core/models';
import { MatchMakingService } from '../../ya/core/services';

@Component({
    selector: 'ya-match-making',
    templateUrl: './match-making.html',
})
export class MatchMakingComponent {

    @Input() matchMaking: MatchMaking;

    constructor(private matchMakingService: MatchMakingService
    ) {
    }

    ngOnInit(): void {
    }


    cancel(): void {

        if (!this.matchMaking) return;

        this.matchMakingService.delete(this.matchMaking.id);

    }

    join(): void {
        this.matchMakingService.join(this.matchMaking);
    }



}
