import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSessionContext } from '@providers/SessionContextProvider';

function JoinById() {
    const { session } = useSessionContext();
    const params = useParams();

    useEffect(() => {
        if (params?.id && !session.connecting.current) {
            session.join(params?.id);
        }
    }, [params]);

    return null;
}

export default JoinById;