import 'package:cloud_firestore/cloud_firestore.dart';

class TipModel {
  final String id;
  final String fromUserId;
  final String toAuthorId;
  final double amount;
  final String? message;
  final DateTime createdAt;

  const TipModel({
    required this.id,
    required this.fromUserId,
    required this.toAuthorId,
    required this.amount,
    this.message,
    required this.createdAt,
  });

  factory TipModel.fromMap(String id, Map<String, dynamic> map) {
    return TipModel(
      id: id,
      fromUserId: map['fromUserId'] as String? ?? '',
      toAuthorId: map['toAuthorId'] as String? ?? '',
      amount: (map['amount'] as num?)?.toDouble() ?? 0,
      message: map['message'] as String?,
      createdAt: _parseDate(map['createdAt']),
    );
  }

  static DateTime _parseDate(dynamic v) {
    if (v == null) return DateTime.now();
    if (v is Timestamp) return v.toDate();
    return DateTime.tryParse(v.toString()) ?? DateTime.now();
  }
}
