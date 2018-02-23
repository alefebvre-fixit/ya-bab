import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { MatchMakingFactory, MatchMaking, Group } from '../models';
import { UserService } from './user.service';
import { forEach } from '@firebase/util/dist/esm/src/obj';
import { Participant, User } from '../models';
import { mergeMap } from 'rxjs/operator/mergeMap';

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

  public insertFakeUsers(matchMaking: MatchMaking){

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

    return (participants.length >= matchMaking.size)
  }

}
