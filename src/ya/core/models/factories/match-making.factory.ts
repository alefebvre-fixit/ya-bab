import { MatchMaking } from '../match-making.model';
import { Group } from '../group.model';

export class MatchMakingFactory {
    public static create(group: Group): MatchMaking {

        let result = new MatchMakingImpl();

        result.date = new Date();
        result.groupId = group.id;

        return Object.assign({}, result)
    }
}

class MatchMakingImpl implements MatchMaking {

    id: string;
    groupId: string;

    date: Date = new Date();


}