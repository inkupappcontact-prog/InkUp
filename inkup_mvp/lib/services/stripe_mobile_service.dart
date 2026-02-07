/// Service pour paiements Stripe côté mobile (boutique physique et tips).
/// En production : appeler des Cloud Functions qui créent les sessions / PaymentIntents
/// et renvoient clientSecret ou URL pour flutter_stripe.
class StripeMobileService {
  /// Crée une session de paiement pour une commande physique (panier).
  /// Cloud Function : reçoit items[], userId, crée Stripe Checkout Session ou PaymentIntent.
  Future<String?> createPhysicalOrderCheckout({
    required String userId,
    required List<Map<String, dynamic>> items,
  }) async {
    // TODO: POST vers Cloud Function
    return null;
  }

  /// Crée un paiement pour un tip (one-time).
  /// Cloud Function : reçoit fromUserId, toAuthorId, amount, message.
  Future<String?> createTipPayment({
    required String fromUserId,
    required String toAuthorId,
    required double amountEur,
    String? message,
  }) async {
    // TODO: POST vers Cloud Function
    return null;
  }
}
