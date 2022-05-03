import IPeer from './IPeer';
import IUser from './IUser';

interface ISession{
    gameId: string;
    user: IUser;
    peer: IPeer;
}

export default ISession;