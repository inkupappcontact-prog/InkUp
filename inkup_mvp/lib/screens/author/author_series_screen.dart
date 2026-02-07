import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../models/series_model.dart';
import '../../services/auth_service.dart';
import '../../services/series_service.dart';

/// Liste des séries de l'auteur + bouton ajouter.
class AuthorSeriesScreen extends StatelessWidget {
  const AuthorSeriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final uid = context.watch<AuthService>().currentUser?.uid;
    if (uid == null)
      return const Scaffold(body: Center(child: Text('Non connecté')));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mes séries'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => _showCreateSeries(context, uid),
          ),
        ],
      ),
      body: FutureBuilder<List<SeriesModel>>(
        future: context.read<SeriesService>().getSeriesByAuthor(uid),
        builder: (context, snapshot) {
          if (!snapshot.hasData)
            return const Center(child: CircularProgressIndicator());
          final list = snapshot.data!;
          if (list.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Aucune série. Créez-en une.'),
                  const SizedBox(height: 16),
                  FilledButton.icon(
                    onPressed: () => _showCreateSeries(context, uid),
                    icon: const Icon(Icons.add),
                    label: const Text('Créer une série'),
                  ),
                ],
              ),
            );
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: list.length,
            itemBuilder: (context, index) {
              final s = list[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: s.coverUrl != null
                      ? CachedNetworkImage(
                          imageUrl: s.coverUrl!,
                          width: 48,
                          height: 48,
                          fit: BoxFit.cover,
                        )
                      : const Icon(Icons.menu_book),
                  title: Text(s.title),
                  subtitle: Text(
                    s.description.isNotEmpty
                        ? s.description
                        : 'Sans description',
                  ),
                  onTap: () => context.push('/author/series/${s.id}'),
                ),
              );
            },
          );
        },
      ),
    );
  }

  static Future<void> _showCreateSeries(
    BuildContext context,
    String authorId,
  ) async {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    final created = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Nouvelle série'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: const InputDecoration(labelText: 'Titre'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: descController,
              decoration: const InputDecoration(labelText: 'Description'),
              maxLines: 2,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Annuler'),
          ),
          FilledButton(
            onPressed: () async {
              if (titleController.text.trim().isEmpty) return;
              final series = SeriesModel(
                id: '',
                authorId: authorId,
                title: titleController.text.trim(),
                description: descController.text.trim(),
                createdAt: DateTime.now(),
              );
              await context.read<SeriesService>().createSeries(series);
              if (context.mounted) Navigator.pop(context, true);
            },
            child: const Text('Créer'),
          ),
        ],
      ),
    );
    if (created == true && context.mounted) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Série créée')));
    }
  }
}
