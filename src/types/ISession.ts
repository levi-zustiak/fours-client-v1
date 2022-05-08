import IUser from './IUser';

interface ISession{
    type?: string;
    gameId?: string;
    peer?: IUser;
    connected?: boolean;
}

export default ISession;