import { User } from '../user.model';

export class UserFactory {
    public static create(): User {
        return Object.assign({}, new UserImpl())
    }
}

class UserImpl implements User {

    id: string;
    name: string;
    email: string;

}