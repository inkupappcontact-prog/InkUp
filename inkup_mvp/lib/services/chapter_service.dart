import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';
import '../models/chapter_model.dart';

class ChapterService {
  ChapterService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  Future<ChapterModel?> getChapter(String chapterId) async {
    final doc = await _firestore
        .collection(AppConstants.colChapters)
        .doc(chapterId)
        .get();
    if (!doc.exists) return null;
    return ChapterModel.fromMap(doc.id, doc.data()!);
  }

  Stream<ChapterModel?> watchChapter(String chapterId) {
    return _firestore
        .collection(AppConstants.colChapters)
        .doc(chapterId)
        .snapshots()
        .map(
          (doc) =>
              doc.exists ? ChapterModel.fromMap(doc.id, doc.data()!) : null,
        );
  }

  Future<List<ChapterModel>> getChaptersForSeries(String seriesId) async {
    final snap = await _firestore
        .collection(AppConstants.colChapters)
        .where('seriesId', isEqualTo: seriesId)
        .orderBy('order')
        .get();
    return snap.docs.map((d) => ChapterModel.fromMap(d.id, d.data())).toList();
  }
}
