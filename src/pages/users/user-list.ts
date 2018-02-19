import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../ya/core/services';

import { User } from '../../ya/core/models';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'user-list',
    templateUrl: 'user-list.html'
})
export class UserListPage {

    public users: User[];

    constructor(public navCtrl: NavController, public userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.userService.findAll().subscribe((users: User[]) => {
            this.users = users;
        });
    }

    public pushUserPage(user: User){

        if (!user) return;

        // this.navCtrl.push(GroupPage, {
        //   id: user.id,
        // });

    }    

}
