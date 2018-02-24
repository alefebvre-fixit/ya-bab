import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../../../ya/core/models/match-making.model';

@Pipe({
    name: 'teamfilter',
    pure: false
})
export class TeamFilterPipe implements PipeTransform {
    transform(participants: Participant[], team: string): any {
        if (!participants || !team) {
            return participants;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return participants.filter(item => item.team.indexOf(team) !== -1);
    }
}
