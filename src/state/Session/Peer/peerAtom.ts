import { atom } from 'recoil';

import EAtoms from '@state/EAtoms';
import { User } from '@types';

const peerAtom = atom<User>({
    key: EAtoms.PEER,
    default: {}
});

export default peerAtom;