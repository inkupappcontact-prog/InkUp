/// Chemins Firebase Storage (PRD §2).
/// Structure : covers/{seriesId}, chapters/{chapterId}/pages/, products/{productId}
class StoragePaths {
  StoragePaths._();

  static String coverPath(String seriesId) => 'covers/$seriesId';
  static String chapterPagePath(String chapterId, int index) =>
      'chapters/$chapterId/pages/$index';
  static String productImagePath(String productId) => 'products/$productId';
}
