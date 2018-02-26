import { User } from "./user.model";

export interface MatchMaking {

    id: string;
    groupId: string;
    ownerId: string;
    date: Date;

    players: number;
    games: number;

    score: Score;

}

export interface Game {

    id: string;
    teamA: number;
    teamB: number;
}

export interface Score {

    winner: string;
    teamA: number;
    teamB: number;

    games: Array<Game>;
}


export interface Participant {

    id: string;
    team: string;
    user?: User;
}





