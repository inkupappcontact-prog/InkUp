import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class WebLandingScreen extends StatelessWidget {
  const WebLandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('InkUp'),
        actions: [
          TextButton(
            onPressed: () => context.go('/login'),
            child: const Text('Connexion'),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Bienvenue sur InkUp',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 24),
            const Text('Gérez vos InkPoints et votre abonnement auteur ici.'),
            const SizedBox(height: 32),
            FilledButton(
              onPressed: () => context.go('/login'),
              child: const Text('Se connecter'),
            ),
          ],
        ),
      ),
    );
  }
}
