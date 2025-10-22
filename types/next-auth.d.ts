import { IUser } from "./user";

declare module "next-auth" {
  interface Session {
    currentUser: IUser;
    isDeleted: boolean;
  }
}
