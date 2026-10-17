import nodemailer from 'nodemailer';

const DEFAULT_CONTACT_TO = 'ebirone4@gmail.com';
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const HEADER_CONTROL_CHARACTERS = /[\x00-\x1F\x7F]/;
const MESSAGE_CONTROL_CHARACTERS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function getMailConfiguration(env = process.env) {
  const rawPort = cleanText(env.SMTP_PORT);
  const port = rawPort ? Number(rawPort) : NaN;
  const rawSecure = cleanText(env.SMTP_SECURE).toLowerCase();
  const config = {
    host: cleanText(env.SMTP_HOST),
    port,
    secure: rawSecure === 'true' || rawSecure === '1',
    user: cleanText(env.SMTP_USER),
    key: cleanText(env.SMTP_PASS),
    from: cleanText(env.CONTACT_FROM),
    to: cleanText(env.CONTACT_TO) || DEFAULT_CONTACT_TO,
  };
  const missing = [];
  if (!config.host) missing.push('SMTP_HOST');
  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) missing.push('valid SMTP_PORT');
  if (!['true', 'false', '1', '0'].includes(rawSecure)) missing.push('SMTP_SECURE (true or false)');
  if (!config.user) missing.push('SMTP_USER');
  if (!config.key) missing.push('SMTP_PASS');
  if (!config.from) missing.push('CONTACT_FROM');
  if (config.from && !EMAIL_PATTERN.test(config.from)) missing.push('valid CONTACT_FROM');
  if (!EMAIL_PATTERN.test(config.to)) missing.push('valid CONTACT_TO');
  return { ...config, missing, configured: missing.length === 0 };
}

export function createContactService({ env = process.env, deliverEmail } = {}) {
  let transporter;
  const sendEmail = deliverEmail ?? ((mailConfig, message) => {
    transporter ??= nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      requireTLS: !mailConfig.secure,
      auth: { user: mailConfig.user, pass: mailConfig.key },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
    return transporter.sendMail(message);
  });

  return async function sendContactMessage(input) {
    const body = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
    const name = cleanText(body.name);
    const email = cleanText(body.email);
    const subject = cleanText(body.subject);
    const message = cleanText(body.message);

    // Do not send messages from submissions that hit the hidden honeypot.
    if (cleanText(body.website)) {
      return { status: 400, body: { ok: false, message: 'Please check the form and try again.' } };
    }
    if (name.length < 1 || name.length > 100 || HEADER_CONTROL_CHARACTERS.test(name)) {
      return { status: 400, body: { ok: false, message: 'Please enter a name between 1 and 100 characters.' } };
    }
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return { status: 400, body: { ok: false, message: 'Please enter a valid email address.' } };
    }
    if (subject.length < 1 || subject.length > 200 || HEADER_CONTROL_CHARACTERS.test(subject)) {
      return { status: 400, body: { ok: false, message: 'Please enter a subject between 1 and 200 characters.' } };
    }
    if (message.length < 1 || message.length > 5000 || MESSAGE_CONTROL_CHARACTERS.test(message)) {
      return { status: 400, body: { ok: false, message: 'Please enter a message of up to 5,000 characters.' } };
    }

    const mailConfig = getMailConfiguration(env);
    if (!mailConfig.configured) {
      return {
        status: 503,
        body: {
          ok: false,
          configured: false,
          message: 'The contact email service is not configured yet. Please reach out through LinkedIn instead.',
        },
      };
    }

    const emailMessage = {
      from: { name: 'Ebirone Michael · Portfolio', address: mailConfig.from },
      to: mailConfig.to,
      replyTo: { name, address: email },
      subject: `[Portfolio contact] ${subject}`,
      text: [
        'New message from the Ebirone Michael portfolio contact form',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `<h2>New portfolio contact</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    };

    try {
      await sendEmail(mailConfig, emailMessage);
      return { status: 200, body: { ok: true, message: 'Message sent. Thank you for reaching out.' } };
    } catch (error) {
      const code = error && typeof error.code === 'string' ? error.code : 'unknown';
      console.error('Contact email delivery failed (code):', code);
      return { status: 502, body: { ok: false, message: 'Email delivery failed. Please try again later.' } };
    }
  };
}
