import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: {children: JSX.Element}) {
    const user = useRecoilValue(userAtom);
    const location = useLocation();

    return (
        <>
            {user.id ? (
                children
            ) : (
                <Navigate to="/user" state={{ from: location }} replace />
            )}
        </>)
}

export default RequireAuth;