import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { MatchMakingFactory, MatchMaking, Group } from '../models';
import { UserService } from './user.service';
import { forEach } from '@firebase/util/dist/esm/src/obj';
import { Participant, User } from '../models';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Score, Game } from '../models/match-making.model';

@Injectable()
export class MatchMakingService {

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,

  ) {
  }

  private matchMakingCollection(): AngularFirestoreCollection<MatchMaking> {
    return this.afs.collection(this.matchMakingsUrl());
  }

  private matchMakingsUrl(): string {
    return 'match-makings/';
  }

  public instanciateMatchMaking(group: Group): MatchMaking {
    let matchMaking = MatchMakingFactory.create(group, this.userService.currentUser());

    // matchMaking.participants = [];
    // matchMaking.participants.push(
    //   {
    //     id: 'tBCsH6ONQJaz312p76aIJkdtTD63',
    //     name: 'Paul(t)'
    //   }
    // );
    // matchMaking.participants.push(
    //   {
    //     id: 't519o8rOECfbjLDJjnARPqDVTLu2',
    //     name: 'Pierre(t)'
    //   }
    // );


    //this.join(matchMaking);
    return matchMaking;
  }

  public insertFakeUsers(matchMaking: MatchMaking) {

    let paul =
      {
        id: 'tBCsH6ONQJaz312p76aIJkdtTD63',
        name: 'Paul(t)'
      }
      ;

    let pierre =
      {
        id: 't519o8rOECfbjLDJjnARPqDVTLu2',
        name: 'Pierre(t)'
      }
      ;

    this.afs.collection(this.matchMakingsUrl() + matchMaking.id + '/participants/').doc(paul.id).set(paul);
    this.afs.collection(this.matchMakingsUrl() + matchMaking.id + '/participants/').doc(pierre.id).set(pierre);

  }

  public findAll(): Observable<MatchMaking[]> {
    return this.afs.collection<MatchMaking>(this.matchMakingsUrl()).valueChanges();
  }

  public findOne(id: string): Observable<MatchMaking> {
    return this.afs.doc<MatchMaking>(this.matchMakingsUrl() + id).valueChanges();
  }

  public findByGroupId(groupId: string): Observable<MatchMaking[]> {
    return this.afs.collection<MatchMaking>(this.matchMakingsUrl(), ref => ref.where('groupId', '==', groupId)).valueChanges();
  }

  public save(matchMaking: MatchMaking): Observable<void> {
    if (matchMaking.id) {
      return this.update(matchMaking);
    } else {
      return this.create(matchMaking);
    }
  }

  private create(matchMaking: MatchMaking): Observable<void> {
    matchMaking.id = this.afs.createId();
    return Observable.fromPromise(this.matchMakingCollection().doc(matchMaking.id).set(matchMaking));
  }

  private update(matchMaking: MatchMaking): Observable<void> {
    return Observable.fromPromise(this.matchMakingCollection().doc(matchMaking.id).update(matchMaking));
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<MatchMaking>(this.matchMakingsUrl() + id).delete());
  }

  public join(matchMaking: MatchMaking) {

    let user = this.userService.currentUser();

    this.findParticipants(matchMaking.id).take(1).subscribe(
      participants => {
        if (this.isFull(matchMaking, participants)) {
          console.log('matchMaking is full!')
          return;
        }

        if (this.hasJoined(participants, user)) {
          console.log('allready joined the matchMaking!')
          return;
        }

        this.afs.collection(this.matchMakingsUrl() + matchMaking.id + '/participants/').doc(user.uid).set(MatchMakingFactory.createParticipant(user))
      }
    );
  }

  public findParticipants(matchId: string): Observable<Participant[]> {
    return this.afs.collection<Participant>(this.matchMakingsUrl() + matchId + '/participants/').valueChanges();
  }

  public findParticipantsWithUsers(matchId: string): Observable<Participant[]> {
    return this.findParticipants(matchId).map((participants => {
      return participants.map(
        participant => this.userService.findOne(participant.id)
          .map(user => { participant.user = user; return participant })
      )
    })
    ).flatMap(pobs => Observable.combineLatest(pobs));
  }

  public hasJoined(participants: Participant[], user: User) {
    if (!participants) return false;

    for (let entry of participants) {
      if (entry.id === user.uid) {
        return true;
      }

    }
    return false;
  }

  public isFull(matchMaking: MatchMaking, participants: Participant[]): boolean {
    if (!participants) return false;

    return (participants.length >= matchMaking.players)
  }

  public assignRedTeam(matchMaking: MatchMaking, participant: Participant) {
    this.assignTeam(matchMaking, participant, 'red');
  }

  public assignBlueTeam(matchMaking: MatchMaking, participant: Participant) {
    this.assignTeam(matchMaking, participant, 'blue');
  }

  public unassignTeam(matchMaking: MatchMaking, participant: Participant) {
    this.assignTeam(matchMaking, participant, 'none');
  }


  public assignTeam(matchMaking: MatchMaking, participant: Participant, team: string) {

    if (!matchMaking) return;
    if (!participant) return;

    let oldTeam = participant.team;
    participant.team = team;

    //no need toc heck if the team is full
    if (team === 'none'){
      Observable.fromPromise(this.afs.collection(this.matchMakingsUrl() + matchMaking.id + '/participants/').doc(participant.id).update({ team: team }));
    } else {
      this.findParticipants(matchMaking.id).take(1).subscribe(
        participants => {
          if (this.isTeamFull(matchMaking, participants, team)){
            //revert the change
            participant.team = oldTeam;
          } else {
            Observable.fromPromise(this.afs.collection(this.matchMakingsUrl() + matchMaking.id + '/participants/').doc(participant.id).update({ team: team }));
          }
        }
      );
    }
  }

  public isTeamFull(matchMaking: MatchMaking, participants: Participant[], team: string): boolean {
    if (!participants) return false;

    let teamSize = participants.filter(participant => { return participant.team === team }).length;
    console.log('teamSize=' + teamSize)
    console.log('isFull=' + (teamSize >= matchMaking.players / 2))
    
    return (teamSize >= matchMaking.players / 2)
  }

  public calculateScore(score: Score) {
    
    score.teamA = 0;
    score.teamB = 0;

    score.games.forEach(
      game => {
        if (game.teamA && game.teamB){
          if (game.teamA > game.teamB){
            score.teamA ++  
          } else if (game.teamA < game.teamB){
            score.teamB ++          
          } 
        }
      }
    );

    if (score.teamA && score.teamB){
      if (score.teamA > score.teamB){
        score.winner = 'teamA' 
      } else if (score.teamA < score.teamB){
        score.winner = 'teamB' 
      } 
    }
    
  }


}
