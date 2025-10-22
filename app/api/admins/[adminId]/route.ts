import { adminOnly } from "@/lib/admin-only";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user.model";
import { ROLE } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ adminId: string }>;
  }
) {
  return adminOnly(async (admin) => {
    try {
      if (admin.role !== ROLE.SUPERADMIN) {
        return NextResponse.json(
          { error: "Ruhsat berilmagan" },
          { status: 403 }
        );
      }
      await connectToDatabase();
      const { adminId } = await params;
      if (!adminId) {
        return NextResponse.json("Barcha maydonlar to'ldirilishi kerak", {
          status: 400,
        });
      }
      const deletedAdmin = await User.findByIdAndDelete(adminId);
      return NextResponse.json(
        { success: true, data: deletedAdmin },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ adminId: string }>;
  }
) {
  return adminOnly(async (admin) => {
    try {
      if (admin.role !== ROLE.SUPERADMIN) {
        return NextResponse.json(
          { error: "Ruhsat berilmagan" },
          { status: 403 }
        );
      }
      await connectToDatabase();
      const { adminId } = await params;
      if (!adminId) {
        return NextResponse.json("Barcha maydonlar to'ldirilishi kerak", {
          status: 400,
        });
      }
      const { name, email, role } = await request.json();
      if (!name || !email || !role) {
        return NextResponse.json({
          error: "Barcha maydonlar to'ldirilishi kerak",
        });
      }
      if (role !== ROLE.ADMIN && role !== ROLE.SUPERADMIN) {
        return NextResponse.json(
          {
            error: "Rol aniqlanmagan",
          },
          { status: 400 }
        );
      }
      const oldAdmin = await User.findById(adminId);
      if (oldAdmin.email !== email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json(
            {
              error: "Bu emailda allaqachon admin mavjud",
            },
            { status: 400 }
          );
        }
      }
      const updatedAdmin = await User.findByIdAndUpdate(
        adminId,
        {
          name,
          email,
          role,
        },
        { new: true }
      );
      return NextResponse.json(
        { success: true, data: updatedAdmin },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}
