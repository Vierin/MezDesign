import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Imie jest za krotkie.").max(120, "Imie jest za dlugie."),
  email: z.string().trim().email("Niepoprawny adres e-mail."),
  siteLink: z
    .string()
    .trim()
    .max(220, "Link jest za dlugi.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomosc powinna miec co najmniej 10 znakow.")
    .max(4000, "Wiadomosc jest za dluga."),
  company: z.string().max(0).optional()
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Niepoprawne dane formularza." },
        { status: 400 }
      );
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      siteLink: parsed.data.siteLink,
      message: parsed.data.message
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Wystapil blad serwera podczas wysylki wiadomosci.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
