import { ROLE } from "@/types";
import { IUser } from "@/types/user";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
      type: String,
      enum: [ROLE.ADMIN, ROLE.SUPERADMIN],
      default: ROLE.USER,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

const User =
  mongoose.models["User"] || mongoose.model<IUser>("User", UserSchema);

export default User;
