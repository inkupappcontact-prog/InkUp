import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';
import '../models/purchase_model.dart';

class PurchaseService {
  PurchaseService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  /// Vérifie si l'utilisateur a débloqué ce chapitre.
  Future<bool> isChapterUnlocked(String userId, String chapterId) async {
    final snap = await _firestore
        .collection(AppConstants.colPurchases)
        .where('userId', isEqualTo: userId)
        .where('chapterId', isEqualTo: chapterId)
        .limit(1)
        .get();
    return snap.docs.isNotEmpty;
  }

  /// Stream des déblocages pour un utilisateur (pour mise à jour en temps réel).
  Stream<List<PurchaseModel>> watchPurchases(String userId) {
    return _firestore
        .collection(AppConstants.colPurchases)
        .where('userId', isEqualTo: userId)
        .snapshots()
        .map(
          (snap) => snap.docs
              .map((d) => PurchaseModel.fromMap(d.id, d.data()))
              .toList(),
        );
  }

  /// Liste des chapterIds débloqués par l'utilisateur (pour cache local).
  Future<Set<String>> getUnlockedChapterIds(String userId) async {
    final snap = await _firestore
        .collection(AppConstants.colPurchases)
        .where('userId', isEqualTo: userId)
        .where('chapterId', isNotEqualTo: null)
        .get();
    return snap.docs
        .map((d) => d.data()['chapterId'] as String?)
        .whereType<String>()
        .toSet();
  }
}
