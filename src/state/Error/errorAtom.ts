import { atom } from 'recoil';

import EAtoms from '@state/EAtoms';
import IError from './IError';

const defaultState: IError = {
    msg: '',
};

export const errorAtom = atom({
    key: EAtoms.ERROR,
    default: defaultState,
})

export default errorAtom;