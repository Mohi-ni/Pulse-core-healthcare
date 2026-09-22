//@ts-nocheck
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "PulseCore backend is running"
  });
});

// Appointment API
app.post("/api/appointments", async (req, res) => {
 const { name, email, phone, department, date } = req.body;

  // Basic validation
  if (!name || !email || !phone || !department || !date) {
    return res.status(400).json({
      success: false,
      message: "All appointment fields are required."
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: "New PulseCore Appointment Request",
     text: `
New appointment request

Name: ${name}
Email: ${email}
Phone: ${phone}
Department: ${department}
Preferred Date: ${date}
`
    });
    await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: email,
  subject: "PulseCore Appointment Confirmation",
  text: `
Hello ${name},

Your appointment request has been received successfully.

Appointment Details:
Department: ${department}
Preferred Date: ${date}

Our team will contact you if any further information is required.

Thank you for choosing PulseCore Healthcare.
  `
});

    res.status(200).json({
      success: true,
      message: "Appointment submitted successfully."
    });
  } catch (error) {
    console.error("Email sending error:", error);

    res.status(500).json({
      success: false,
      message: "Appointment received, but email could not be sent."
    });
  }
});

app.listen(PORT, () => {
  console.log(`PulseCore backend running on http://localhost:${PORT}`);
});