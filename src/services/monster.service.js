import {environment} from '../environments/environment';

export class MonsterService {
    static getMonsters = () => {
        return fetch(`${environment.api.endPoint}${environment.api.monster.main}`)
            .then((response) => response.json());
    }
}
