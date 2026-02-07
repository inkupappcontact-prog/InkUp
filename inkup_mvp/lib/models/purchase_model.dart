import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';

class PurchaseModel {
  final String id;
  final String userId;
  final String? chapterId;
  final String? seriesId;
  final String source;
  final DateTime unlockedAt;

  const PurchaseModel({
    required this.id,
    required this.userId,
    this.chapterId,
    this.seriesId,
    this.source = AppConstants.purchaseSourceInApp,
    required this.unlockedAt,
  });

  factory PurchaseModel.fromMap(String id, Map<String, dynamic> map) {
    return PurchaseModel(
      id: id,
      userId: map['userId'] as String? ?? '',
      chapterId: map['chapterId'] as String?,
      seriesId: map['seriesId'] as String?,
      source: map['source'] as String? ?? AppConstants.purchaseSourceInApp,
      unlockedAt: _parseDate(map['unlockedAt']),
    );
  }

  static DateTime _parseDate(dynamic v) {
    if (v == null) return DateTime.now();
    if (v is Timestamp) return v.toDate();
    return DateTime.tryParse(v.toString()) ?? DateTime.now();
  }
}
