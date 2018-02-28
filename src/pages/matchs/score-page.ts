import { Component } from '@angular/core';
import { NavParams, IonicPage, ViewController } from 'ionic-angular';

import { MatchMaking } from '../../ya/core/models';
import { MatchMakingService, UserService } from '../../ya/core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchMakingFactory, ScoreFactory, GameFactory } from '../../ya/core/models/factories/match-making.factory';
import { Game, Score } from '../../ya/core/models/match-making.model';

@IonicPage()
@Component({
    selector: 'score-page',
    templateUrl: 'score-page.html'
})
export class ScorePage {

    public matchMaking: MatchMaking;
    score: Score;
    scoreTeamA: any;
    scoreTeamB: any;

    constructor(
        private navParams: NavParams,
        private matchMakingService: MatchMakingService,
        private fb: FormBuilder,
        public viewCtrl: ViewController
    ) {
    }

    scoreForm: FormGroup;

    ngOnInit(): void {
        let id = this.navParams.get('id');
        this.matchMakingService.findOne(id).subscribe(
            matchMaking => {
                this.matchMaking = matchMaking;
            }
        );


        // this.scoreForm = this.fb.group({
        //     matchs: this.fb.array(
        //         [
        //             this.fb.group({
        //                 teamA: ['', Validators.required],
        //                 teamB: ['', Validators.required]
        //             }), 
        //             this.fb.group({
        //                 teamA: ['', Validators.required],
        //                 teamB: ['', Validators.required]
        //             }),
        //             this.fb.group({
        //                 teamA: ['', Validators.required],
        //                 teamB: ['', Validators.required]
        //             })
        //         ]
        //     )
        // });


        this.scoreForm = this.fb.group({
            game1: this.fb.group({
                teamA: [0, Validators.required],
                teamB: [0, Validators.required]
            }),
            game2: this.fb.group({
                teamA: [null, Validators.required],
                teamB: [null, Validators.required]
            }),
            game3: this.fb.group({
                teamA: [, Validators.required],
                teamB: [, Validators.required]
            })
        });


        this.
            scoreForm.
            valueChanges.
            subscribe(form => {
                this.calculateScore();
            });


    }

    onSubmit(): void {



    }

    private calculateScore() {
        let score = ScoreFactory.create()
        score.games = [];
        score.games.push(this.createGame('1'));
        score.games.push(this.createGame('2'));
        score.games.push(this.createGame('3'));

        this.matchMakingService.calculateScore(score);

        this.score = score;
    }

    private createGame(id: string): Game {


        
        let game = GameFactory.create();
        game.id = id;

        // game.teamA = +this.scoreForm.get(`game${id}.teamA`).value;
        // game.teamB = +this.scoreForm.get(`game${id}.teamB`).value;

        return game;

    }



    finish() {
        this.viewCtrl.dismiss();
    }



}
