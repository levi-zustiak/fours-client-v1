import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

import EAtoms from '@state/EAtoms';

const sessionAtom = atom({
    key: EAtoms.SESSION,
    default: {},
    // effects_UNSTABLE: [persistAtom],
});

export default sessionAtom;