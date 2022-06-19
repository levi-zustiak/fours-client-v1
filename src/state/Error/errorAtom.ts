import { atom } from 'recoil';

import EAtoms from '@state/EAtoms';

type Error = {
    msg: string;
}

const defaultState: Error = {
    msg: '',
};

export const errorAtom = atom({
    key: EAtoms.ERROR,
    default: defaultState,
})

export default errorAtom;