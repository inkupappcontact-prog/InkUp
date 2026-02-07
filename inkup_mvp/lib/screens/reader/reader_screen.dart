import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:provider/provider.dart';

import '../../models/chapter_model.dart';
import '../../models/user_model.dart';
import '../../services/auth_service.dart';
import '../../services/chapter_service.dart';
import '../../services/download_service.dart';
import '../../services/inkpoints_service.dart';
import '../../services/purchase_service.dart';
import '../../utils/snip_share.dart';

/// Écran de lecture : vertical (scroll) ou horizontal (page à page).
/// Aperçu gratuit limité à [freePreviewPageCount], puis CTA débloquer.
class ReaderScreen extends StatefulWidget {
  const ReaderScreen({super.key, required this.chapterId});

  final String chapterId;

  @override
  State<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends State<ReaderScreen> {
  bool _horizontal = true;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthService>();
    final userId = auth.currentUser?.uid ?? '';
    return FutureBuilder<bool>(
      future: context.read<PurchaseService>().isChapterUnlocked(
        userId,
        widget.chapterId,
      ),
      builder: (context, unlockSnap) {
        return StreamBuilder<ChapterModel?>(
          stream: context.read<ChapterService>().watchChapter(widget.chapterId),
          builder: (context, chapterSnap) {
            final chapter = chapterSnap.data;
            final unlocked = unlockSnap.data ?? false;
            if (chapter == null) {
              return const Scaffold(
                body: Center(child: CircularProgressIndicator()),
              );
            }
            return StreamBuilder<UserModel?>(
              stream: auth.userStream,
              builder: (context, userSnap) {
                final balance = userSnap.data?.inkPointsBalance ?? 0;
                return FutureBuilder<List<String>>(
                  future: DownloadService.getLocalPagePaths(widget.chapterId),
                  builder: (context, localSnap) {
                    final localPaths =
                        (localSnap.data != null && localSnap.data!.isNotEmpty)
                        ? localSnap.data
                        : null;
                    return _ReaderContent(
                      chapter: chapter,
                      unlocked: unlocked,
                      userId: userId,
                      balance: balance,
                      horizontal: _horizontal,
                      onToggleMode: () =>
                          setState(() => _horizontal = !_horizontal),
                      localPaths: localPaths,
                    );
                  },
                );
              },
            );
          },
        );
      },
    );
  }
}

class _ReaderContent extends StatefulWidget {
  const _ReaderContent({
    required this.chapter,
    required this.unlocked,
    required this.userId,
    required this.balance,
    required this.horizontal,
    required this.onToggleMode,
    this.localPaths,
  });

  final ChapterModel chapter;
  final bool unlocked;
  final String userId;
  final int balance;
  final bool horizontal;
  final VoidCallback onToggleMode;
  final List<String>? localPaths;

  @override
  State<_ReaderContent> createState() => _ReaderContentState();
}

