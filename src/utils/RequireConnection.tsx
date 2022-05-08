import sessionAtom from '@state/Session';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ISession } from '@types';

function RequireConnection({ children }: {children: JSX.Element}) {
    const session = useRecoilValue<ISession>(sessionAtom);

    return (
        <>
            {session.connected ? (
                children
            ) : (
                <Navigate to="/option" />
            )}
        </>
    )
}

export default RequireConnection;