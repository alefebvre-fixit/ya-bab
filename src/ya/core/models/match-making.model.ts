export interface MatchMaking {

    id: string;
    groupId: string;
    date: Date;

    participants: Participant[];

    isFull(): boolean;

}

export interface Participant {
    id: string;
    name: string;
}