class _ReaderContentState extends State<_ReaderContent> {
  final GlobalKey _repaintKey = GlobalKey();
  int _currentPageIndex = 0;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void didUpdateWidget(covariant _ReaderContent oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.horizontal != widget.horizontal && widget.horizontal) {
      _pageController.dispose();
      _pageController = PageController();
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  int get _visiblePageCount {
    if (widget.unlocked) return _allSources.length;
    final n = widget.chapter.freePreviewPageCount;
    if (n <= 0) return _allSources.length;
    return n > _allSources.length ? _allSources.length : n;
  }

  List<String> get _allSources => widget.localPaths?.isNotEmpty == true
      ? widget.localPaths!
      : widget.chapter.pageUrls;
  List<String> get _visibleSources =>
      _allSources.take(_visiblePageCount).toList();

  Future<void> _shareSnip() async {
    final boundary =
        _repaintKey.currentContext?.findRenderObject()
            as RenderRepaintBoundary?;
    if (boundary == null) return;
    try {
      await captureAndShare(boundary);
      if (mounted)
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Partage ouvert')));
    } catch (e) {
      if (mounted)
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erreur: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final sources = _visibleSources;
    final showUnlockCta =
        !widget.unlocked &&
        _allSources.isNotEmpty &&
        _visiblePageCount < _allSources.length;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.chapter.title),
        actions: [
          if (widget.horizontal && sources.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.share),
              onPressed: _shareSnip,
              tooltip: 'Partager (Snip)',
            ),
          IconButton(
            icon: Icon(
              widget.horizontal ? Icons.view_stream : Icons.view_carousel,
            ),
            onPressed: widget.onToggleMode,
            tooltip: widget.horizontal ? 'Mode vertical' : 'Mode horizontal',
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: sources.isEmpty
                ? const Center(child: Text('Aucune page'))
                : widget.horizontal
                ? PageView.builder(
                    controller: _pageController,
                    onPageChanged: (i) => setState(() => _currentPageIndex = i),
                    itemCount: sources.length,
                    itemBuilder: (context, index) {
                      final page = _PageImage(source: sources[index]);
                      if (index == _currentPageIndex) {
                        return RepaintBoundary(key: _repaintKey, child: page);
                      }
                      return page;
                    },
                  )
                : ListView.builder(
                    itemCount: sources.length,
                    itemBuilder: (context, index) =>
                        _PageImage(source: sources[index]),
                  ),
          ),
          if (showUnlockCta)
            _UnlockCta(chapter: widget.chapter, balance: widget.balance),
        ],
      ),
    );
  }
}

class _PageImage extends StatelessWidget {
  const _PageImage({required this.source});

  /// URL réseau ou chemin fichier local.
  final String source;

  @override
  Widget build(BuildContext context) {
    if (source.startsWith('http')) {
      return CachedNetworkImage(
        imageUrl: source,
        fit: BoxFit.contain,
        placeholder: (context, url) =>
            const Center(child: CircularProgressIndicator()),
        errorWidget: (context, url, e) => Center(child: Text('Erreur: $e')),
      );
    }
    return Image.file(
      File(source),
      fit: BoxFit.contain,
      errorBuilder: (context, error, stackTrace) =>
          Center(child: Text('Erreur: $error')),
    );
  }
}

class _UnlockCta extends StatefulWidget {
  const _UnlockCta({required this.chapter, required this.balance});

  final ChapterModel chapter;
  final int balance;

  @override
  State<_UnlockCta> createState() => _UnlockCtaState();
}

class _UnlockCtaState extends State<_UnlockCta> {
  bool _loading = false;

  Future<void> _unlock(BuildContext context) async {
    final price = widget.chapter.priceInkPoints;
    if (widget.balance < price) {
      showDialog<void>(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Solde insuffisant'),
          content: const Text(
            'Vous n\'avez pas assez d\'InkPoints. Gérez vos achats et rechargez vos InkPoints sur votre compte en ligne (bonus +10% sur le web).',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        ),
      );
      return;
    }
    setState(() => _loading = true);
    try {
      final ok = await context.read<InkPointsService>().purchaseChapter(
        userId: context.read<AuthService>().currentUser!.uid,
        chapterId: widget.chapter.id,
        priceInkPoints: price,
        chapterTitle: widget.chapter.title,
      );
      if (context.mounted) {
        if (ok) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(const SnackBar(content: Text('Chapitre débloqué')));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Erreur lors du déblocage')),
          );
        }
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final chapter = widget.chapter;
    return Container(
      padding: const EdgeInsets.all(16),
      color: Theme.of(context).colorScheme.surfaceContainerHighest,
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Aperçu gratuit terminé. Débloquez le chapitre avec des InkPoints ou rechargez sur votre compte en ligne.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 12),
            FilledButton(
              onPressed: _loading ? null : () => _unlock(context),
              child: _loading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Text('Débloquer (${chapter.priceInkPoints} InkPoints)'),
            ),
          ],
        ),
      ),
    );
  }
}
