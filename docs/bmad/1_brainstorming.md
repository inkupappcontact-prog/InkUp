# 1. Brainstorming - Résultats de la Session

**Généré par :** Business Analyst Cascade

Cette session de brainstorming utilise des techniques structurées pour explorer le projet InkUp : une plateforme de lecture et monétisation de bandes dessinées indépendantes.

## Role Playing
Exploration des besoins via 3 personas fictifs pour comprendre les perspectives différentes.

### Dev Junior
En tant que dev junior, je vois InkUp comme un projet cool pour apprendre Firebase et Stripe. Les fonctionnalités de base comme l'auth et le stockage d'images sont straightforward, mais gérer les InkPoints et les abonnements pourrait être tricky. Je recommande de commencer par un MVP simple avec lecture offline et achats basiques, pour éviter de se perdre dans les détails techniques.

### Dev Senior
Du point de vue senior, InkUp doit être scalable dès le départ. Firestore rules pour sécuriser les achats, Cloud Functions pour les webhooks Stripe, et une architecture qui supporte la croissance des auteurs. Anti-capture et watermarking sont essentiels pour protéger le contenu. Recommandation : prioriser la sécurité et la performance, utiliser des patterns comme serverless pour éviter les coûts élevés.

### Moldu Curieux
Moi, l'utilisateur lambda, je veux juste lire des BD cool sans pub. InkUp me permet de découvrir des auteurs indépendants, payer ce que je veux lire, et discuter avec d'autres fans. Les groupes communautaires et le flux perso sont top, mais faut que ce soit facile à utiliser sur mobile. Si c'est payant, ok si c'est juste pour les BD que j'aime, pas pour tout.

## Five Whys
Creuser en profondeur les vraies motivations du projet.

Pourquoi créer InkUp ?
- Pour offrir une plateforme aux auteurs indépendants de BD.

Pourquoi les auteurs ont besoin de ça ?
- Parce que les plateformes traditionnelles prennent trop de commissions et limitent la créativité.

Pourquoi les commissions sont un problème ?
- Elles réduisent les revenus des auteurs, qui ne peuvent pas vivre de leur art.

Pourquoi vouloir vivre de son art ?
- Pour permettre aux artistes de se concentrer sur la création plutôt que sur des jobs alimentaires.

Pourquoi c'est important ?
- Pour diversifier l'offre culturelle et soutenir l'art indépendant dans un marché dominé par les majors.

## Analogical Thinking
Trouver des analogies pour clarifier le concept d'InkUp.

- **InkUp comme Netflix pour BD** : Abonnement mensuel pour accès illimité à une bibliothèque, mais avec possibilité d'achat à l'unité et communauté autour des séries.
- **InkUp comme Patreon pour artistes visuels** : Les fans soutiennent les auteurs via achats ou abos, mais avec un produit fini (BD) plutôt que du contenu en cours.
- **InkUp comme App Store pour apps créatives** : Auteurs "publient" leurs BD, utilisateurs "téléchargent" et "reviewent", avec monétisation directe.

## Insights Découverts
- Le cœur du projet est la démocratisation de la BD indépendante, en donnant pouvoir aux auteurs et choix aux lecteurs.
- La monétisation hybride (abonnement + achat) permet de satisfaire différents modèles économiques.
- La communauté est clé pour fidéliser utilisateurs et promouvoir les auteurs.
- Technique : Firebase est bien choisi pour rapidité de développement, mais scalabilité à surveiller.

## Premières Recommandations
- MVP : Auth, lecture verticale/horizontale, achat avec InkPoints, dashboard auteur basique.
- UX : Focus sur lecture fluide, comme une vraie BD physique.
- Business : Étudier les concurrents (Webtoon, Tapas) pour différenciation.
- Prochaines étapes : Définir le PRD détaillé basé sur ces insights.
