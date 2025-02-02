import { Permission } from "./Premission";

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    profilePicture?: string; 
    role: 'admin' | 'user';
    joinDate: Date;
    permissions?: Permission;
  }