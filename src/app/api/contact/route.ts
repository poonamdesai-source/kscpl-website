import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, message } = data;

    // Server-side validation
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      return NextResponse.json({ error: 'Valid name is required (letters and spaces only).' }, { status: 400 });
    }
    
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json({ error: 'Valid 10-digit Indian mobile number is required.' }, { status: 400 });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long.' }, { status: 400 });
    }

    // SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports like 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully.');
    } catch (verifyError: any) {
      console.error('SMTP Connection Error:', {
        code: verifyError.code,
        message: verifyError.message,
        command: verifyError.command,
        response: verifyError.response,
      });
      return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'poonam.desai@futurescapeadvt.com';
    const submittedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Send email
    try {
      await transporter.sendMail({
        from: `"KSCPL Website" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: email,
        subject: `New KSCPL Website Enquiry - ${name}`,
        text: `
You have received a new enquiry from the KSCPL Website Contact Form.

Details:
Name: ${name}
Phone: ${phone}
Email: ${email}
Submission Date/Time: ${submittedDate}

Message:
${message}
        `,
        html: `
          <h2>New KSCPL Website Enquiry</h2>
          <p>You have received a new enquiry from the KSCPL Website Contact Form.</p>
          <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <th align="left">Name</th>
              <td>${name}</td>
            </tr>
            <tr>
              <th align="left">Phone</th>
              <td>${phone}</td>
            </tr>
            <tr>
              <th align="left">Email</th>
              <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <th align="left">Submission Date/Time</th>
              <td>${submittedDate}</td>
            </tr>
          </table>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
          <br/>
          <p><small>Source: KSCPL Website Contact Form</small></p>
        `
      });

      return NextResponse.json({ success: true, message: 'Your enquiry has been sent successfully.' });
    } catch (sendError: any) {
      console.error('SMTP Send Error:', {
        code: sendError.code,
        message: sendError.message,
        command: sendError.command,
        response: sendError.response,
      });
      return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('General Error:', error.message || error);
    return NextResponse.json({ error: 'Unable to send your enquiry. Please try again.' }, { status: 500 });
  }
}
