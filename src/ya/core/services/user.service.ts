import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

import { SignIn, SignUp, User, UserFactory } from '../models';


@Injectable()
export class UserService {


    user$: Observable<User>;


    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
        //// Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                } else {
                    return Observable.of(null)
                }
            })

    }

    private userCollection(): AngularFirestoreCollection<User> {
        return this.afs.collection(this.usersUrl());
    }

    private usersUrl(): string {
        return 'users/';
    }

    public instanciate(fbUser: firebase.User): User {

        const result = UserFactory.create(fbUser);

        return result;
    }

    public findAll(): Observable<User[]> {
        return this.afs.collection<User>(this.usersUrl()).valueChanges();
    }

    public findOne(id: string): Observable<User> {
        return this.afs.doc<User>(this.usersUrl() + id).valueChanges();
    }

    public save(user: User): Observable<void> {
        if (user.uid) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    public create(user: User): Observable<void> {
        if (user.uid === undefined) {
            user.uid = this.afs.createId();
        }
        return Observable.fromPromise(this.userCollection().doc(user.uid).set(user));
    }

    private update(user: User): Observable<void> {
        return Observable.fromPromise(this.userCollection().doc(user.uid).update(user));
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
                return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
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

    public currentUser(): User {
        return UserFactory.create(this.afAuth.auth.currentUser);
    }


    public googleSignIn(): Observable<any> {
        return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((credential) => {
            this.updateUserData(credential.user)
        })
        );
    }

    public emailSignIn(signIn: SignIn): Observable<any> {
        return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(signIn.email, signIn.password).then((user) => {
            console.log(user);
            this.updateUserData(user)
        })
        );
    }

    public signUp(signUp: SignUp): Observable<any> {
        return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(signUp.email, signUp.password).then((credential) => {
            console.log(credential)
            credential.user.updateProfile({
                displayName: signUp.displayName,
            }).then(() => {
                const data: User = {
                    uid: credential.user.uid,
                    email: credential.user.email,
                    displayName: signUp.displayName,
                    photoURL: credential.user.photoURL,
                }
                this.updateUserData(data)
            }, (error) => {
                console.log(error)
            });
        })
        );
    }

    public signOut(): Observable<any> {
        return Observable.fromPromise(this.afAuth.auth.signOut());
    }

    private updateUserData(user: User) {
        // Sets user data to firestore on login

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }

        return userRef.set(data)

    }



}
