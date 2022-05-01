import IPeer from './IPeer';

interface ISession{
    gameId: string;
    user: string;
    peer: IPeer
}

export default ISession;