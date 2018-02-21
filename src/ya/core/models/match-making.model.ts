import { User } from "./user.model";

export interface MatchMaking {

    id: string;
    groupId: string;
    ownerId: string;
    date: Date;
    size: number;

    participants: Participant[];

    teamA?: Participant[];
    teamB?: Participant[];

}

export interface Participant {
    id: string;
    name: string;
    user?: User;
}





