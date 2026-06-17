import emailTransport from "./email-transport";
import { env } from "@/env.js";

const fonts = `font-family:'Segoe UI',Arial,Helvetica,sans-serif`;
const logoSrc = "https://assets.equippp.global/equippp-logo.png";

export async function sendExpressionEmail({
  to,
  name,
  amount,
}: {
  to: string;
  name: string;
  amount: number;
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
<body style="margin:0;padding:0;background:#f8f4f4;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4f4;padding:40px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.10);">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#1e1b4b,#2d1b69);padding:44px 48px 36px;text-align:center;">
        <img src="${logoSrc}" width="80" height="80" alt="Grace Cancer Foundation" style="margin-bottom:20px;border-radius:14px;background:#ffffff;padding:8px;">
        <p style="${fonts};font-size:11px;font-weight:700;color:#c084fc;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Expression of Interest Received</p>
        <h2 style="${fonts};font-size:24px;font-weight:800;color:#ffffff;margin:0;line-height:1.3;">Thank you for standing with us,<br>${displayName}.</h2>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:36px 48px;">

        <p style="${fonts};font-size:15px;color:#334155;line-height:1.8;margin:0 0 24px;">
          We have received your expression of interest to support <strong style="color:#1e293b;">Grace Cancer Foundation</strong> on India's SEBI-regulated Social Stock Exchange (SSE). Your commitment brings us one step closer to a cancer-free world.
        </p>

        <!-- Details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:14px;margin-bottom:28px;">
          <tr>
            <td style="padding:24px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e9d5ff;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                    <p style="${fonts};font-size:15px;color:#1e293b;font-weight:700;margin:4px 0 0;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e9d5ff;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:0.5px;">Amount Expressed</p>
                    <p style="${fonts};font-size:20px;color:#1e293b;font-weight:800;margin:4px 0 0;">${formattedAmount}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <p style="${fonts};font-size:12px;color:#7c3aed;font-weight:600;margin:0;text-transform:uppercase;letter-spacing:0.5px;">Reference Number</p>
                    <p style="${fonts};font-size:15px;color:#1e293b;font-weight:700;margin:4px 0 0;">${refNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- What's next -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:28px;">
          <tr>
            <td style="padding:18px 22px;">
              <p style="${fonts};font-size:13px;font-weight:700;color:#92400e;margin:0 0 6px;">⚡ What happens next?</p>
              <p style="${fonts};font-size:13px;color:#78350f;line-height:1.7;margin:0;">
                We will reach out to you as soon as the SSE issue opens. No payment has been processed at this stage — this is an expression of interest only.
              </p>
            </td>
          </tr>
        </table>

        <!-- Disclaimer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;margin-bottom:32px;">
          <tr>
            <td style="padding:16px 22px;">
              <p style="${fonts};font-size:12px;color:#166534;line-height:1.7;margin:0;">
                <strong>Please note:</strong> Grace Cancer Foundation is listed on SEBI's Social Stock Exchange. All contributions are eligible for tax exemption under <strong>Section 80G</strong> of the Income Tax Act.
              </p>
            </td>
          </tr>
        </table>

        <!-- Sign off -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:24px;">
          <tr>
            <td>
              <p style="${fonts};font-size:14px;color:#334155;margin:0 0 4px;">With gratitude,</p>
              <p style="${fonts};font-size:15px;font-weight:700;color:#1e293b;margin:0 0 2px;">Grace Cancer Foundation</p>
              <p style="${fonts};font-size:13px;color:#64748b;margin:0;">Listed on NSE Social Stock Exchange · SEBI-Regulated</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
        <p style="${fonts};font-size:12px;color:#64748b;margin:0 0 4px;">Grace Cancer Foundation · 12A Certified · 80G Exempt · FCRA Registered</p>
        <p style="${fonts};font-size:11px;color:#94a3b8;margin:0;font-style:italic;">Together, we can build a cancer-free world.</p>
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
    subject: `Your Expression of Interest — Grace Cancer Foundation SSE`,
    html,
  });
}
