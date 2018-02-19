import { User } from '../user.model';
import * as firebase from 'firebase/app';

export class UserFactory {
    public static create(fbUser: firebase.User): User {

        let result = new UserImpl();

        result.email = fbUser.email;
        result.uid = fbUser.uid;
        result.displayName = fbUser.displayName;

        return Object.assign({}, result)
    }
}

class UserImpl implements User {


    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    rank: number;

}