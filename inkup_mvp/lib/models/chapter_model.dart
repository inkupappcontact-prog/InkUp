class ChapterModel {
  final String id;
  final String seriesId;
  final String title;
  final int order;
  final List<String> pageUrls;
  final bool isFree;
  final int priceInkPoints;
  final int freePreviewPageCount;
  final Map<String, dynamic>? watermarkData;

  const ChapterModel({
    required this.id,
    required this.seriesId,
    required this.title,
    this.order = 0,
    this.pageUrls = const [],
    this.isFree = false,
    this.priceInkPoints = 0,
    this.freePreviewPageCount = 0,
    this.watermarkData,
  });

  factory ChapterModel.fromMap(String id, Map<String, dynamic> map) {
    final pages = map['pageUrls'];
    return ChapterModel(
      id: id,
      seriesId: map['seriesId'] as String? ?? '',
      title: map['title'] as String? ?? '',
      order: (map['order'] as num?)?.toInt() ?? 0,
      pageUrls: pages is List ? pages.map((e) => e.toString()).toList() : [],
      isFree: map['isFree'] as bool? ?? false,
      priceInkPoints: (map['priceInkPoints'] as num?)?.toInt() ?? 0,
      freePreviewPageCount: (map['freePreviewPageCount'] as num?)?.toInt() ?? 0,
      watermarkData: map['watermarkData'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'seriesId': seriesId,
      'title': title,
      'order': order,
      'pageUrls': pageUrls,
      'isFree': isFree,
      'priceInkPoints': priceInkPoints,
      'freePreviewPageCount': freePreviewPageCount,
      'watermarkData': watermarkData,
    };
  }
}
