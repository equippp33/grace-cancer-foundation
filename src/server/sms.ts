import { env } from "@/env.js";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export async function sendSms(phone: string, message: string): Promise<void> {
  if (!env.MTALKZ_SENDER_ID) {
    console.warn("[SMS] MTALKZ_SENDER_ID not set — skipping.");
    return;
  }

  const number = normalizePhone(phone);

  const payload = {
    apikey: env.MTALKZ_API_KEY,
    senderid: env.MTALKZ_SENDER_ID,
    number,
    message,
    format: "JSON",
  };

  console.log("[SMS] Sending to", number, "via MTalkz...");

  try {
    const params = new URLSearchParams({
      apikey: payload.apikey,
      senderid: payload.senderid,
      number,
      message,
      format: "JSON",
      ...(env.MTALKZ_TEMPLATE_ID ? { templateid: env.MTALKZ_TEMPLATE_ID } : {}),
    });

    const res = await fetch(
      `https://msgn.mtalkz.com/api?${params.toString()}`,
      { method: "GET" },
    );

    const body = await res.text();
    console.log("[SMS] MTalkz response:", res.status, body);
  } catch (err) {
    console.error("[SMS] MTalkz request failed:", err);
  }
}
