import { Component } from '@angular/core';
import { NavParams, IonicPage, ViewController } from 'ionic-angular';

import { MatchMaking } from '../../ya/core/models';
import { MatchMakingService, UserService } from '../../ya/core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'score-page',
    templateUrl: 'score-page.html'
})
export class ScorePage {

    public matchMaking: MatchMaking;

    constructor(
        private navParams: NavParams,
        private matchMakingService: MatchMakingService,
        private fb: FormBuilder,
        public viewCtrl: ViewController
    ) {
    }

    score: FormGroup;

    ngOnInit(): void {
        let id = this.navParams.get('id');
        this.matchMakingService.findOne(id).subscribe(
            matchMaking => {
                this.matchMaking = matchMaking;
            }
        );

        this.score = this.fb.group({
            match1TeamA: ['', [Validators.required]],
            match1TeamB: ['', [Validators.required]],
            match2TeamA: ['', [Validators.required]],
            match2TeamB: ['', [Validators.required]],
            match3TeamA: ['', [Validators.required]],
            match3TeamB: ['', [Validators.required]],
        });


        this.
            score.
            valueChanges.
            subscribe(form => {
                console.log('form', JSON.stringify(form));
            });


    }

    onSubmit(score): void {
        console.log(score);
    }

    finish() {
        this.viewCtrl.dismiss();
    }



}
