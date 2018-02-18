export interface MatchMaking {

    id: string;
    groupId: string;
    ownerId: string;
    date: Date;
    size: number;

    participants: Participant[];

}

export interface Participant {
    id: string;
    name: string;
}





