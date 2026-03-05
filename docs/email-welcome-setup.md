# Configuration Email de Bienvenue InkUp

## 🎯 Objectif
Automatiser l'envoi d'un email de bienvenue personnalisé et juridiquement conforme dès l'inscription d'un utilisateur.

## 📋 Configuration Supabase

### 1. Templates Email
Dans le dashboard Supabase > Authentication > Email Templates :

#### **Confirm Signup Template**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue dans l'aventure InkUp ! 🚀</title>
  <style>
    /* Reset & Base */
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F5F5F5; color: #1A1A1A; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; width: 100%; }
    a { color: #2563EB; text-decoration: underline; }
    
    /* Container BD Style */
    .container { max-width: 600px; margin: 40px auto; background-color: #FFFFFF; border: 4px solid #000000; box-shadow: 10px 10px 0px 0px #000000; }
    
    /* Header */
    .header { background-color: #2563EB; padding: 30px 20px; text-align: center; border-bottom: 4px solid #000000; }
    .logo-text { color: #FFFFFF; font-family: 'Arial Black', sans-serif; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; text-shadow: 3px 3px 0px #000000; }

    /* Content */
    .content { padding: 40px 30px; }
    .title { font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 25px; text-transform: uppercase; color: #000000; line-height: 1.2; }
    .text-block { font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px; }
    
    /* Legal Box */
    .legal-box { background-color: #F8F8F8; border: 2px solid #000000; padding: 20px; margin: 30px 0; font-size: 13px; color: #555555; text-align: justify; line-height: 1.5; }
    .legal-icon { display: inline-block; margin-right: 5px; font-size: 16px; }

    /* CTA Button */
    .btn-container { text-align: center; margin: 35px 0; }
    .btn { display: inline-block; background-color: #000000; color: #FFFFFF !important; text-decoration: none !important; padding: 18px 40px; font-weight: bold; text-transform: uppercase; border: 2px solid #000000; transition: all 0.2s; font-size: 16px; letter-spacing: 1px; }
    .btn:hover { background-color: #2563EB; box-shadow: 6px 6px 0px 0px #000000; transform: translate(-2px, -2px); }

    /* Footer */
    .footer { background-color: #FFFFFF; padding: 30px 20px; text-align: center; border-top: 4px solid #000000; font-size: 11px; color: #666666; line-height: 1.6; }
    .footer strong { color: #000000; }
    .footer-links { margin-top: 15px; padding-top: 15px; border-top: 1px dashed #CCCCCC; }
    .footer-links a { color: #666666; text-decoration: underline; margin: 0 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">InkUp</div>
    </div>
    
    <div class="content">
      <div class="title">Bienvenue dans l'aventure ! 🚀</div>
      
      <p class="text-block">Bonjour <strong>{{ .Data.full_name }}</strong>,</p>
      
      <p class="text-block">
        Votre compte est désormais actif. Vous avez rejoint la communauté InkUp, la plateforme qui reconnecte auteurs et lecteurs.
      </p>
      
      <p class="text-block">
        Accédez dès maintenant à votre bibliothèque numérique haute définition et découvrez nos éditions collector physiques en direct des créateurs.
      </p>

      <div class="btn-container">
        <a href="{{ .SiteURL }}/dashboard" class="btn">Explorer le catalogue</a>
      </div>

      <div class="legal-box">
        <span class="legal-icon">⚖️</span>
        <strong>RAPPEL JURIDIQUE IMPORTANT :</strong><br/>
        En utilisant nos services, vous acceptez nos CGU/CGV. 
        Pour les contenus numériques (InkPoints), vous reconnaissez que l'exécution du contrat commence immédiatement après l'achat et renoncez à votre droit de rétractation conformément à l'article L221-28 du Code de la consommation.
      </div>
    </div>

    <div class="footer">
      <div>
        <strong>Éditeur :</strong> Florian Blouin, Entrepreneur individuel.<br/>
        <strong>Siège social :</strong> 1 RUE du Bois Joly, 37210 Rochecorbon.<br/>
        <strong>Identification :</strong> SIREN 99307611600017.<br/>
        <em>Non assujetti à la TVA, article 293 B du CGI</em>
      </div>
      
      <div class="footer-links">
        <a href="{{ .SiteURL }}/legal/cgu">CGU/CGV</a>
        <a href="{{ .SiteURL }}/legal/privacy">Politique de Confidentialité</a>
        <a href="#">Se désinscrire</a>
      </div>
      
      <div style="margin-top: 20px; font-size: 10px; color: #999;">
        © {{ .Year }} InkUp. Tous droits réservés.
      </div>
    </div>
  </div>
</body>
</html>
```

### 2. Variables Supabase à utiliser
- `{{ .Data.full_name }}` - Nom de l'utilisateur
- `{{ .Data.role }}` - Rôle (reader/author)
- `{{ .Data.artist_name }}` - Nom d'artiste si auteur
- `{{ .SiteURL }}` - URL de votre site
- `{{ .Year }}` - Année actuelle

### 3. Configuration SMTP
Dans Supabase > Authentication > SMTP Settings :

```
Fournisseur: Resend (recommandé) ou SendGrid
Email expéditeur: contact@inkup.com
Nom expéditeur: InkUp - La plateforme BD
Reply-to: support@inkup.com
```

## 🔧 Déploiement

### 1. Appliquer les migrations
```bash
supabase db push
```

### 2. Déployer les Edge Functions
```bash
supabase functions deploy send-welcome-email
```

### 3. Variables d'environnement
Ajouter dans `.env` :
```
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

## ✅ Tests

1. **Créer un compte test** sur votre application
2. **Vérifier la réception** de l'email de bienvenue
3. **Contrôler les variables** : nom, rôle, mentions légales
4. **Tester le design** sur mobile et desktop

## 🛡️ Sécurité

- **Domaine vérifié** pour l'email expéditeur
- **SPF/DKIM** configurés pour éviter le spam
- **Rate limiting** activé sur les envois
- **Logs** surveillés pour les abus

## 📊 Monitoring

Surveiller dans Supabase > Edge Functions > Logs :
- Taux d'envoi réussi
- Erreurs éventuelles
- Performance des templates
