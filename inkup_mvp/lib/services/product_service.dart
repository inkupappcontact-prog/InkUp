import 'package:cloud_firestore/cloud_firestore.dart';

import '../core/constants.dart';
import '../models/product_model.dart';

class ProductService {
  ProductService({FirebaseFirestore? firestore})
    : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  Future<List<ProductModel>> getProductsByAuthor(String authorId) async {
    final snap = await _firestore
        .collection(AppConstants.colProducts)
        .where('authorId', isEqualTo: authorId)
        .get();
    return snap.docs.map((d) => ProductModel.fromMap(d.id, d.data())).toList();
  }

  Stream<List<ProductModel>> watchProductsByAuthor(String authorId) {
    return _firestore
        .collection(AppConstants.colProducts)
        .where('authorId', isEqualTo: authorId)
        .snapshots()
        .map(
          (snap) => snap.docs
              .map((d) => ProductModel.fromMap(d.id, d.data()))
              .toList(),
        );
  }
}
