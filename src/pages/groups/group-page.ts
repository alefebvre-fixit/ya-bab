import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Group } from '../../ya/core/models';

import { GroupService, MatchMakingService } from '../../ya/core/services';

@Component({
    selector: 'group-page',
    templateUrl: 'group-page.html'
})
export class GroupPage {

    public group: Group;
    public matchMakings$;

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private groupService: GroupService,
        private matchMakingService: MatchMakingService
    ) {
    }

    ngOnInit(): void {
        let id = this.navParams.get('id');

        this.groupService.findOne(id).subscribe(
            group => this.group = group
        );

        this.matchMakings$ = this.matchMakingService.findByGroupId(id);
    }


    matchMaking(): void {
        if (!this.group) return;

        let matchMaking = this.matchMakingService.instanciateMatchMaking(this.group);
        this.matchMakingService.save(matchMaking);

    }



}
