import { adminOnly } from "@/lib/admin-only";
import { connectToDatabase } from "@/lib/mongoose";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  return adminOnly(async () => {
    try {
      await connectToDatabase();
      const { messageId } = await params;
      const repliedMsg = await Message.findByIdAndUpdate(
        messageId,
        {
          isRead: true,
        },
        { new: true }
      );
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
      const deletedMsg = await Message.findByIdAndDelete(messageId);
      return NextResponse.json(
        { success: true, data: deletedMsg },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Server xatosi" });
    }
  });
}
