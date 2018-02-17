import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { MatchMakingFactory, MatchMaking, Group } from '../models';

@Injectable()
export class MatchMakingService {

  constructor(
    private afs: AngularFirestore,
  ) {
  }

  private matchMakingCollection(): AngularFirestoreCollection<MatchMaking> {
    return this.afs.collection(this.matchMakingsUrl());
  }

  private matchMakingsUrl(): string {
    return 'match-makings/';
  }

  public instanciateMatchMaking(group: Group): MatchMaking {
    return MatchMakingFactory.create(group);
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

}
