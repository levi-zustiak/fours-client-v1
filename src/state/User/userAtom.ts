import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

import EAtoms from '@state/EAtoms';

const userAtom = atom({
    key: EAtoms.USER,
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export default userAtom;