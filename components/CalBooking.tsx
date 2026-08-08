"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
const BRAND = "#c8ff00";

export function CalBooking() {
  useEffect(() => {
    if (!CAL_LINK) return;

    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: "contact" });
      if (cancelled) return;

      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": BRAND,
          },
          dark: {
            "cal-brand": BRAND,
          },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      });

      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          trackEvent("booking_success", { location: "contact_section" });
        },
      });
    })();

    trackEvent("booking_embed_view", { location: "contact_section" });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CAL_LINK) {
    return (
      <div className="contact-cal is-empty">
        <p>
          Ustaw <code>NEXT_PUBLIC_CAL_LINK</code> w <code>.env.local</code> (np.{" "}
          <code>twoj-nick/30min</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="contact-cal">
      <Cal
        namespace="contact"
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: "month_view",
          theme: "light",
        }}
      />
    </div>
  );
}
