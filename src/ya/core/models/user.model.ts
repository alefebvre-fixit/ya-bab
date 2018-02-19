export interface User {

    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    rank?: number;
  
}

export class SignIn {
    email: string;
    password: string;
}

export class SignUp extends SignIn {
    displayName: string;
}
