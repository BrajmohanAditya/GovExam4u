
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (data) => {
  try {
    const stringOtp = data.otp.toString();

    const result = await resend.emails.send({
      from: "govexam4u.com<noreply@govexam4u.com>", // ✅ default verified sender (works instantly)
      to: data.email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color: #333;">Your OTP Code</h2>
          <p>Your one-time password (OTP) is:</p>
          <h1 style="color: #007bff;">${stringOtp}</h1>
          <p>This OTP will expire in <strong>10 minutes</strong>.</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <br />
          <p>– GovExam4U Team</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully via Resend:", result);
    return result;
  } catch (error) {
    // console.error("❌ Error sending email via Resend:", error);
  }
};

export default sendEmail;
