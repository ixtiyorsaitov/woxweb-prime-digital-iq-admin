import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ROLE } from "@/types";
import { IUser } from "@/types/user";
import { authOptions } from "./auth-options";

export const allowedRoles = [ROLE.ADMIN, ROLE.SUPERADMIN];

export async function adminOnly(handler: (admin: IUser) => Promise<Response>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Ro'yhatdan o'tilmagan" },
      { status: 403 }
    );
  } else if (!allowedRoles.includes(session.currentUser.role)) {
    return NextResponse.json({ error: "Ruhsat berilmagan" }, { status: 403 });
  }

  return handler(session.currentUser);
}
