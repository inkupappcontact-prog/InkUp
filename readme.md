# 🖋️ InkUp - Plateforme de BD Indépendantes

[cite_start]**InkUp** est une application web et mobile conçue pour la lecture et la monétisation de bandes dessinées indépendantes[cite: 4, 13]. [cite_start]L'objectif est d'offrir une expérience de lecture fluide tout en garantissant une rémunération sécurisée pour les auteurs via un système de "InkPoints"[cite: 4, 8, 32].

---

## 🚀 Vision du Projet

Le projet repose sur trois piliers majeurs :
* [cite_start]**Performance :** Utilisation d'un CDN pour un chargement instantané des planches, même avec une connexion limitée[cite: 6].
* [cite_start]**Sécurité :** Protection stricte des données et des transactions via PostgreSQL et des fonctions serveur[cite: 7, 8].
* [cite_start]**Communauté :** Création d'un lien direct entre auteurs et lecteurs avec des interactions en temps réel[cite: 9, 36].

## 🛠️ Stack Technique

* [cite_start]**Frontend :** Next.js (Web) & Flutter (Mobile)[cite: 13, 15].
* [cite_start]**Backend as a Service :** [Supabase](https://supabase.com/) (Auth, PostgreSQL, Edge Functions)[cite: 16].
* [cite_start]**Gestion Media :** [Cloudinary](https://cloudinary.com/) (Optimisation automatique WebP/AVIF)[cite: 12, 17].
* [cite_start]**Paiements :** [Stripe](https://stripe.com/) (Checkout sécurisé et Webhooks)[cite: 18].

## 📋 Fonctionnalités du MVP

### 📖 Lecture & Expérience Utilisateur
* [cite_start]**Lecteur optimisé :** Service d'images adaptatif selon l'appareil (via Cloudinary)[cite: 23, 25].
* [cite_start]**Accès sécurisé :** URLs signées pour les chapitres achetés afin d'éviter le partage illégal[cite: 26].
* [cite_start]**Interactions :** Système de likes et commentaires en temps réel[cite: 36].

### 💰 Monétisation & Auteurs
* [cite_start]**Système d'InkPoints :** Achat de crédits via Stripe avec validation sécurisée par Edge Function[cite: 11, 31, 33].
* [cite_start]**Dashboard Auteur :** Interface d'upload direct vers Cloudinary et suivi des statistiques de vente[cite: 27, 28, 29, 30].
* [cite_start]**Sécurité RLS :** Protection des données au niveau de la base de données (Row Level Security)[cite: 7, 66].

## 📂 Structure de la Base de Données (Aperçu)

Le projet utilise un schéma relationnel PostgreSQL robuste géré par Supabase :
* [cite_start]`profiles` : Gestion des rôles (Lecteur/Auteur) et des soldes sécurisés[cite: 42, 46].
* [cite_start]`works` : Catalogue des œuvres liées aux dossiers Cloudinary[cite: 49, 53].
* [cite_start]`transactions` : Historique immuable des achats pour audit[cite: 58, 64].

## 🛠️ Installation

1. Cloner le dépôt :
   ```bash
   git clone [https://github.com/inkupappcontact-prog/InkUp.git](https://github.com/inkupappcontact-prog/InkUp.git)