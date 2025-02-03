import { atom } from 'recoil';
import { User } from '../types/User';

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
});