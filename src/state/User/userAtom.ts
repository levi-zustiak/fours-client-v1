import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

import EAtoms from '@state/EAtoms';
import { IUser } from '@types';

const defaultState: IUser = {
    id: '',
    name: '',
    socket: '',
}

const userAtom = atom({
    key: EAtoms.USER,
    default: defaultState,
    // effects_UNSTABLE: [persistAtom],
});

export default userAtom;