import { IMessage } from "@/types/message";
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    replied: { type: String, default: null },
  },
  { timestamps: true }
);

const Message =
  mongoose.models["Message"] ||
  mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
