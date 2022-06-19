import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function RequireConnection({ children }: {children: JSX.Element}) {

    return (
        <>
            {/* {session.connected ? (
                children
            ) : (
                <Navigate to="/option" />
            )} */}
        </>
    )
}

export default RequireConnection;