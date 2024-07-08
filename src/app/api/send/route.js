// Import necessary modules
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Retrieve environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

// Log environment variables for debugging
console.log('RESEND_API_KEY:', resendApiKey);
console.log('FROM_EMAIL:', fromEmail);

// Define the POST function to handle requests
export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  try {
    // Initialize Resend with API key
    const resend = new Resend(resendApiKey);

    // Send email using Resend API
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });

    // Log the response from Resend API
    console.log("Response from resend API:", data);

    // Return a JSON response with the data received
    return NextResponse.json(data);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error sending email:", error);

    // Return a JSON response with an error message
    return NextResponse.json({ error: "Failed to send email. Please try again later." });
  }
}
