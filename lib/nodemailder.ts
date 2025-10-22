import { IMessage } from "@/types/message";
import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};

export const sendEmail = async (repliedMsg: IMessage) => {
  try {
    const info = await transporter.sendMail({
      ...mailOptions,

      subject: `Salom ${repliedMsg.name}, sizning xabaringizga javob keldi!`,
      html: defaultHTML(repliedMsg),
    });
    return { success: true, data: info };
  } catch (error) {
    return { success: false, error };
  }
};

const defaultHTML = (repliedMsg: IMessage) => {
  return `
        <div style="font-family: Arial, sans-serif; background-color: #f7f9fc; padding: 20px;">
          <div style="max-width: 600px; background: white; margin: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white; padding: 16px 24px;">
              <h2 style="margin: 0; font-size: 20px;">📩 Yangi javob xabari</h2>
            </div>

            <div style="padding: 24px;">
              <p style="font-size: 16px; color: #333;">Assalomu alaykum, <strong>${
                repliedMsg.name
              }</strong>!</p>
              <p style="font-size: 15px; color: #444;">Sizning yuborgan xabaringizga javob berildi. Quyida tafsilotlar:</p>

              <div style="background-color: #f1f5f9; border-left: 4px solid #4f46e5; padding: 12px 16px; margin: 16px 0;">
                <p style="margin: 0; font-weight: 600;">Sizning xabaringiz:</p>
                <p style="margin: 4px 0 0 0; color: #555;">${
                  repliedMsg.message
                }</p>
                <small style="color: #777;">${new Date(
                  repliedMsg.createdAt
                ).toLocaleString()}</small>
              </div>

              <div style="background-color: #eef2ff; border-left: 4px solid #7c3aed; padding: 12px 16px; margin-top: 16px;">
                <p style="margin: 0; font-weight: 600;">Admin javobi:</p>
                <p style="margin: 4px 0 0 0; color: #444;">${
                  repliedMsg.replied
                }</p>
              </div>

              <p style="margin-top: 24px; color: #555;">Hurmat bilan,<br><strong>WoxWeb jamoasi</strong></p>
            </div>

            <div style="background: #f3f4f6; text-align: center; padding: 12px; font-size: 12px; color: #666;">
              © ${new Date().getFullYear()} WoxWeb. Barcha huquqlar himoyalangan.
            </div>
          </div>
        </div>
      `;
};
