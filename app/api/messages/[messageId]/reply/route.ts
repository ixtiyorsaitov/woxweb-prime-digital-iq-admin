import { adminOnly } from "@/lib/admin-only";
import { connectToDatabase } from "@/lib/mongoose";
import { sendEmail } from "@/lib/nodemailder";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  return adminOnly(async () => {
    try {
      await connectToDatabase();
      const { messageId } = await params;
      const { message } = await request.json();
      if (!message) {
        return NextResponse.json("Barcha maydonlar to'ldirilishi kerak", {
          status: 400,
        });
      }
      const repliedMsg = await Message.findByIdAndUpdate(
        messageId,
        {
          replied: message,
        },
        { new: true }
      );
      if (!repliedMsg) {
        return NextResponse.json("Xabar topilmadi", { status: 404 });
      }
      const emailMsg = await sendEmail(repliedMsg);

      if (!emailMsg.success) {
        console.log(emailMsg.error);
        return NextResponse.json(
          { success: false, error: "Email jo'natishda xatolik yuz berdi" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, data: repliedMsg },
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
  { params }: { params: Promise<{ messageId: string }> }
) {
  return adminOnly(async () => {
    try {
      await connectToDatabase();
      const { messageId } = await params;
      const { message, resend } = await request.json();
      if (!message) {
        return NextResponse.json("Barcha maydonlar to'ldirilishi kerak", {
          status: 400,
        });
      }
      const repliedMsg = await Message.findByIdAndUpdate(
        messageId,
        {
          replied: message,
        },
        { new: true }
      );
      if (resend) {
        const emailMsg = await sendEmail(repliedMsg);

        if (!emailMsg.success) {
          console.log(emailMsg.error);
          return NextResponse.json(
            { success: false, error: "Email jo'natishda xatolik yuz berdi" },
            { status: 500 }
          );
        }
      }
      return NextResponse.json(
        { success: true, data: repliedMsg },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  return adminOnly(async () => {
    try {
      await connectToDatabase();
      const { messageId } = await params;
      if (!messageId) {
        return NextResponse.json("Barcha maydonlar to'ldirilishi kerak", {
          status: 400,
        });
      }
      const updatedMsg = await Message.findByIdAndUpdate(
        messageId,
        {
          replied: null,
        },
        { new: true }
      );
      return NextResponse.json(
        { success: true, data: updatedMsg },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}
