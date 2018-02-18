import { User } from '../user.model';
import * as firebase from 'firebase/app';

export class UserFactory {
    public static create(fbUser: firebase.User): User {

        let result = new UserImpl();

        result.email = fbUser.email;
        result.id = fbUser.uid;
        result.name = fbUser.displayName;

        return Object.assign({}, result)
    }
}

class UserImpl implements User {

    id: string;
    name: string;
    email: string;

}