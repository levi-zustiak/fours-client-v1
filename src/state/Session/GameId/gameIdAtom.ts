import { atom } from 'recoil';

import EAtoms from '@state/EAtoms';

const gameIdAtom = atom<string>({
    key: EAtoms.GAMEID,
    default: ''
});

export default gameIdAtom;