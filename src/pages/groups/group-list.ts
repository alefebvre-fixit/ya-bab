import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Group } from '../../ya/core/models';
import { GroupService } from '../../ya/core/services';

import { GroupPage } from './group-page';

@Component({
    selector: 'group-list',
    templateUrl: 'group-list.html'
})
export class GroupListPage {

    public groups: Group[];

    constructor(public navCtrl: NavController, public groupService: GroupService,
    ) {
    }

    ngOnInit(): void {
        this.groupService.findAll().subscribe((groups: Group[]) => {
            this.groups = groups;
        });
    }

    public pushGroupPage(group: Group){

        if (!group) return;

        this.navCtrl.push(GroupPage, {
          id: group.id,
        });

    }    

}
