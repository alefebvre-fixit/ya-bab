import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { User } from '../../ya/core/models';
import { UserService } from '../../ya/core/services';

@IonicPage()
@Component({
    selector: 'user-page',
    templateUrl: 'user-page.html'
})
export class UserPage {

    public user: User;

    ngOnInit(): void {
        let id = this.navParams.get('id');

        this.userService.findOne(id).subscribe(
            user => this.user = user
        );

    }

    constructor(
        private navParams: NavParams,
        private userService: UserService
    ) {
    }



}
