import { LEGAL_INFO } from '../constants/legal';

/**
 * Génère le code HTML de l'email de bienvenue.
 * Responsive, accessible et juridiquement conforme.
 */
export const getWelcomeEmailHtml = (userName: string = "Explorateur") => {
  return `
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

    /* Legal Box (Important - Fond Gris clair pour distinction) */
    .legal-box { background-color: #F8F8F8; border: 2px solid #000000; padding: 20px; margin: 30px 0; font-size: 13px; color: #555555; text-align: justify; line-height: 1.5; }
    .legal-icon { display: inline-block; margin-right: 5px; font-size: 16px; }

    /* CTA Button (High Contrast) */
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

      <p class="text-block">Bonjour <strong>${userName}</strong>,</p>

      <p class="text-block">
        Votre compte est désormais actif. Vous avez rejoint la communauté InkUp, la plateforme qui reconnecte auteurs et lecteurs.
      </p>

      <p class="text-block">
        Accédez dès maintenant à votre bibliothèque numérique haute définition et découvrez nos éditions collector physiques en direct des créateurs.
      </p>

      <div class="btn-container">
        <!-- CTA Contrasté (Texte blanc sur fond sombre) -->
        <a href="https://inkup.com/dashboard" class="btn">Explorer le catalogue</a>
      </div>

      <!-- Rappel Juridique (Essentiel L221-28) -->
      <div class="legal-box">
        <span class="legal-icon">⚖️</span>
        <strong>RAPPEL JURIDIQUE IMPORTANT :</strong><br/>
        En utilisant nos services, vous acceptez nos CGU/CGV.
        Pour les contenus numériques (InkPoints), vous reconnaissez que l'exécution du contrat commence immédiatement après l'achat et renoncez à votre droit de rétractation conformément à l'article L221-28 du Code de la consommation.
      </div>
    </div>

    <!-- Footer Légal Obligatoire -->
    <div class="footer">
      <div>
        <strong>Éditeur :</strong> ${LEGAL_INFO.entrepreneur}, Entrepreneur individuel.<br/>
        <strong>Siège social :</strong> ${LEGAL_INFO.address}.<br/>
        <strong>Identification :</strong> SIREN ${LEGAL_INFO.siren}.<br/>
        <em>${LEGAL_INFO.vat_mention}</em>
      </div>

      <div class="footer-links">
        <a href="https://inkup.com/legal/cgu">CGU/CGV</a>
        <a href="https://inkup.com/legal/privacy">Politique de Confidentialité</a>
        <a href="#">Se désinscrire</a>
      </div>

      <div style="margin-top: 20px; font-size: 10px; color: #999;">
        © ${new Date().getFullYear()} InkUp. Tous droits réservés.
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Génère la version Texte Brut de l'email (Version de repli / Anti-spam).
 */
export const getWelcomeEmailText = (userName: string = "Explorateur") => {
  return `
SUJET : Bienvenue dans l'aventure InkUp ! 🚀
--------------------------------------------------

Bonjour ${userName},

Votre compte est désormais actif. Vous avez rejoint la communauté InkUp, la plateforme qui reconnecte auteurs et lecteurs.

Accédez dès maintenant à votre bibliothèque numérique haute définition et découvrez nos éditions collector physiques en direct des créateurs.

EXPLORER LE CATALOGUE :
https://inkup.com/dashboard

--------------------------------------------------
RAPPEL JURIDIQUE IMPORTANT
--------------------------------------------------
En utilisant nos services, vous acceptez nos CGU/CGV.
Pour les contenus numériques (InkPoints), vous reconnaissez que l'exécution du contrat commence immédiatement après l'achat et renoncez à votre droit de rétractation conformément à l'article L221-28 du Code de la consommation.

--------------------------------------------------
MENTIONS LÉGALES
--------------------------------------------------
Éditeur : ${LEGAL_INFO.entrepreneur}, Entrepreneur individuel.
Siège social : ${LEGAL_INFO.address}.
Identification : SIREN ${LEGAL_INFO.siren}.
${LEGAL_INFO.vat_mention}

CGU/CGV : https://inkup.com/legal/cgu
Politique de Confidentialité : https://inkup.com/legal/privacy

© ${new Date().getFullYear()} InkUp. Tous droits réservés.
  `;
};
