import { Request } from 'express';
import { IUser } from '../models/User'; 

declare module 'express' {
    export interface Request {
        user?: IUser;
    }
}
