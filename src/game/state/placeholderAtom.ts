import { atom } from "recoil";

const placeholderAtom = atom({
  key: "PLACEHOLDER",
  default: { col: 3, row: 0 }
});

export default placeholderAtom;
