<?php

namespace App\Http\Controllers;

use App\Models\ChatbotMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatbotController extends Controller
{
    private const KNOWLEDGE = [
        'consulting' => [
            'terms' => ['consulting', 'site', 'application', 'mobile', 'digital', 'informatique', 'logiciel', 'it'],
            'answer' => "Dav'Consulting est le pôle technologique de Dav'Holding Group SARL. Il réalise des sites web, applications web et mobiles, identités visuelles, infrastructures IT, solutions de sécurité et applications métier.",
            'actions' => [['label' => "Découvrir Dav'Consulting", 'href' => '/consulting']],
        ],
        'pricing' => [
            'terms' => ['tarif', 'prix', 'cout', 'budget', 'pack', 'devis'],
            'answer' => "Les offres Dav'Consulting commencent à 400 000 FCFA pour une présence digitale, 1 500 000 FCFA pour une application métier et 2 800 000 FCFA pour une solution avec IA. Un cadrage confirme le budget définitif.",
            'actions' => [['label' => 'Voir les offres', 'href' => '/consulting#offres']],
        ],
        'beauty' => [
            'terms' => ['beaute', 'coiffure', 'spa', 'ongle', 'onglerie', 'rendez', 'rdv', 'reservation'],
            'answer' => "Dav'Beauté propose notamment coiffure, soins capillaires, spa, onglerie et cosmétiques. Vous pouvez consulter les prestations et réserver directement en ligne.",
            'actions' => [['label' => 'Prendre rendez-vous', 'href' => '/beaute/realisations?rdv=1']],
        ],
        'group' => [
            'terms' => ['holding', 'groupe', 'dav', 'structure', 'entreprise'],
            'answer' => "Dav'Holding Group SARL est la structure juridique du groupe. Elle réunit notamment Dav'Consulting, le pôle technologique, Dav'Beauté et Dav'Market.",
        ],
        'contact' => [
            'terms' => ['contact', 'conseiller', 'humain', 'appeler', 'telephone', 'email', 'projet'],
            'answer' => "Je peux vous orienter. Pour échanger avec l'équipe, utilisez le formulaire de contact ou appelez le +225 07 58 86 37 65.",
            'contact' => true,
        ],
    ];

    public function message(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => ['required', 'string', 'max:800'],
            'session_id' => ['required', 'string', 'max:100'],
            'page' => ['nullable', 'string', 'max:255'],
        ]);

        [$intent, $entry, $score] = $this->findBestAnswer($data['message']);
        if ($score === 0) {
            [$intent, $entry, $score] = $this->findLearnedAnswer($data['message']);
        }
        $understood = $score > 0;

        if (!$understood) {
            $intent = 'unresolved';
            $entry = [
                'answer' => "Je n'ai pas encore une réponse suffisamment précise à cette préoccupation. Je l'ai enregistrée pour améliorer mes prochaines réponses. Vous pouvez aussi demander à être contacté par notre équipe.",
                'contact' => true,
            ];
        }

        $message = ChatbotMessage::create([
            'session_id' => $data['session_id'],
            'page' => $data['page'] ?? null,
            'question' => $data['message'],
            'answer' => $entry['answer'],
            'intent' => $intent,
            'understood' => $understood,
        ]);

        return response()->json([
            'message_id' => $message->id,
            'answer' => $entry['answer'],
            'understood' => $understood,
            'intent' => $intent,
            'actions' => $entry['actions'] ?? [],
            'contact' => $entry['contact'] ?? false,
        ]);
    }

    public function feedback(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message_id' => ['required', 'integer', 'exists:chatbot_messages,id'],
            'helpful' => ['required', 'boolean'],
        ]);

        ChatbotMessage::whereKey($data['message_id'])->update(['helpful' => $data['helpful']]);

        return response()->json(['success' => true]);
    }

    private function findBestAnswer(string $question): array
    {
        $normalized = Str::of($question)->ascii()->lower()->toString();
        $bestIntent = null;
        $bestEntry = null;
        $bestScore = 0;

        foreach (self::KNOWLEDGE as $intent => $entry) {
            $score = 0;
            foreach ($entry['terms'] as $term) {
                if (str_contains($normalized, Str::ascii($term))) {
                    $score++;
                }
            }
            if ($score > $bestScore) {
                $bestIntent = $intent;
                $bestEntry = $entry;
                $bestScore = $score;
            }
        }

        return [$bestIntent, $bestEntry, $bestScore];
    }

    /**
     * Réutilise uniquement les réponses précédemment évaluées comme utiles.
     * Cela enrichit la compréhension des formulations sans permettre aux
     * visiteurs d'injecter directement une nouvelle réponse.
     */
    private function findLearnedAnswer(string $question): array
    {
        $questionTokens = $this->tokens($question);
        if (count($questionTokens) < 2) {
            return [null, null, 0];
        }

        $best = null;
        $bestSimilarity = 0.0;

        ChatbotMessage::query()
            ->where('helpful', true)
            ->where('understood', true)
            ->latest()
            ->limit(300)
            ->get(['question', 'answer', 'intent'])
            ->each(function (ChatbotMessage $message) use ($questionTokens, &$best, &$bestSimilarity) {
                $knownTokens = $this->tokens($message->question);
                $union = array_unique(array_merge($questionTokens, $knownTokens));
                if ($union === []) {
                    return;
                }
                $intersection = array_intersect($questionTokens, $knownTokens);
                $similarity = count($intersection) / count($union);
                if ($similarity > $bestSimilarity) {
                    $bestSimilarity = $similarity;
                    $best = $message;
                }
            });

        if (!$best || $bestSimilarity < 0.34) {
            return [null, null, 0];
        }

        $baseEntry = self::KNOWLEDGE[$best->intent] ?? [];

        return [
            $best->intent,
            array_merge($baseEntry, ['answer' => $best->answer]),
            $bestSimilarity,
        ];
    }

    private function tokens(string $value): array
    {
        $stopWords = ['avec', 'dans', 'des', 'est', 'les', 'pour', 'que', 'qui', 'une', 'vous', 'votre'];
        $normalized = preg_replace('/[^a-z0-9\s]/', ' ', Str::of($value)->ascii()->lower()->toString());
        $tokens = array_filter(
            preg_split('/\s+/', $normalized) ?: [],
            fn (string $token) => strlen($token) >= 3 && !in_array($token, $stopWords, true)
        );

        return array_values(array_unique($tokens));
    }
}
