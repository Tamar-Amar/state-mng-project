import { atom } from 'recoil';
import { User } from '../types/User';
import {jwtDecode} from 'jwt-decode';


const token = localStorage.getItem('token');
const initialUser: User | null = token ? jwtDecode<User>(token) : null;

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: initialUser,
});


