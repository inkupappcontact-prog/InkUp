import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../models/series_model.dart';
import '../../services/chapter_service.dart';
import '../../services/discovery_service.dart';

/// Page d'accueil : séries avec boost Premium, recherche.
class DiscoveryScreen extends StatefulWidget {
  const DiscoveryScreen({super.key});

  @override
  State<DiscoveryScreen> createState() => _DiscoveryScreenState();
}

class _DiscoveryScreenState extends State<DiscoveryScreen> {
  final _searchController = TextEditingController();
  String _query = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('InkUp'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () => _showSearch(context),
          ),
        ],
      ),
      body: StreamBuilder<List<SeriesModel>>(
        stream: context.read<DiscoveryService>().watchSeriesForDiscovery(
          searchQuery: _query.isEmpty ? null : _query,
        ),
        builder: (context, snapshot) {
          if (!snapshot.hasData)
            return const Center(child: CircularProgressIndicator());
          final list = snapshot.data!;
          if (list.isEmpty) {
            return Center(
              child: Text(
                _query.isEmpty
                    ? 'Aucune série pour le moment.'
                    : 'Aucun résultat pour "$_query".',
                textAlign: TextAlign.center,
              ),
            );
          }
          return GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.7,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
            ),
            itemCount: list.length,
            itemBuilder: (context, index) {
              final s = list[index];
              return _SeriesCard(series: s);
            },
          );
        },
      ),
    );
  }

  void _showSearch(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Rechercher'),
        content: TextField(
          controller: _searchController,
          decoration: const InputDecoration(hintText: 'Titre ou description'),
          autofocus: true,
          onSubmitted: (v) {
            setState(() => _query = v);
            Navigator.pop(context);
          },
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() => _query = '');
              _searchController.clear();
              Navigator.pop(context);
            },
            child: const Text('Effacer'),
          ),
          FilledButton(
            onPressed: () {
              setState(() => _query = _searchController.text);
              Navigator.pop(context);
            },
            child: const Text('Rechercher'),
          ),
        ],
      ),
    );
  }
}

class _SeriesCard extends StatelessWidget {
  const _SeriesCard({required this.series});

  final SeriesModel series;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => _openSeries(context),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: series.coverUrl != null
                  ? CachedNetworkImage(
                      imageUrl: series.coverUrl!,
                      fit: BoxFit.cover,
                      placeholder: (context, url) =>
                          const Center(child: CircularProgressIndicator()),
                      errorWidget: (context, url, e) =>
                          const Icon(Icons.menu_book, size: 48),
                    )
                  : const Center(child: Icon(Icons.menu_book, size: 48)),
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    series.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleSmall,
                  ),
                  if (series.isPremiumBoosted)
                    Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: Text(
                        'Premium',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openSeries(BuildContext context) async {
    final chapters = await context.read<ChapterService>().getChaptersForSeries(
      series.id,
    );
    if (!context.mounted) return;
    if (chapters.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Aucun chapitre pour l\'instant')),
      );
      return;
    }
    context.push('/chapter/${chapters.first.id}');
  }
}
