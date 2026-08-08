import { NextResponse } from "next/server";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
const TIMEZONE = "Europe/Warsaw";

function parseCalLink(link: string) {
  const [username, eventTypeSlug] = link.split("/").filter(Boolean);
  return { username, eventTypeSlug };
}

export async function GET(request: Request) {
  if (!CAL_LINK) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CAL_LINK is not set." }, { status: 500 });
  }

  const { username, eventTypeSlug } = parseCalLink(CAL_LINK);
  if (!username || !eventTypeSlug) {
    return NextResponse.json({ error: "Invalid NEXT_PUBLIC_CAL_LINK." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json({ error: "start and end are required (YYYY-MM-DD)." }, { status: 400 });
  }

  const url = new URL("https://api.cal.com/v2/slots");
  url.searchParams.set("username", username);
  url.searchParams.set("eventTypeSlug", eventTypeSlug);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("timeZone", TIMEZONE);

  const response = await fetch(url, {
    headers: { "cal-api-version": "2024-09-04" },
    next: { revalidate: 60 },
  });

  const body = (await response.json()) as unknown;

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Cal.com slots.", details: body },
      { status: response.status },
    );
  }

  return NextResponse.json(body);
}
