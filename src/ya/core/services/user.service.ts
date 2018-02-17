import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

import { User, UserFactory } from '../models';


@Injectable()
export class UserService {

    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
    }

    private userCollection(): AngularFirestoreCollection<User> {
        return this.afs.collection(this.usersUrl());
    }

    private usersUrl(): string {
        return 'users/';
    }

    public instanciate(fbUser: firebase.User): User {

        const result = UserFactory.create();

        result.id = fbUser.uid;
        result.email = fbUser.email;
        result.name = fbUser.displayName;

        return result;
    }

    public findAll(): Observable<User[]> {
        return this.afs.collection<User>(this.usersUrl()).valueChanges();
    }

    public findOne(id: string): Observable<User> {
        return this.afs.doc<User>(this.usersUrl() + id).valueChanges();
    }

    public save(user: User): Observable<void> {
        if (user.id) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    public create(user: User): Observable<void> {
        if (user.id === undefined) {
            user.id = this.afs.createId();
        }
        return Observable.fromPromise(this.userCollection().doc(user.id).set(user));
    }

    private update(user: User): Observable<void> {
        return Observable.fromPromise(this.userCollection().doc(user.id).update(user));
    }

    public delete(id: string): Observable<void> {
        return Observable.fromPromise(this.afs.doc<User>(this.usersUrl() + id).delete());
    }

    public filterUsers(searchTerm: string, users: User[]) {
        if (users) {
            if (this.isEmpty(searchTerm) || this.isBlank(searchTerm)) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });
        }
    }

    private isEmpty(str) {
        return (!str || 0 === str.length);
    }

    private isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }

    public currentFirebaseUser(): firebase.User {
        return this.afAuth.auth.currentUser;
    }


}
