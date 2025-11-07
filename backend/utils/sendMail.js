import nodemailer from 'nodemailer';
const sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cckumarsingh39ar@gmail.com',
                pass: process.env.APP_PASSWORD,
            }
        });
        const stringOtp = data.otp.toString();
        const mailOptions = {
            from: 'cckumarsingh38ar@gmail.com',
            to: data.email,
            subject: 'password reset otp',
            text:stringOtp
        }
        const result = await transporter.sendMail(mailOptions);
        // console.log('Email sent successfully:', result);
        return result;

    }catch (error) {
        // console.log( error);
    }
}

export default sendEmail;