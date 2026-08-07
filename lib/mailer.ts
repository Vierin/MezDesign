import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  companyName?: string;
  siteLink?: string;
  message: string;
};

const CONTACT_RECIPIENT = "dmezeankina@gmail.com";
const DEFAULT_FROM = "Mez Design <onboarding@resend.dev>";
const PUBLIC_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com"
]);

function getResendApiKey(): string {
  const apiKey = process.env.RESEND_API?.trim() || process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Brak zmiennej srodowiskowej: RESEND_API (lub RESEND_API_KEY).");
  }
  return apiKey;
}

function resolveFromAddress(): string {
  const configuredFrom = process.env.RESEND_FROM?.trim();
  if (!configuredFrom) {
    return DEFAULT_FROM;
  }

  const fromEmailMatch = configuredFrom.match(/<([^>]+)>/);
  const email = (fromEmailMatch?.[1] ?? configuredFrom).trim().toLowerCase();
  const domain = email.split("@")[1];

  if (!domain || PUBLIC_EMAIL_DOMAINS.has(domain)) {
    return DEFAULT_FROM;
  }

  return configuredFrom;
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
  const apiKey = getResendApiKey();
  const from = resolveFromAddress();
  const mailTo = CONTACT_RECIPIENT;
  const resend = new Resend(apiKey);

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeCompany = escapeHtml(payload.companyName?.trim() || "Nie podano");
  const safeSiteLink = escapeHtml(payload.siteLink?.trim() || "Nie podano");
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br/>");

  const { error } = await resend.emails.send({
    from,
    to: mailTo,
    replyTo: payload.email,
    subject: `Nowa wiadomość od: ${payload.name}`,
    text: `Imię: ${payload.name}\nE-mail: ${payload.email}\nFirma: ${payload.companyName?.trim() || "Nie podano"}\nAdres strony / social: ${payload.siteLink?.trim() || "Nie podano"}\n\nWiadomość:\n${payload.message}`,
    html: `
      <h2>Nowe zapytanie ze strony</h2>
      <p><strong>Imię:</strong> ${safeName}</p>
      <p><strong>E-mail:</strong> ${safeEmail}</p>
      <p><strong>Firma:</strong> ${safeCompany}</p>
      <p><strong>Adres strony / social:</strong> ${safeSiteLink}</p>
      <p><strong>Wiadomość:</strong><br/>${safeMessage}</p>
    `
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
