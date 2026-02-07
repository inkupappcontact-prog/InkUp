import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/rendering.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

/// Capture un widget (via RepaintBoundary) et partage l'image (Snip).
Future<void> captureAndShare(RenderRepaintBoundary boundary) async {
  try {
    final image = await boundary.toImage(pixelRatio: 2.0);
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    if (byteData == null) return;
    final tempDir = await getTemporaryDirectory();
    final file = File(
      '${tempDir.path}/inkup_snip_${DateTime.now().millisecondsSinceEpoch}.png',
    );
    await file.writeAsBytes(byteData.buffer.asUint8List());
    await Share.shareXFiles([XFile(file.path)], text: 'InkUp — extrait');
  } catch (e) {
    rethrow;
  }
}
