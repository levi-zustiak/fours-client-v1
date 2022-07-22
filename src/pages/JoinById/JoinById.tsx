import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSessionContext } from '@providers/SessionContextProvider';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';
import { useActor } from '@xstate/react';

function JoinById() {
    const params = useParams();
    const user = useRecoilValue(userAtom);
    const svc = useSessionContext();
    const [state] = useActor(svc);

    console.log(state);

    useEffect(() => {
        if (params?.id) {
            console.log(params?.id);
            svc.send({ type: 'JOIN', data: { gameId: params?.id, user } })
        }
    }, [params]);

    return null;
}

export default JoinById;