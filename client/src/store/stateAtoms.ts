import { atom } from 'recoil';

export const selectedStateAtom = atom({
  key: 'selectedState',
  default: null, 
});

export const editingStateAtom = atom<string | null>({
  key: 'editingState',
  default: null, 
});
