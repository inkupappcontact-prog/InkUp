/// Constantes métier InkUp (PRD v2).
/// Exécutez `flutterfire configure` puis régénérez ce fichier si besoin.
class AppConstants {
  AppConstants._();

  // Prix (€)
  static const double premiumAuthorPriceWeb = 9.99;
  static const double premiumAuthorPriceInApp = 11.99;

  // Commissions auteur (en %)
  static const double commissionFreeTier = 15.0;
  static const double commissionPremiumTier = 5.0;

  // Bonus web
  static const int inkPointsBonusPercentWeb = 10;

  // Rôles
  static const String roleReader = 'reader';
  static const String roleAuthor = 'author';

  // Types de commande
  static const String orderTypeDigital = 'digital';
  static const String orderTypePhysical = 'physical';
  static const String orderTypeTips = 'tips';
  static const String orderTypeInkpointsPurchase = 'inkpoints_purchase';
  static const String orderTypePremiumSubscription = 'premium_subscription';

  // Source achat
  static const String purchaseSourceInApp = 'in_app';
  static const String purchaseSourceWeb = 'web';

  // Types produit physique
  static const String productTypeAlbum = 'album';
  static const String productTypeGoodie = 'goodie';
  static const String productTypeDedicace = 'dedicace';

  // Collections Firestore
  static const String colUsers = 'users';
  static const String colSeries = 'series';
  static const String colChapters = 'chapters';
  static const String colProducts = 'products';
  static const String colOrders = 'orders';
  static const String colPurchases = 'purchases';
  static const String colTips = 'tips';
}
