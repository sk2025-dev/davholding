<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation de rendez-vous — Dav'Beauté</title>
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
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:400;font-style:italic;">Rendez-vous confirmé ✅</h1>
              <p style="margin:0;color:rgba(255,255,255,0.6);font-size:12px;">Réf. #RDV-{{ str_pad($rdv->id, 5, '0', STR_PAD_LEFT) }}</p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#1a0f0a;line-height:1.6;">
                Bonjour <strong>{{ $rdv->client_name }}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:rgba(26,15,10,0.7);line-height:1.7;">
                Votre avance de <strong>5 000 FCFA</strong> a bien été reçue et votre rendez-vous est
                <strong style="color:#1a7a3e;">confirmé</strong>. Voici votre récapitulatif et votre reçu de paiement :
              </p>

              <!-- Carte RDV -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;border-radius:14px;border:1px solid rgba(201,160,96,0.3);margin-bottom:20px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                          <span style="font-size:12px;color:rgba(26,15,10,0.5);text-transform:uppercase;letter-spacing:0.08em;">💆 Soin</span><br/>
                          <span style="font-size:15px;font-weight:600;color:#1a0f0a;">{{ $rdv->service }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                          <span style="font-size:12px;color:rgba(26,15,10,0.5);text-transform:uppercase;letter-spacing:0.08em;">📅 Date</span><br/>
                          <span style="font-size:15px;font-weight:600;color:#1a0f0a;">
                            {{ \Carbon\Carbon::parse($rdv->appointment_date)->isoFormat('dddd D MMMM YYYY') }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                          <span style="font-size:12px;color:rgba(26,15,10,0.5);text-transform:uppercase;letter-spacing:0.08em;">🕐 Heure</span><br/>
                          <span style="font-size:15px;font-weight:600;color:#1a0f0a;">
                            {{ \Carbon\Carbon::parse($rdv->appointment_date)->format('H:i') }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                          <span style="font-size:12px;color:rgba(26,15,10,0.5);text-transform:uppercase;letter-spacing:0.08em;">📍 Lieu</span><br/>
                          <span style="font-size:15px;font-weight:600;color:#1a0f0a;">Cocody Angré, 8e tranche — Abidjan</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:12px;color:rgba(26,15,10,0.5);text-transform:uppercase;letter-spacing:0.08em;">🔖 Référence</span><br/>
                          <span style="font-size:15px;font-weight:600;color:#1a0f0a;font-family:monospace;letter-spacing:0.05em;">
                            #RDV-{{ str_pad($rdv->id, 5, '0', STR_PAD_LEFT) }}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Reçu paiement avance -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:14px;overflow:hidden;margin-bottom:28px;border:1px solid rgba(34,197,94,.25);">
                <tr>
                  <td style="background:rgba(34,197,94,.08);padding:6px 24px 4px;">
                    <span style="font-size:10px;color:#1a7a3e;text-transform:uppercase;letter-spacing:0.12em;font-weight:700;">✅ Reçu de paiement</span>
                  </td>
                </tr>
                <tr>
                  <td style="background:#fff;padding:16px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:rgba(26,15,10,0.6);">Avance réservation</td>
                        <td align="right" style="font-size:15px;font-weight:700;color:#1a0f0a;">5 000 FCFA</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:rgba(26,15,10,0.6);padding-top:8px;">Statut</td>
                        <td align="right" style="padding-top:8px;">
                          <span style="background:#dcfce7;color:#1a7a3e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:100px;">PAYÉ</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:rgba(26,15,10,0.6);padding-top:8px;">Date de paiement</td>
                        <td align="right" style="font-size:13px;color:rgba(26,15,10,0.6);padding-top:8px;">
                          {{ \Carbon\Carbon::parse($rdv->updated_at)->isoFormat('D MMMM YYYY [à] HH:mm') }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top:12px;border-top:1px dashed rgba(0,0,0,0.1);padding-top:12px;margin-top:12px;"></td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:rgba(26,15,10,0.6);">Reste à régler le jour J</td>
                        <td align="right" style="font-size:13px;color:rgba(26,15,10,0.6);">Prestation − 5 000 FCFA</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              @if($rdv->notes)
              <p style="margin:0 0 20px;font-size:13px;color:rgba(26,15,10,0.6);background:#faf6f0;border-radius:10px;padding:14px 18px;line-height:1.6;">
                <strong>Votre note :</strong> {{ $rdv->notes }}
              </p>
              @endif

              <p style="margin:0;font-size:13.5px;color:rgba(26,15,10,0.65);line-height:1.7;">
                En cas d'empêchement, merci de nous prévenir <strong>24h à l'avance</strong> au
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
