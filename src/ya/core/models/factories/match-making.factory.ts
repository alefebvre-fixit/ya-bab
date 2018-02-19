import { MatchMaking, Participant } from '../match-making.model';
import { Group } from '../group.model';
import { User } from '../user.model';

export class MatchMakingFactory {
    public static create(group: Group, owner: User): MatchMaking {

        let result = new MatchMakingImpl(4);

        result.date = new Date();
        result.groupId = group.id;
        result.participants = [];
        result.ownerId = owner.uid;

        return Object.assign({}, result)
    }

    public static createParticipant(user: User): Participant {

        let result = new ParticipantImpl();

        result.id = user.uid
        result.name = user.displayName

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


    constructor(public size: number
    ) {
    }

    participants: Participant[];
    id: string;
    groupId: string;
    ownerId: string;
    date: Date = new Date();


}