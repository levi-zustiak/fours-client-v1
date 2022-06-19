import { createContext, useMemo, useContext, ReactNode, MutableRefObject, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useSession from '@hooks/useSession';

import { User } from '@types';

type Session = {
    type: MutableRefObject<string | undefined>;
    peer: MutableRefObject<User | undefined>;
    gameId: MutableRefObject<string | undefined>;
    channel: MutableRefObject<RTCDataChannel | undefined>;
    connected: boolean;
    connecting: MutableRefObject<boolean | undefined>;
    create: () => Promise<void>;
    join: (id: string) => Promise<void>;
    end: () => void;
    closeConnection: () => Promise<void>;
}

type SessionContext = {
    session: Session;
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

function SessionContextProvider({ children }: {children: ReactNode}) {
    const session = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session.connected) {
            navigate('/play');
        }
    }, [session.connected])

    const contextValue: SessionContext = useMemo(() => ({
        session
    }), [session]);

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
}

function useSessionContext()  {
    const context = useContext(SessionContext);

    if (context === undefined) {
        throw new Error("SessionContext was used outside of it's provider");
    }

    return context;
}

export {
    SessionContext,
    SessionContextProvider,
    useSessionContext,
};