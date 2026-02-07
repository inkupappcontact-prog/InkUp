import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../services/auth_service.dart';

class HomeShell extends StatelessWidget {
  const HomeShell({super.key, required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: navigationShell.currentIndex,
        onTap: (index) => navigationShell.goBranch(index),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
          BottomNavigationBarItem(
            icon: Icon(Icons.menu_book),
            label: 'Bibliothèque',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_bag),
            label: 'Boutique',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profil'),
        ],
      ),
    );
  }
}

class HomeShellContent extends StatelessWidget {
  const HomeShellContent({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('InkUp')),
      body: const Center(child: Text('Découverte – à venir')),
    );
  }
}

class LibraryPlaceholder extends StatelessWidget {
  const LibraryPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ma bibliothèque')),
      body: const Center(child: Text('Téléchargements et séries – à venir')),
    );
  }
}

class ShopPlaceholder extends StatelessWidget {
  const ShopPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Boutique')),
      body: const Center(child: Text('Boutique – à venir')),
    );
  }
}

class ProfilePlaceholder extends StatelessWidget {
  const ProfilePlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthService>();
    return Scaffold(
      appBar: AppBar(title: const Text('Profil')),
      body: StreamBuilder(
        stream: auth.userStream,
        builder: (context, snapshot) {
          final user = snapshot.data;
          return ListView(
            padding: const EdgeInsets.all(24),
            children: [
              if (user != null) ...[
                Text(
                  'Solde InkPoints : ${user.inkPointsBalance}',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Rechargez vos InkPoints sur votre compte en ligne (bonus +10% sur le web).',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 24),
                if (user.isAuthor) ...[
                  ListTile(
                    title: const Text('Tableau de bord auteur'),
                    leading: const Icon(Icons.dashboard),
                    onTap: () => context.go('/author/dashboard'),
                  ),
                  ListTile(
                    title: const Text('Mes séries'),
                    leading: const Icon(Icons.menu_book),
                    onTap: () => context.go('/author/series'),
                  ),
                  const SizedBox(height: 16),
                ] else ...[
                  ListTile(
                    title: const Text('Devenir auteur'),
                    leading: const Icon(Icons.person_add),
                    onTap: () async {
                      await auth.becomeAuthor();
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Vous êtes maintenant auteur'),
                          ),
                        );
                      }
                    },
                  ),
                  const SizedBox(height: 16),
                ],
              ],
              const Divider(),
              TextButton(
                onPressed: () async {
                  await auth.signOut();
                  if (context.mounted) context.go('/login');
                },
                child: const Text('Déconnexion'),
              ),
            ],
          );
        },
      ),
    );
  }
}
