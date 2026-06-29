<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    /* ── Étape 1 : envoyer le lien de réinitialisation ── */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(['email' => $request->email]);

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Un lien de réinitialisation a été envoyé à votre adresse email.',
            ]);
        }

        // Email introuvable ou limite d'envoi atteinte
        return response()->json([
            'message' => 'Impossible d\'envoyer le lien. Vérifiez votre adresse email.',
        ], 422);
    }

    /* ── Étape 2 : réinitialiser le mot de passe ── */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token'                 => 'required|string',
            'email'                 => 'required|email',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password'       => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                // Révoquer tous les tokens Sanctum existants pour sécurité
                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
            ]);
        }

        return response()->json([
            'message' => 'Le lien est invalide ou expiré. Veuillez en demander un nouveau.',
            'errors'  => ['token' => [__($status)]],
        ], 422);
    }
}
