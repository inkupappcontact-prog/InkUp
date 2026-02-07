import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';
import '../models/series_model.dart';

class DiscoveryService {
  DiscoveryService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  /// Séries pour la page d'accueil : Premium boostées en premier, puis par date.
  Stream<List<SeriesModel>> watchSeriesForDiscovery({String? searchQuery}) {
    Query<Map<String, dynamic>> query = _firestore.collection(
      AppConstants.colSeries,
    );
    // Firestore n'a pas de "contains" sur texte; on filtre côté client (voir plus bas).
    return query.snapshots().map((snap) {
      final list = snap.docs
          .map((d) => SeriesModel.fromMap(d.id, d.data()))
          .toList();
      list.sort((a, b) {
        if (a.isPremiumBoosted != b.isPremiumBoosted)
          return a.isPremiumBoosted ? -1 : 1;
        return b.createdAt.compareTo(a.createdAt);
      });
      if (searchQuery != null && searchQuery.trim().isNotEmpty) {
        final q = searchQuery.trim().toLowerCase();
        list.removeWhere(
          (s) =>
              !s.title.toLowerCase().contains(q) &&
              !(s.description.toLowerCase().contains(q)),
        );
      }
      return list;
    });
  }
}
