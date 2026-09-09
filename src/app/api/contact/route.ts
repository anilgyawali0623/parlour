import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, service, date, message } = body;

    console.log("Received contact form submission:", body);

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,

      // TEMPORARY workaround for your certificate issue
      tls: {
        rejectUnauthorized: false,
      },

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test SMTP connection
    await transporter.verify();
    console.log("SMTP connection successful");

    // ACTUALLY SEND THE EMAIL
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,

      subject: `New booking request: ${service}`,

      text: `
New booking request

Name: ${name}
Email: ${email}
Phone: ${phone || "—"}
Service: ${service}
Preferred date: ${date || "—"}
Message: ${message || "—"}
      `.trim(),

      html: `
  <div style="
    margin: 0;
    padding: 40px 20px;
    background-color: #f7f4ef;
    font-family: Arial, Helvetica, sans-serif;
    color: #2f2a26;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5dfd8;
      border-radius: 12px;
      overflow: hidden;
    ">

      <!-- Header -->
      <div style="
        padding: 30px;
        background: #2f2a26;
        color: #ffffff;
        text-align: center;
      ">
        <div style="
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #d8c7a8;
          margin-bottom: 10px;
        ">
          Appointment Request
        </div>

        <h1 style="
          margin: 0;
          font-size: 26px;
          font-weight: 500;
        ">
          New Booking Request
        </h1>
      </div>

      <!-- Content -->
      <div style="padding: 30px;">

        <p style="
          margin: 0 0 25px;
          font-size: 15px;
          line-height: 1.6;
          color: #625b55;
        ">
          You have received a new appointment request. Here are the details:
        </p>

        <!-- Customer Details -->
        <div style="
          border: 1px solid #e5dfd8;
          border-radius: 8px;
          overflow: hidden;
        ">

          <div style="
            padding: 14px 18px;
            background: #f7f4ef;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          ">
            Customer Details
          </div>

          <div style="padding: 18px;">

            <p style="margin: 0 0 14px;">
              <span style="color: #8a8179; font-size: 12px; text-transform: uppercase;">
                Name
              </span><br>
              <strong style="font-size: 15px;">
                ${name}
              </strong>
            </p>

            <p style="margin: 0 0 14px;">
              <span style="color: #8a8179; font-size: 12px; text-transform: uppercase;">
                Email
              </span><br>
              <a href="mailto:${email}" style="
                color: #9a5961;
                text-decoration: none;
                font-size: 15px;
              ">
                ${email}
              </a>
            </p>

            <p style="margin: 0;">
              <span style="color: #8a8179; font-size: 12px; text-transform: uppercase;">
                Phone
              </span><br>
              <strong style="font-size: 15px;">
                ${phone || "Not provided"}
              </strong>
            </p>

          </div>
        </div>

        <!-- Appointment Details -->
        <div style="
          margin-top: 20px;
          border: 1px solid #e5dfd8;
          border-radius: 8px;
          overflow: hidden;
        ">

          <div style="
            padding: 14px 18px;
            background: #f7f4ef;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          ">
            Appointment Details
          </div>

          <div style="padding: 18px;">

            <p style="margin: 0 0 14px;">
              <span style="color: #8a8179; font-size: 12px; text-transform: uppercase;">
                Service
              </span><br>
              <strong style="font-size: 16px;">
                ${service}
              </strong>
            </p>

            <p style="margin: 0;">
              <span style="color: #8a8179; font-size: 12px; text-transform: uppercase;">
                Preferred Date
              </span><br>
              <strong style="font-size: 15px;">
                ${date || "Not specified"}
              </strong>
            </p>

          </div>
        </div>

        <!-- Message -->
        <div style="
          margin-top: 20px;
          padding: 20px;
          background: #faf8f5;
          border-left: 3px solid #c8a96b;
          border-radius: 4px;
        ">

          <div style="
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #8a8179;
            margin-bottom: 8px;
          ">
            Customer Message
          </div>

          <p style="
            margin: 0;
            font-size: 14px;
            line-height: 1.7;
            color: #4f4944;
          ">
            ${message || "No additional message provided."}
          </p>

        </div>

        <!-- Footer -->
        <p style="
          margin: 30px 0 0;
          padding-top: 20px;
          border-top: 1px solid #e5dfd8;
          font-size: 12px;
          line-height: 1.6;
          color: #8a8179;
          text-align: center;
        ">
          Please review the request and contact the customer to confirm the appointment.
        </p>

      </div>

    </div>
  </div>
`,
    });

    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({
      ok: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.error("Email send failed:", err);

    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 },
    );
  }
}
