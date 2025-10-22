import { ROLE } from "@/types";
import { z } from "zod";

export const replyMessageSchema = z.object({
  message: z
    .string()
    .min(2, {
      message: "Xabar kamida 2 ta belgidan iborat bo'lishi kerak",
    })
    .max(50),
});

export const adminFormSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  email: z.string().email("Noto'g'ri email manzili"),
  role: z
    .enum([ROLE.ADMIN, ROLE.SUPERADMIN])
    .refine((val) => !!val, { message: "Rol tanlang" }),
});
