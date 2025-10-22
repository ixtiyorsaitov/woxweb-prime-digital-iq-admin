import { adminOnly } from "@/lib/admin-only";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user.model";
import { ROLE } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return adminOnly(async () => {
    try {
      await connectToDatabase();

      // 🔹 query parametrlarini olish
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const search = searchParams.get("search")?.trim() || "";

      // 🔹 qidiruv sharti (name yoki email bo‘yicha)
      const searchQuery = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      // 🔹 umumiy sonni olish
      const total = await User.countDocuments(searchQuery);

      // 🔹 pagination uchun ma’lumotlarni olish
      const users = await User.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      // 🔹 pagination meta
      const pagination = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      };

      return NextResponse.json({ success: true, datas: users, pagination });
    } catch (error) {
      console.error("GET /users error:", error);
      return NextResponse.json({ error: "Server xatoligi" }, { status: 500 });
    }
  });
}

export async function POST(request: NextRequest) {
  return adminOnly(async (admin) => {
    try {
      if (admin.role !== ROLE.SUPERADMIN) {
        return NextResponse.json(
          { error: "Ruxsat berilmagan" },
          {
            status: 403,
          }
        );
      }
      await connectToDatabase();
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
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          {
            error: "Bu emailda allaqachon admin mavjud",
          },
          { status: 400 }
        );
      }
      const newUser = await User.create({
        name,
        email,
        role,
      });

      return NextResponse.json({ success: true, data: newUser });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}
