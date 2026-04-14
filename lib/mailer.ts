import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function getEnvValue(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Brak zmiennej srodowiskowej: ${name}`);
  }
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendContactEmail(payload: ContactPayload) {
  const host = getEnvValue("SMTP_HOST");
  const port = Number(getEnvValue("SMTP_PORT"));
  const user = getEnvValue("SMTP_USER");
  const pass = getEnvValue("SMTP_PASS");
  const mailTo = getEnvValue("MAIL_TO");
  const secure = process.env.SMTP_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone ?? "Nie podano");
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br/>");

  await transporter.sendMail({
    from: `"Formularz strony" <${user}>`,
    to: mailTo,
    replyTo: payload.email,
    subject: `Nowa wiadomosc od: ${payload.name}`,
    text: `Imie: ${payload.name}\nE-mail: ${payload.email}\nTelefon: ${payload.phone ?? "Nie podano"}\n\nWiadomosc:\n${payload.message}`,
    html: `
      <h2>Nowe zapytanie ze strony</h2>
      <p><strong>Imie:</strong> ${safeName}</p>
      <p><strong>E-mail:</strong> ${safeEmail}</p>
      <p><strong>Telefon:</strong> ${safePhone}</p>
      <p><strong>Wiadomosc:</strong><br/>${safeMessage}</p>
    `
  });
}
