import emailTransport from "./email-transport";
import { env } from "@/env.js";

const fonts = `font-family:'Segoe UI',Arial,Helvetica,sans-serif`;
const logoSrc = "https://assets.equippp.global/equippp-logo.png";

export async function sendExpressionEmail({
  to,
  name,
  amount,
  organisation,
}: {
  to: string;
  name: string;
  amount: number;
  organisation?: string;
}) {
  const displayName = name ? `${name}` : "there";
  const refNumber = `GCF-${Math.floor(Math.random() * 900000 + 100000)}`;
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f0f5;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f0f5;padding:40px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

    <!-- Header -->
    <tr>
      <td align="center" style="background:linear-gradient(135deg,#1e1b4b 0%,#3b1f6e 100%);padding:48px 48px 40px;">
        <img src="${logoSrc}" width="72" height="72" alt="Grace Cancer Foundation" style="display:block;margin:0 auto 20px;border-radius:14px;background:#ffffff;padding:8px;">
        <p style="${fonts};font-size:10px;font-weight:700;color:#c084fc;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 14px;">Expression of Interest Received</p>
        <h2 style="${fonts};font-size:22px;font-weight:800;color:#ffffff;margin:0;line-height:1.4;">Thank you for standing with us, ${displayName}.</h2>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:40px 48px 32px;">

        <p style="${fonts};font-size:14px;color:#475569;line-height:1.8;margin:0 0 28px;">
          We have received your expression of interest to support <strong style="color:#1e293b;">Grace Cancer Foundation</strong> on India's SEBI-regulated Social Stock Exchange (SSE). Your commitment brings us one step closer to a cancer-free world.
        </p>

        <!-- Details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:14px;margin-bottom:24px;">
          <tr>
            <td style="padding:20px 24px 0;">
              <p style="${fonts};font-size:10px;font-weight:700;color:#7c3aed;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Submission Details</p>
            </td>
          </tr>
          <!-- Row -->
          <tr>
            <td style="padding:0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ede9fe;">
                <tr>
                  <td style="padding:14px 0;width:40%;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;">Name</p>
                  </td>
                  <td style="padding:14px 0;text-align:right;">
                    <p style="${fonts};font-size:14px;color:#1e293b;font-weight:700;margin:0;">${name}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Row -->
          <tr>
            <td style="padding:0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ede9fe;">
                <tr>
                  <td style="padding:14px 0;width:40%;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;">Amount Expressed</p>
                  </td>
                  <td style="padding:14px 0;text-align:right;">
                    <p style="${fonts};font-size:18px;color:#1e293b;font-weight:800;margin:0;">${formattedAmount}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${organisation ? `
          <!-- Row -->
          <tr>
            <td style="padding:0 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ede9fe;">
                <tr>
                  <td style="padding:14px 0;width:40%;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;">Organisation</p>
                  </td>
                  <td style="padding:14px 0;text-align:right;">
                    <p style="${fonts};font-size:14px;color:#1e293b;font-weight:700;margin:0;">${organisation}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ""}
          <!-- Row -->
          <tr>
            <td style="padding:0 24px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ede9fe;">
                <tr>
                  <td style="padding:14px 0;width:40%;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;">Reference Number</p>
                  </td>
                  <td style="padding:14px 0;text-align:right;">
                    <p style="${fonts};font-size:13px;color:#1e293b;font-weight:700;margin:0;letter-spacing:0.5px;">${refNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- What's next -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:32px;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="${fonts};font-size:12px;font-weight:700;color:#92400e;margin:0 0 5px;">⚡ What happens next?</p>
              <p style="${fonts};font-size:13px;color:#78350f;line-height:1.7;margin:0;">We will reach out to you as soon as the SSE issue opens. No payment has been processed at this stage — this is an expression of interest only.</p>
            </td>
          </tr>
        </table>

        <!-- Sign off -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-top:1px solid #e2e8f0;padding-top:24px;">
              <p style="${fonts};font-size:13px;color:#64748b;margin:0 0 4px;">With gratitude,</p>
              <p style="${fonts};font-size:15px;font-weight:700;color:#1e293b;margin:0;">Grace Cancer Foundation</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 48px;">
        <p style="${fonts};font-size:11px;color:#94a3b8;margin:0 0 4px;">Grace Cancer Foundation · 12A Certified · 80G Exempt · FCRA Registered</p>
        <p style="${fonts};font-size:11px;color:#cbd5e1;margin:0;font-style:italic;">Together, we can build a cancer-free world.</p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;

  await emailTransport.sendMail({
    from: `Grace Cancer Foundation <${env.SENDER_EMAIL}>`,
    to,
    cc: "saikiran@equippp.com",
    subject: `Your Expression of Interest — Grace Cancer Foundation SSE`,
    html,
  });
}
