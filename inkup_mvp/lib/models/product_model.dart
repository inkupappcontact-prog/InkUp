import '../core/constants.dart';

class ProductModel {
  final String id;
  final String authorId;
  final String type;
  final String title;
  final double price;
  final String currency;
  final String? stripePriceId;
  final String? imageUrl;
  final String? description;

  const ProductModel({
    required this.id,
    required this.authorId,
    this.type = AppConstants.productTypeAlbum,
    required this.title,
    required this.price,
    this.currency = 'eur',
    this.stripePriceId,
    this.imageUrl,
    this.description,
  });

  factory ProductModel.fromMap(String id, Map<String, dynamic> map) {
    return ProductModel(
      id: id,
      authorId: map['authorId'] as String? ?? '',
      type: map['type'] as String? ?? AppConstants.productTypeAlbum,
      title: map['title'] as String? ?? '',
      price: (map['price'] as num?)?.toDouble() ?? 0,
      currency: map['currency'] as String? ?? 'eur',
      stripePriceId: map['stripePriceId'] as String?,
      imageUrl: map['imageUrl'] as String?,
      description: map['description'] as String?,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'authorId': authorId,
      'type': type,
      'title': title,
      'price': price,
      'currency': currency,
      'stripePriceId': stripePriceId,
      'imageUrl': imageUrl,
      'description': description,
    };
  }
}
