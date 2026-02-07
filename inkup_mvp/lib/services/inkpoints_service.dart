import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';

/// Gestion des InkPoints et achats numériques.
/// En production, le débit et la création Purchase/Order devraient être faits par une Cloud Function.
class InkPointsService {
  InkPointsService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  /// Achète un chapitre avec des InkPoints (débit + création Purchase + Order).
  /// En production : appeler une Cloud Function callable qui fait le débit côté serveur.
  Future<bool> purchaseChapter({
    required String userId,
    required String chapterId,
    required int priceInkPoints,
    required String chapterTitle,
  }) async {
    final userRef = _firestore.collection(AppConstants.colUsers).doc(userId);
    final purchaseRef = _firestore.collection(AppConstants.colPurchases).doc();
    final orderRef = _firestore.collection(AppConstants.colOrders).doc();

    return _firestore.runTransaction<bool>((tx) async {
      final userSnap = await tx.get(userRef);
      if (!userSnap.exists) return false;
      final current =
          (userSnap.data()!['inkPointsBalance'] as num?)?.toInt() ?? 0;
      if (current < priceInkPoints) return false;

      tx.update(userRef, {'inkPointsBalance': current - priceInkPoints});
      tx.set(purchaseRef, {
        'userId': userId,
        'chapterId': chapterId,
        'source': AppConstants.purchaseSourceInApp,
        'unlockedAt': FieldValue.serverTimestamp(),
      });
      tx.set(orderRef, {
        'userId': userId,
        'type': AppConstants.orderTypeDigital,
        'amount': 0,
        'inkPointsSpent': priceInkPoints,
        'items': [
          {
            'chapterId': chapterId,
            'title': chapterTitle,
            'priceInkPoints': priceInkPoints,
          },
        ],
        'createdAt': FieldValue.serverTimestamp(),
      });
      return true;
    });
  }
}
