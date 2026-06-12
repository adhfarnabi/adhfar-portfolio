const nodemailer = require('nodemailer');

// Create transporter (Gmail)
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,   // Gmail App Password
    },
  });
};

/**
 * Send notification email to Adhfar when someone contacts him
 */
const sendContactNotification = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('⚠️  Email not configured — skipping notification email');
    return;
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0F0F2E;color:#F0EEFF;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7C3AED,#FF4D6D);padding:24px 32px;">
        <h2 style="margin:0;color:#fff;font-size:1.4rem;">📬 New Portfolio Message</h2>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:0.9rem;">Someone contacted you via your portfolio website</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#9490B5;font-size:0.85rem;width:90px;">From</td>
            <td style="padding:10px 0;color:#F0EEFF;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9490B5;font-size:0.85rem;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#00D4FF;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9490B5;font-size:0.85rem;">Subject</td>
            <td style="padding:10px 0;color:#F0EEFF;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top:20px;padding:20px;background:#141430;border-radius:8px;border-left:3px solid #7C3AED;">
          <p style="margin:0 0 8px;color:#9490B5;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <p style="margin:0;color:#F0EEFF;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top:24px;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
             style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#7C3AED,#FF4D6D);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
            Reply to ${name} →
          </a>
        </div>
      </div>
      <div style="padding:16px 32px;border-top:1px solid rgba(124,58,237,0.2);color:#9490B5;font-size:0.75rem;">
        Sent from your portfolio contact form · adhfarnabi2020@gmail.com
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,        // sends to yourself
    replyTo: email,                    // so Reply button goes to the visitor
    subject: `[Portfolio] ${subject} — from ${name}`,
    html,
    text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
  });

  console.log(`✅ Notification email sent for message from ${name}`);
};

/**
 * Send auto-reply to the person who contacted you
 */
const sendAutoReply = async ({ name, email }) => {
  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"Adhfar Nabi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
        <h2 style="color:#7C3AED;">Hey ${name} 👋</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
        <p style="color:#555;">Meanwhile, feel free to check out my work on <a href="https://github.com/adhfarnabi" style="color:#7C3AED;">GitHub</a> or connect on <a href="https://linkedin.com/in/adhfar-nabi" style="color:#7C3AED;">LinkedIn</a>.</p>
        <br>
        <p>Best,<br><strong>Adhfar Nabi</strong><br>Full Stack Developer</p>
      </div>
    `,
  });
};

module.exports = { sendContactNotification, sendAutoReply };
