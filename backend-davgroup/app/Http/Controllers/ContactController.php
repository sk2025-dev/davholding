<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'prenom'  => 'required|string|max:100',
            'nom'     => 'nullable|string|max:100',
            'email'   => 'required|email|max:150',
            'company' => 'nullable|string|max:150',
            'tel'     => 'required|string|max:30',
            'message' => 'required|string|max:3000',
        ]);

        $prenom  = $request->input('prenom');
        $nom     = $request->input('nom', '');
        $email   = $request->input('email');
        $company = $request->input('company', '');
        $tel     = $request->input('tel');
        $message = $request->input('message');

        $fullName    = trim("{$prenom} {$nom}");
        $companyLine = $company ? "<tr><td style='padding:6px 0;color:#6b7280;font-size:14px;width:110px'>Société</td><td style='padding:6px 0;color:#111827;font-size:14px;font-weight:600'>{$company}</td></tr>" : '';
        $messageHtml = nl2br(htmlspecialchars($message));
        $replyUrl    = "mailto:{$email}?subject=Re%3A%20Votre%20demande%20%E2%80%94%20DAV%20Consulting";

        $html = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#0f0f12 0%,#1a0505 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.45)">DAV CONSULTING</p>
                <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff">Nouveau message de contact</h1>
              </td>
              <td align="right" valign="top">
                <span style="display:inline-block;background:#cc0010;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;padding:5px 13px;border-radius:100px;text-transform:uppercase">Nouveau</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#ffffff;padding:36px 40px">

          <!-- Infos client -->
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af">Informations client</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:28px">
            <tr><td style="padding:20px 24px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;width:110px">Nom complet</td>
                  <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600">{$fullName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;border-top:1px solid #f3f4f6">Email</td>
                  <td style="padding:6px 0;border-top:1px solid #f3f4f6">
                    <a href="mailto:{$email}" style="color:#cc0010;font-size:14px;font-weight:600;text-decoration:none">{$email}</a>
                  </td>
                </tr>
                {$companyLine}
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px;border-top:1px solid #f3f4f6">Téléphone</td>
                  <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;border-top:1px solid #f3f4f6">{$tel}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Message -->
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af">Message</p>
          <div style="background:#f9fafb;border-left:3px solid #cc0010;border-radius:0 10px 10px 0;padding:20px 24px;margin-bottom:32px;color:#374151;font-size:15px;line-height:1.7">
            {$messageHtml}
          </div>

          <!-- Bouton Répondre -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="{$replyUrl}" style="display:inline-block;background:#cc0010;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:14px 36px;border-radius:100px">
                Répondre à {$prenom} →
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
            Ce message a été envoyé via le formulaire de contact de <strong style="color:#6b7280">davholdinggroup.com</strong>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
HTML;

        $to = env('CONTACT_EMAIL', env('MAIL_FROM_ADDRESS'));

        Mail::html($html, function ($mail) use ($to, $prenom, $nom, $email) {
            $mail->to($to)
                 ->replyTo($email, "{$prenom} {$nom}")
                 ->subject("✉️ Nouveau contact — {$prenom} {$nom}");
        });

        return response()->json(['success' => true, 'message' => 'Message envoyé.']);
    }
}
