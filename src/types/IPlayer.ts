import IUser from './IUser';
import IToken from './IToken';

interface IPlayer {
    id: number;
    token: IToken;
    user?: IUser;
}

export default IPlayer;