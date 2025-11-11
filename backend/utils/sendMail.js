import nodemailer from 'nodemailer';
const sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "process.env.EMAIL_USER",
            pass: process.env.APP_PASSWORD,
          },
        });
        const stringOtp = data.otp.toString();
        const mailOptions = {
          from: "process.env.EMAIL_USER",
          to: data.email,
          subject: "password reset otp",
          text: stringOtp,
        };
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);
        return result;

    }catch (error) {
        // console.log( error);
    }
}

export default sendEmail;