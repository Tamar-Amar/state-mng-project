import { atom } from 'recoil';

export const regionsAtom = atom<string[]>({
  key: 'regionsAtom',
  default: ['Oceania', 'Asia', 'Africa', 'Europe', 'Americas', 'Antarctic'],
});
