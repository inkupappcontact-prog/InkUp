import 'dart:convert';
import 'dart:io';

import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;

/// Télécharge les pages d'un chapitre pour lecture hors-ligne.
/// Métadonnées : JSON dans [chapterDir]/meta.json.
class DownloadService {
  static Future<Directory> _chapterDir(String chapterId) async {
    final base = await getApplicationDocumentsDirectory();
    return Directory('${base.path}/inkup_chapters/$chapterId');
  }

  static Future<File> _metaFile(String chapterId) async {
    final dir = await _chapterDir(chapterId);
    return File('${dir.path}/meta.json');
  }

  /// Télécharge les pages et enregistre les chemins en local.
  static Future<void> saveChapterPages(
    String chapterId,
    List<String> pageUrls,
  ) async {
    final dir = await _chapterDir(chapterId);
    if (!await dir.exists()) await dir.create(recursive: true);
    final localPaths = <String>[];
    for (var i = 0; i < pageUrls.length; i++) {
      final path = await _downloadFile(pageUrls[i], dir.path, 'page_$i');
      if (path != null) localPaths.add(path);
    }
    final meta = await _metaFile(chapterId);
    await meta.writeAsString(
      jsonEncode({'paths': localPaths, 'count': localPaths.length}),
    );
  }

  static Future<String?> _downloadFile(
    String url,
    String dir,
    String name,
  ) async {
    try {
      final res = await http.get(Uri.parse(url));
      if (res.statusCode != 200) return null;
      final ext = url.contains('.png')
          ? '.png'
          : (url.contains('.jpg') || url.contains('.jpeg') ? '.jpg' : '.png');
      final file = File('$dir/$name$ext');
      await file.writeAsBytes(res.bodyBytes);
      return file.path;
    } catch (_) {
      return null;
    }
  }

  static Future<bool> isChapterDownloaded(String chapterId) async {
    final meta = await _metaFile(chapterId);
    if (!await meta.exists()) return false;
    try {
      final data =
          jsonDecode(await meta.readAsString()) as Map<String, dynamic>;
      return (data['count'] as num? ?? 0) > 0;
    } catch (_) {
      return false;
    }
  }

  static Future<List<String>> getLocalPagePaths(String chapterId) async {
    final meta = await _metaFile(chapterId);
    if (!await meta.exists()) return [];
    try {
      final data =
          jsonDecode(await meta.readAsString()) as Map<String, dynamic>;
      final paths = data['paths'];
      if (paths is! List) return [];
      return paths.map((e) => e.toString()).toList();
    } catch (_) {
      return [];
    }
  }

  static Future<void> removeDownload(String chapterId) async {
    final dir = await _chapterDir(chapterId);
    if (await dir.exists()) await dir.delete(recursive: true);
  }
}
