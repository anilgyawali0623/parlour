import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  // Your previous working configuration
  tls: {
    rejectUnauthorized: false,
  },

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export type BookingEmailData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  requestedTime: string;
  serviceStartAt: Date;
  serviceEndAt: Date;
};

export async function sendBookingEmail(data: BookingEmailData) {
  // Test SMTP connection
  await transporter.verify();

  console.log("SMTP connection successful");

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: data.email,

    subject: `New booking request: ${data.service}`,

    text: `
New booking request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "—"}
Service: ${data.service}
Date: ${data.date}
Booking time: ${data.requestedTime}

Maintenance: ${data.requestedTime} - ${data.serviceStartAt.toLocaleTimeString()}
Service: ${data.serviceStartAt.toLocaleTimeString()} - ${data.serviceEndAt.toLocaleTimeString()}
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
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Name
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.name}
                  </strong>
                </p>

                <p style="margin: 0 0 14px;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Email
                  </span>
                  <br>

                  <a
                    href="mailto:${data.email}"
                    style="
                      color: #9a5961;
                      text-decoration: none;
                      font-size: 15px;
                    "
                  >
                    ${data.email}
                  </a>
                </p>

                <p style="margin: 0;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Phone
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.phone || "Not provided"}
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
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Service
                  </span>
                  <br>

                  <strong style="font-size: 16px;">
                    ${data.service}
                  </strong>
                </p>

                <p style="margin: 0 0 14px;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Date
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.date}
                  </strong>
                </p>

                <p style="margin: 0 0 14px;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Booking Time
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.requestedTime}
                  </strong>
                </p>

                <p style="margin: 0 0 14px;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Maintenance
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.requestedTime} -
                    ${data.serviceStartAt.toLocaleTimeString()}
                  </strong>
                </p>

                <p style="margin: 0;">
                  <span style="
                    color: #8a8179;
                    font-size: 12px;
                    text-transform: uppercase;
                  ">
                    Service Time
                  </span>
                  <br>

                  <strong style="font-size: 15px;">
                    ${data.serviceStartAt.toLocaleTimeString()} -
                    ${data.serviceEndAt.toLocaleTimeString()}
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
                Booking Information
              </div>

              <p style="
                margin: 0;
                font-size: 14px;
                line-height: 1.7;
                color: #4f4944;
              ">
                The customer selected ${data.requestedTime}.
                The slot is occupied from ${data.requestedTime}
                until ${data.serviceEndAt.toLocaleTimeString()}.
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
              Please review the booking request and contact the customer if necessary.
            </p>

          </div>
        </div>
      </div>
    `,
  });

  console.log("Email sent successfully:", info.messageId);

  return info;
}