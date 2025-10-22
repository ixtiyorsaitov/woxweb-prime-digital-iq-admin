import { connectToDatabase } from "@/lib/mongoose";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Query parametrlardan page va limit olish
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Hisoblash
    const skip = (page - 1) * limit;
    const total = await Message.countDocuments({});
    const totalPages = Math.ceil(total / limit);

    // Ma’lumotlarni pagination bilan olish
    const datas = await Message.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // PaginationType formatida qaytarish
    const pagination = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return NextResponse.json({
      success: true,
      datas,
      pagination,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Server xatosi" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({
        error: "Barcha maydonlar to'ldirilishi kerak",
      });
    }
    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server xatosi" });
  }
}
