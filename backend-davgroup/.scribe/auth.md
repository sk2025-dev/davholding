# Authentification

Cette API utilise **Laravel Sanctum** (Bearer Token).

Pour accéder aux endpoints protégés :

1. Connectez-vous via `POST /api/login` ou `POST /api/register`
2. Récupérez le `token` dans la réponse
3. Incluez-le dans toutes vos requêtes :

```
Authorization: Bearer {token}
```

Les endpoints publics (produits, catégories, créneaux RDV, promos) ne nécessitent pas de token.
