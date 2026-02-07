1. PRD - Product Requirements Document (Version 2.0)
Généré par : Product Manager Cascade

Statut : Optimisé (Supabase & Cloudinary)

Ce PRD définit les exigences pour le MVP d'InkUp. L'objectif est de créer une plateforme intuitive pour la lecture et la monétisation de BD indépendantes, avec une infrastructure haute performance.

Goals & Background
Performance : Utilisation du CDN Cloudinary pour un chargement instantané des planches, même en conditions réseau difficiles (4G/débit limité).

Intégrité & Relations : Migration vers Supabase (PostgreSQL) pour une gestion robuste des relations auteurs/œuvres et une sécurité granulaire via RLS (Row Level Security).

Sécurité Financière : Validation stricte des transactions via Edge Functions côté serveur pour empêcher toute manipulation frauduleuse des soldes d'InkPoints.

Communauté : Engager les lecteurs via des interactions sociales natives.

Requirements & Optimisations
Monétisation : Crédit automatique des InkPoints uniquement après validation du webhook Stripe par une Edge Function sécurisée.

Optimisation Media : Conversion automatique des planches vers les formats WebP/AVIF via Cloudinary (gain de ~60% de bande passante).

UX multi-plateforme : Flutter pour le mobile et Next.js pour le web.

Technical Assumptions (Stack Mise à jour)
Frontend : Flutter (Mobile) / Next.js (Web).

Backend : Supabase (Auth, Database, Edge Functions).

Stockage & CDN : Cloudinary (Programmable Media API).

Paiements : Stripe (Checkout + Webhooks).

Epic List & User Stories (Ajustées)
Epic 1: Authentification (Supabase Auth)
User Story 1.1: En tant qu'utilisateur, je veux m'inscrire via Google ou Email afin de créer un profil automatiquement lié à mon compte Supabase Auth.

User Story 1.2: En tant qu'auteur, mon rôle est stocké dans la table profiles protégée par RLS pour accéder au dashboard.

Epic 2: Lecteur de Bandes Dessinées (Cloudinary Powered)
User Story 2.1: En tant qu'utilisateur, je veux une lecture fluide.

Critère technique : Les images sont servies via Cloudinary avec les paramètres f_auto,q_auto pour optimiser la qualité selon l'appareil. User Story 2.2: Les chapitres achetés sont accessibles via des URLs signées pour éviter le partage de liens directs.

Epic 3: Dashboard Auteur
User Story 3.1: En tant qu'auteur, je veux uploader mes planches.

Workflow : L'upload va directement de l'app vers Cloudinary via un signed upload preset, puis l'ID est enregistré dans Supabase. User Story 3.2: Statistiques de vente basées sur les requêtes SQL SQL de Supabase, garantissant une précision comptable.

Epic 4: Système de Paiement (Sécurité Edge Function)
User Story 4.1: En tant qu'utilisateur, je veux acheter des InkPoints.

Sécurité : Le solde (balance) dans Supabase est verrouillé. Seule la Edge Function peut l'incrémenter après avoir validé la signature du webhook Stripe. User Story 4.2: Historique des transactions stocké dans la table transactions pour audit et support client.

Epic 5 & 6: Communauté & Découverte
User Story 5.1: Commentaires et likes gérés en temps réel via les Postgres Changes de Supabase. User Story 6.1: Flux personnalisé utilisant des fonctions PostgreSQL pour recommander des œuvres selon les genres préférés.

2. Architecture & Data Models (SQL Supabase)
Schéma de base
SQL
-- Profils utilisateurs avec solde sécurisé
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  balance int default 0 check (balance >= 0),
  role text check (role in ('reader', 'author'))
);

-- Gestion des œuvres avec Cloudinary
create table works (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id),
  title text not null,
  cloudinary_folder_id text, -- Référence au dossier Cloudinary
  price_points int default 0,
  created_at timestamptz default now()
);

-- Transactions vérifiées
create table transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  stripe_session_id text unique,
  amount_points int,
  status text default 'pending',
  created_at timestamptz default now()
);
Stratégie RLS (Sécurité)
Lecture : Les utilisateurs peuvent lire les works publiques.

Écriture : Les utilisateurs ne peuvent PAS modifier leur propre balance. Seul le rôle service_role (utilisé par la Edge Function) possède ce droit.

3. Stratégie de Maintenance & Coûts
Coût de Sortie : Réduit au minimum grâce à la compression agressive de Cloudinary.

Maintenance SQL : Utilisation de migrations standards pour faire évoluer la base de données sans risque de corruption.

Scalabilité : Supabase Edge Functions s'auto-adaptent à la charge lors des pics de ventes ou de sorties de chapitres populaires.