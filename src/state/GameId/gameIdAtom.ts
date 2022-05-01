import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

import EAtoms from '@state/EAtoms';

const gameIdAtom = atom({
    key: EAtoms.GAMEID,
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export default gameIdAtom;