import { NextResponse } from "next/server";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
const TIMEZONE = "Europe/Warsaw";

function parseCalLink(link: string) {
  const [username, eventTypeSlug] = link.split("/").filter(Boolean);
  return { username, eventTypeSlug };
}

export async function POST(request: Request) {
  if (!CAL_LINK) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CAL_LINK is not set." }, { status: 500 });
  }

  const { username, eventTypeSlug } = parseCalLink(CAL_LINK);
  if (!username || !eventTypeSlug) {
    return NextResponse.json({ error: "Invalid NEXT_PUBLIC_CAL_LINK." }, { status: 500 });
  }

  const body = (await request.json()) as {
    start?: string;
    name?: string;
    email?: string;
    notes?: string;
  };

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const start = body.start?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (!name || !email || !start) {
    return NextResponse.json(
      { error: "Uzupełnij wymagane pola: imię, e-mail i termin." },
      { status: 400 },
    );
  }

  const startUtc = new Date(start).toISOString();

  const payload: Record<string, unknown> = {
    start: startUtc,
    eventTypeSlug,
    username,
    attendee: {
      name,
      email,
      timeZone: TIMEZONE,
      language: "pl",
    },
  };

  if (notes) {
    payload.metadata = { notes };
    payload.bookingFieldsResponses = { notes };
  }

  const response = await fetch("https://api.cal.com/v2/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as {
    status?: string;
    error?: { message?: string };
    message?: string;
    data?: unknown;
  };

  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          result.error?.message ??
          result.message ??
          "Nie udało się zarezerwować terminu. Spróbuj ponownie.",
      },
      { status: response.status },
    );
  }

  return NextResponse.json({ status: "success", data: result.data ?? result });
}
