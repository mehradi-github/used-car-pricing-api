import { User } from '../users/user.entity';
export {};

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
