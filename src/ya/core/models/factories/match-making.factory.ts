import { MatchMaking, Participant } from '../match-making.model';
import { Group } from '../group.model';

export class MatchMakingFactory {
    public static create(group: Group): MatchMaking {

        let result = new MatchMakingImpl(4);

        result.date = new Date();
        result.groupId = group.id;

        return Object.assign({}, result)
    }
}

export class ParticipantFactory {
    public static create(): Participant {

        let result = new ParticipantImpl();

        return Object.assign({}, result)
    }
}

class ParticipantImpl implements Participant {

    id: string;
    name: string;
}

class MatchMakingImpl implements MatchMaking {


    constructor(private size: number
    ) {
    }

    participants: Participant[];
    id: string;
    groupId: string;
    date: Date = new Date();
    
    
    isFull(): boolean {
        if (!this.participants) return false;

        return (this.participants.length >= this.size)
    }


}