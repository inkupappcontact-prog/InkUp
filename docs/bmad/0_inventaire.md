# 0. Inventaire du Projet InkUp

## Vue d'ensemble du projet
InkUp est une application mobile et web dédiée à la lecture de bandes dessinées (BD) créées par des auteurs indépendants. L'app permet aux utilisateurs de découvrir, lire et acheter des BD de manière intuitive, tout en offrant aux auteurs une plateforme pour monétiser leur travail via des abonnements ou des ventes à l'unité.

## Documents analysés
- **Cahier des charges** : Définit les fonctionnalités principales, le public cible et les objectifs business.
- **PRD (Product Requirements Document)** : Spécifications techniques détaillées, architecture, intégrations (Firebase, Stripe), monetization via InkPoints.
- **Charte graphique** : Palette de couleurs (noir primaire, bleu secondaire, blanc, accents vert/rouge), police Roboto, styles de boutons et icônes.
- **Fonctionnalités futures** : Liste de tâches à implémenter (profils avancés, likes/commentaires, messagerie, flux d'actualités, groupes communautaires) toutes de priorité basse.
- **Clé Firebase** : Configuration Firebase pour authentification, Firestore et Storage.
- **Publication LinkedIn** : Post promotionnel pour services de test QA en freelance.
- **Plan d'action et business plan** : PDFs non analysés en détail (plan d'action V1, prototype, étude de marché V1).

## Fonctionnalités clés
- **Pour les lecteurs** : Lecture intuitive de BD, profils utilisateurs avancés, système de commentaires/likes, messagerie privée, flux d'actualités personnalisé, groupes thématiques.
- **Pour les auteurs** : Choix de monétisation (abonnement/série ou vente à l'unité), statistiques basiques (gratuit) ou avancées (premium), dashboard auteur.
- **Monétisation** : Utilisation d'InkPoints débités pour achats, recharge via Stripe avec bonus 10%, abonnement premium auteur à 9.99€/mois.
- **Technique** : Firebase (Auth, Firestore, Storage), anti-capture sur Android, watermarking optionnel, stockage local pour téléchargements.

## Public cible
- Lecteurs de bandes dessinées (principalement adultes ?)
- Auteurs indépendants de BD

## État actuel
- Configuration Firebase prête
- Documents de spécifications complets
- Charte graphique définie
- MVP à implémenter avec fonctionnalités de base
- Fonctionnalités avancées listées mais non prioritaires

## Points à noter
- L'app cible les auteurs indépendants pour démocratiser la publication de BD
- Focus sur l'expérience utilisateur pour la lecture
- Intégration de paiements sécurisés via Stripe
- Possibilité de vente physique (albums, goodies) via boutique en ligne
