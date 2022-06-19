import { atom } from 'recoil';

import EAtoms from '@state/EAtoms';
import { IUser } from '@types';

const defaultState: IUser = {
    id: '',
    name: '',
}

const userAtom = atom({
    key: EAtoms.USER,
    default: defaultState,
});

export default userAtom;