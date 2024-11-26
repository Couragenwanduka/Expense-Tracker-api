import { Request } from 'express';

export interface User {
  user_id: string;  

}


export interface UserRequest extends Request {
  user?: User;
}
