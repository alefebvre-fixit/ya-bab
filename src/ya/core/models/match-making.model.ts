import { User } from "./user.model";

export interface MatchMaking {

    id: string;
    groupId: string;
    ownerId: string;
    date: Date;
    size: number;
}

export interface Participant {

    id: string;
    team: string;
    user?: User;
}





