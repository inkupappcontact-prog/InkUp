export const LEGAL_INFO = {
  // Identité Entrepreneur (Certifiée INPI)
  entrepreneur: "Blouin Flavian",
  trade_name: "InkUp",
  
  // Statut Juridique
  status: "Entrepreneur individuel (Micro-entreprise)",
  
  // Identifiants Administratifs
  siret: "993 076 116 00017",
  siren: "993 076 116",
  ape_code: "6201Z", // Programmation informatique
  
  // Siège Social
  address: "1 RUE du Bois Joly, 49120 Chemillé-en-Anjou, FRANCE",
  
  // Fiscalité (Obligatoire pour AE)
  vat_mention: "TVA non applicable, art. 293 B du CGI",
  
  // Contact
  contact_email: "contact@inkup.com",
  
  // Hébergeur (Obligation LCEN)
  host_name: "Vercel Inc.",
  host_address: "340 S Lemon Ave #4133 Walnut, CA 91789, USA",
};

// Helper pour compatibilité
export const getFullAddress = () => LEGAL_INFO.address;
