import { ROLE } from ".";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: ROLE;
  createdAt: string;
  updatedAt: string;
}
