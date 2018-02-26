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
    score: Score;

}

export interface Score {

    winner: string;
    teamAScore: number;
    teamBScore: number;

}


export interface Participant {

    id: string;
    team: string;
    user?: User;
}





