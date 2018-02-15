import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { Group, GroupFactory } from '../models';

@Injectable()
export class GroupService {

  constructor(
    private afs: AngularFirestore,
  ) {
  }

  private groupCollection(): AngularFirestoreCollection<Group> {
    return this.afs.collection(this.groupsUrl());    
  }

  private groupsUrl(): string {
    return 'groups/';
  }

  public instanciateGroup(): Group {
    return GroupFactory.create();
  }

  public findAll(): Observable<Group[]> {
    return this.afs.collection<Group>(this.groupsUrl()).valueChanges();
  }

  public findOne(id: string): Observable<Group> {
    return this.afs.doc<Group>(this.groupsUrl() + id).valueChanges();
  }

  public save(group: Group): Observable<void> {
    if (group.id) {
      return this.update(group);
    } else {
      return this.create(group);
    }
  }

  private create(group: Group): Observable<void> {
    group.id = this.afs.createId();
    return Observable.fromPromise(this.groupCollection().doc(group.id).set(group));
  }

  private update(group: Group): Observable<void> {
    return Observable.fromPromise(this.groupCollection().doc(group.id).update(group));
  }

  public delete(id: string): Observable<void> {
    return Observable.fromPromise(this.afs.doc<Group>(this.groupsUrl() + id).delete());
  }

}
