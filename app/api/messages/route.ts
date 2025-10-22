import { adminOnly } from "@/lib/admin-only";
import { connectToDatabase } from "@/lib/mongoose";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = process.env.ALLOWED_ORIGIN;

export async function GET(request: NextRequest) {
  return adminOnly(async () => {
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
  });
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");

    if (origin !== allowedOrigin) {
      return new NextResponse("CORS error: not allowed", {
        status: 403,
        headers: { "Access-Control-Allow-Origin": "null" },
      });
    }

    await connectToDatabase();
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi kerak" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        }
      );
    }

    const newMessage = await Message.create({ name, email, message });

    return NextResponse.json(
      { success: true, data: newMessage },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server xatosi" },
      {
        status: 500,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (origin !== allowedOrigin) {
    return new NextResponse("CORS error: not allowed", {
      status: 403,
      headers: { "Access-Control-Allow-Origin": "null" },
    });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
