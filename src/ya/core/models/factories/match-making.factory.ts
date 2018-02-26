import { MatchMaking, Participant, Game, Score } from '../match-making.model';
import { Group } from '../group.model';
import { User } from '../user.model';

export class MatchMakingFactory {
    public static create(group: Group, owner: User): MatchMaking {

        let result = new MatchMakingImpl(4, 2);

        result.date = new Date();
        result.groupId = group.id;
        result.ownerId = owner.uid;

        result.score = ScoreFactory.create();

        return Object.assign({}, result)
    }

    public static createParticipant(user: User): Participant {

        let result = new ParticipantImpl();

        result.id = user.uid
        result.team = 'none'

        return Object.assign({}, result)
    }

}

export class ParticipantFactory {
    public static create(): Participant {

        let result = new ParticipantImpl();

        return Object.assign({}, result)

    }
}

export class GameFactory {
    public static create(): Game {

        let result = new GameImpl();
        result.score = ScoreFactory.create();

        return Object.assign({}, result)

    }
}

export class ScoreFactory {
    public static create(): Score {

        let result = new ScoreImpl();

        return Object.assign({}, result)

    }
}

class ParticipantImpl implements Participant {

    id: string;
    team: string;
    user?: User;
}

class ScoreImpl implements Score {

    winner: string;
    teamAScore: number = 0;
    teamBScore: number = 0;

}

class GameImpl implements Game {

    id: string;

    score: Score;

}

class MatchMakingImpl implements MatchMaking {


    constructor(
        public players: number,
        public games: number
    ) {
    }

    id: string;
    groupId: string;
    ownerId: string;
    date: Date = new Date();

    score: Score;

}


