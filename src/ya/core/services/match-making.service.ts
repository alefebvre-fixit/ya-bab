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

    matchMaking.participants = [];
    matchMaking.participants.push(
      {
        id: 'tBCsH6ONQJaz312p76aIJkdtTD63',
        name: 'Paul(t)'
      }
    );
    matchMaking.participants.push(
      {
        id: 'tBCsH6ONQJaz312p76aIJkdtTD63',
        name: 'Pierre(t)'
      }
    );


    this.join(matchMaking);
    return matchMaking;
  }

  public findAll(): Observable<MatchMaking[]> {
    return this.afs.collection<MatchMaking>(this.matchMakingsUrl()).valueChanges();
  }

  public findOne(id: string): Observable<MatchMaking> {
    return this.afs.doc<MatchMaking>(this.matchMakingsUrl() + id).valueChanges();
  }

  public findOneWithUsers(id: string): Observable<MatchMaking> {
    return this.findOne(id).map(
      (matchMaking) => {
        this.fillParticipantsWithUser(matchMaking);
        return matchMaking;
      }
    );
  }


  public fillParticipantsWithUser(matchMaking: MatchMaking): void {
    if (matchMaking && matchMaking.participants) {
      matchMaking.participants.forEach(
        (participant) => {
          this.userService.findOne(participant.id).subscribe(user => participant.user = user)
        }
      )
    }
  }

  public findParticipantsWithUsers(matchMaking: MatchMaking): Observable<Participant[]> {

    let participants: Array<Participant> = [];
    if (matchMaking && matchMaking.participants) {
      participants = matchMaking.participants;
    }

    return this.getUsers(participants);

    // return Observable.from(participants).mergeMap(participant => this.userService.findOne(participant.id), (participant: Participant, user: User) => {
    //   participant.user = user;
    //   console.log(participant)
    //   return participant;
    // }).toArray();

    //return Observable.from(participants).toArray();


  }

  getUsersOneByOne(participants: Participant[]): Observable<Participant> {
    return Observable.from(participants).concatMap(participant => <Observable<Participant>>this.getUser(participant));
  }

  getUsers(participants: Participant[]): Observable<Participant[]> {
    return Observable.from(participants).concatMap(participant => <Observable<Participant>>this.getUser(participant)).toArray();
  }

  getUser(participant: Participant): Observable<Participant> {
    return this.userService.findOne(participant.id).map(user => { participant.user = user; return participant }));
  }



  test(): Observable<string[]> {
    return Observable
      .from(["a", "b", "c"])
      .concatMap(value => Observable.of(value))
      .toArray()
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

    if (this.isFull(matchMaking)) {
      console.log('matchMaking is full!')
      return;
    }

    if (this.hasJoined(matchMaking)) {
      console.log('allready joined the matchMaking!')
      return;
    }

    let user = this.userService.currentUser();

    if (matchMaking.participants == null) {
      matchMaking.participants = [];
    }

    matchMaking.participants.push(MatchMakingFactory.createParticipant(user));

    this.save(matchMaking);

  }

  public hasJoined(matchMaking: MatchMaking) {
    if (!matchMaking.participants) return false;

    let user = this.userService.currentUser();

    for (let entry of matchMaking.participants) {
      if (entry.id === user.uid) {
        return true;
      }

    }
    return false;
  }

  public isFull(matchMaking: MatchMaking): boolean {
    if (!matchMaking.participants) return false;

    return (matchMaking.participants.length >= matchMaking.size)
  }

}
