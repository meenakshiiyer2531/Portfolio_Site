// Import necessary modules
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

// Retrieve environment variables
const fromEmail = process.env.FROM_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD; // Ensure this is set in your .env file

// Log environment variables for debugging (remove in production)
console.log('FROM_EMAIL:', fromEmail);

// Define the POST function to handle requests
export async function POST(req) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // you can use other services
      auth: {
        user: fromEmail,
        pass: emailPassword, // your email password
      },
    });

    // Set up email data
    const mailOptions = {
      from: fromEmail, // sender address
      to: `${email}, vmeenakshi122002@gmail.com`, // list of receivers (added vmeenakshi122002@gmail.com)
      subject: subject, // Subject line
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `, // html body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log the response from Nodemailer
    console.log("Message sent: %s", info.messageId);

    // Return a JSON response with the data received
    return NextResponse.json({ messageId: info.messageId });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error sending email:", error);

    // Return a JSON response with an error message
    return NextResponse.json({ error: "Failed to send email. Please try again later." });
  }
}
