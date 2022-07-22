import { createContext, useContext, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { machine } from '@machines/Session';

import { useInterpret } from '@xstate/react';

import type { Interpreter } from 'xstate';
import type { Context, Events, States } from '@machines/types';

const SessionContext = createContext<any | undefined>(undefined);

function SessionContextProvider({ children }: {children: ReactElement}) {
    const navigate = useNavigate();
    const sessionSvc = useInterpret(machine);

    // useEffect(() => {
    //     if (session.connected) {
    //         navigate('/play');
    //     }
    // }, [session.connected];

    return (
        <SessionContext.Provider value={sessionSvc}>
            {children}
        </SessionContext.Provider>
    );
}

function useSessionContext()  {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error("SessionContext was used outside of it's provider");
    }

    return context;
}

export {
    SessionContext,
    SessionContextProvider,
    useSessionContext,
};