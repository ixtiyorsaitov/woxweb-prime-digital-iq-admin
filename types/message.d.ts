export interface IMessage {
  _id: string;
  email: string;
  name: string;
  message: string;
  isRead: boolean;
  replied: string | null;
  createdAt: Date;
}
