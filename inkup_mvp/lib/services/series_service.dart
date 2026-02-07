import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';
import '../models/series_model.dart';

class SeriesService {
  SeriesService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  Future<List<SeriesModel>> getSeriesByAuthor(String authorId) async {
    final snap = await _firestore
        .collection(AppConstants.colSeries)
        .where('authorId', isEqualTo: authorId)
        .orderBy('createdAt', descending: true)
        .get();
    return snap.docs.map((d) => SeriesModel.fromMap(d.id, d.data())).toList();
  }

  Future<String> createSeries(SeriesModel series) async {
    final ref = await _firestore
        .collection(AppConstants.colSeries)
        .add(series.toMap());
    return ref.id;
  }

  Future<void> updateSeries(String id, Map<String, dynamic> data) async {
    await _firestore.collection(AppConstants.colSeries).doc(id).update(data);
  }

  Future<void> deleteSeries(String id) async {
    await _firestore.collection(AppConstants.colSeries).doc(id).delete();
  }
}
