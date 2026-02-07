import 'package:cloud_firestore/cloud_firestore.dart';

class SeriesModel {
  final String id;
  final String authorId;
  final String title;
  final String description;
  final String? coverUrl;
  final bool isPremiumBoosted;
  final DateTime createdAt;
  final String? genre;
  final bool watermarkEnabled;

  const SeriesModel({
    required this.id,
    required this.authorId,
    required this.title,
    this.description = '',
    this.coverUrl,
    this.isPremiumBoosted = false,
    required this.createdAt,
    this.genre,
    this.watermarkEnabled = false,
  });

  factory SeriesModel.fromMap(String id, Map<String, dynamic> map) {
    return SeriesModel(
      id: id,
      authorId: map['authorId'] as String? ?? '',
      title: map['title'] as String? ?? '',
      description: map['description'] as String? ?? '',
      coverUrl: map['coverUrl'] as String?,
      isPremiumBoosted: map['isPremiumBoosted'] as bool? ?? false,
      createdAt: _parseDate(map['createdAt']),
      genre: map['genre'] as String?,
      watermarkEnabled: map['watermarkEnabled'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'authorId': authorId,
      'title': title,
      'description': description,
      'coverUrl': coverUrl,
      'isPremiumBoosted': isPremiumBoosted,
      'createdAt': Timestamp.fromDate(createdAt),
      'genre': genre,
      'watermarkEnabled': watermarkEnabled,
    };
  }

  static DateTime _parseDate(dynamic v) {
    if (v == null) return DateTime.now();
    if (v is Timestamp) return v.toDate();
    return DateTime.tryParse(v.toString()) ?? DateTime.now();
  }
}
