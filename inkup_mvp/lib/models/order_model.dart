import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';

class OrderModel {
  final String id;
  final String userId;
  final String? authorId;
  final String type;
  final double amount;
  final int? inkPointsSpent;
  final List<Map<String, dynamic>> items;
  final DateTime createdAt;
  final String? stripePaymentId;
  final String? status;

  const OrderModel({
    required this.id,
    required this.userId,
    this.authorId,
    required this.type,
    this.amount = 0,
    this.inkPointsSpent,
    this.items = const [],
    required this.createdAt,
    this.stripePaymentId,
    this.status,
  });

  factory OrderModel.fromMap(String id, Map<String, dynamic> map) {
    final items = map['items'];
    return OrderModel(
      id: id,
      userId: map['userId'] as String? ?? '',
      authorId: map['authorId'] as String?,
      type: map['type'] as String? ?? AppConstants.orderTypeDigital,
      amount: (map['amount'] as num?)?.toDouble() ?? 0,
      inkPointsSpent: (map['inkPointsSpent'] as num?)?.toInt(),
      items: items is List
          ? List<Map<String, dynamic>>.from(
              items.map((e) => Map<String, dynamic>.from(e as Map)),
            )
          : [],
      createdAt: _parseDate(map['createdAt']),
      stripePaymentId: map['stripePaymentId'] as String?,
      status: map['status'] as String?,
    );
  }

  static DateTime _parseDate(dynamic v) {
    if (v == null) return DateTime.now();
    if (v is Timestamp) return v.toDate();
    return DateTime.tryParse(v.toString()) ?? DateTime.now();
  }
}
