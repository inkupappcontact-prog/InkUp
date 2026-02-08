

Procédure : Liaison OVH ↔️ Vercel
C'est ce qu'on appelle la configuration des DNS. Voici les 3 étapes que Cascade (ton IA) pourra t'aider à valider le moment venu :

Sur Vercel :

Va dans les Settings de ton projet > Domains.

Ajoute ton nom de domaine (ex: inkup.fr).

Vercel va te dire : "En attente de configuration" et te donner deux valeurs (un Enregistrement A et un CNAME).

Sur OVH :

Va dans ton espace client > Noms de domaine > Zone DNS.

Modifier l'enregistrement A : Remplace l'adresse IP par celle fournie par Vercel.

Ajouter le CNAME : Pour le sous-domaine www, pointe vers cname.vercel-dns.com.

Validation :

Vercel détecte automatiquement le changement (cela peut prendre de 10 min à quelques heures).

Un certificat SSL (HTTPS) sera généré gratuitement et automatiquement par Vercel.