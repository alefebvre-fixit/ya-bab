import { Group } from '../group.model';

export class GroupFactory {
    public static create(): Group {
        return Object.assign({}, new GroupImpl())
    }
}

class GroupImpl implements Group {
    id: string;
    name: string;
}