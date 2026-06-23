<?php

namespace App\Mail;

use App\Models\Rdv;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RdvConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Rdv $rdv) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "✅ Votre rendez-vous est confirmé — Dav'Beauté",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.rdv-confirmation',
        );
    }
}
