import { appConfig } from "@/config/app.config";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_MAIL_USER,
            pass: process.env.NEXT_PUBLIC_MAIL_PASS, // App password
        },
    });

    await transporter.sendMail({
        from: `"${appConfig.name}" <${appConfig.email}>`,
        to: process.env.NEXT_PUBLIC_MAIL_USER,
        subject: subject,
        html: html,
    });

    return Response.json({ success: true });
}