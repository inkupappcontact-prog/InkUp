# PRD - InkUp (Plateforme BD Digitale)

## Objectif
Permettre aux auteurs de publier des BD et aux lecteurs de les acheter via un système de points (InkPoints).

## Core Stack 2026
- **Frontend :** Next.js & React Native (Expo).
- **Backend :** Supabase (DB, Auth, Edge Functions).
- **Paiements :** Stripe (via Edge Functions).
- **Hébergement :** Vercel (Web) + OVH (Domaine).

## Flux de données (Workflows)
1. **Lecture :** Vérification de l'achat via RLS SQL -> Stream des images depuis Supabase Storage.
2. **Achat :** Session Stripe -> Webhook -> Edge Function -> Crédit InkPoints en DB.

## Modèle de Données (Priorité)
- `profiles` : id (uuid), role (reader/author), balance (int).
- `works` : id, author_id, title, pages_urls (text[]).
- `purchases` : id, user_id, work_id, amount.