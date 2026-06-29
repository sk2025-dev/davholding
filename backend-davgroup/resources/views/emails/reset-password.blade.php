<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Réinitialisation du mot de passe — Dav'Beauté</title>
</head>
<body style="margin:0;padding:0;background:#faf6f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- En-tête -->
          <tr>
            <td style="background:#c41420;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Dav'Beauté</p>
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:24px;font-weight:400;font-style:italic;">Réinitialisation du mot de passe 🔐</h1>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#1a0f0a;line-height:1.6;">
                Bonjour,
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:rgba(26,15,10,0.7);line-height:1.7;">
                Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Dav'Beauté.
                Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe. Ce lien est valable <strong>60 minutes</strong>.
              </p>

              <!-- Bouton -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="{{ $url }}"
                       style="display:inline-block;background:#c41420;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:100px;letter-spacing:0.03em;">
                      Réinitialiser mon mot de passe
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Lien texte fallback -->
              <p style="margin:0 0 16px;font-size:12px;color:rgba(26,15,10,0.5);line-height:1.6;">
                Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :
              </p>
              <p style="margin:0 0 28px;font-size:11px;color:#c41420;word-break:break-all;line-height:1.5;">
                {{ $url }}
              </p>

              <!-- Avertissement -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;border-radius:12px;border:1px solid rgba(196,20,32,0.15);margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:rgba(26,15,10,0.65);line-height:1.6;">
                      ⚠️ Si vous n'êtes pas à l'origine de cette demande, ignorez cet email. Votre mot de passe ne sera pas modifié.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:rgba(26,15,10,0.5);line-height:1.6;">
                Pour toute question, contactez-nous au
                <a href="tel:+2250757249390" style="color:#c41420;text-decoration:none;font-weight:600;">+225 07 57 24 93 90</a>.
              </p>
            </td>
          </tr>

          <!-- Pied -->
          <tr>
            <td style="background:#1a0f0a;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);">
                Dav'Beauté · Cocody Angré, 8e tranche, Abidjan · Côte d'Ivoire
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
