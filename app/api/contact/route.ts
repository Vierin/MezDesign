import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mailer";
import { getClientIp, hitRateLimit, peekRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Imię jest za krótkie.").max(120, "Imię jest za długie."),
  email: z.string().trim().email("Niepoprawny adres e-mail."),
  companyName: z
    .string()
    .trim()
    .max(160, "Nazwa firmy jest za długa.")
    .optional()
    .or(z.literal("")),
  siteLink: z
    .string()
    .trim()
    .max(220, "Link jest za długi.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość powinna mieć co najmniej 10 znaków.")
    .max(4000, "Wiadomość jest za długa."),
  website: z.string().max(0).optional(), // honeypot
  company: z.string().max(0).optional(), // legacy honeypot
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza." },
        { status: 400 },
      );
    }

    if (parsed.data.website || parsed.data.company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const ip = getClientIp(request);
    const emailKey = parsed.data.email.toLowerCase();
    const ipKey = `contact:ip:${ip}`;
    const mailKey = `contact:email:${emailKey}`;
    const ipLimit = peekRateLimit(ipKey);
    const emailLimit = peekRateLimit(mailKey);

    if (!ipLimit.ok || !emailLimit.ok) {
      const retryAfterSec = Math.max(ipLimit.retryAfterSec ?? 0, emailLimit.retryAfterSec ?? 0);
      return NextResponse.json(
        {
          error:
            "Wysłano już maksymalnie 3 wiadomości w ciągu godziny. Spróbuj ponownie później.",
          retryAfterSec,
        },
        {
          status: 429,
          headers: retryAfterSec ? { "Retry-After": String(retryAfterSec) } : undefined,
        },
      );
    }

    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      companyName: parsed.data.companyName,
      siteLink: parsed.data.siteLink,
      message: parsed.data.message,
    });

    hitRateLimit(ipKey);
    hitRateLimit(mailKey);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Wystąpił błąd serwera podczas wysyłki wiadomości.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
