import { atom } from "recoil";
import EAtoms from "../EAtoms";

const placeholderAtom = atom({
  key: EAtoms.PLACEHOLDER,
  default: { col: 3, row: 0 }
});

export default placeholderAtom;
