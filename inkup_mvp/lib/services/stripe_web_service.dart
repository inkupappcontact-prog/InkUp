/// Service pour les paiements Stripe côté web (dashboard).
/// En production : appeler des Cloud Functions qui créent les sessions Stripe
/// et mettent à jour Firestore (inkPointsBalance + bonus, isPremiumAuthor).
class StripeWebService {
  /// Retourne l'URL de checkout pour l'achat d'InkPoints (one-time).
  /// À implémenter : GET/POST vers Cloud Function qui crée une Stripe Checkout Session
  /// et retourne session.url; après paiement, webhook crédite User.inkPointsBalance (+10%).
  Future<String?> getInkPointsCheckoutUrl({
    required String userId,
    required int inkPointsAmount,
  }) async {
    // TODO: appeler Cloud Function avec userId, inkPointsAmount
    // return await http.post(cloudFunctionUrl, body: {...});
    return null;
  }

  /// Retourne l'URL de checkout pour l'abonnement Premium auteur (9,99€/mois).
  /// À implémenter : Cloud Function crée Stripe Subscription, retourne session.url;
  /// webhook met à jour User.isPremiumAuthor et premiumEndDate.
  Future<String?> getPremiumSubscriptionCheckoutUrl({
    required String userId,
  }) async {
    // TODO: appeler Cloud Function avec userId
    return null;
  }
}
