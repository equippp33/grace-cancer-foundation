import { env } from "@/env.js";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export async function sendSms(phone: string, message: string): Promise<void> {
  if (!env.MTALKZ_SENDER_ID) return;

  const number = normalizePhone(phone);

  const res = await fetch("https://msgn.mtalkz.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: env.MTALKZ_API_KEY,
      senderid: env.MTALKZ_SENDER_ID,
      number,
      message,
      format: "JSON",
    }),
  });

  if (!res.ok) {
    console.error("MTalkz SMS failed:", res.status, await res.text());
  }
}
