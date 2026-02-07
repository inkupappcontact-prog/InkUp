import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../core/constants.dart';
import '../../services/auth_service.dart';
import '../../models/user_model.dart';

class WebAccountScreen extends StatelessWidget {
  const WebAccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthService>();
    return StreamBuilder<UserModel?>(
      stream: auth.userStream,
      builder: (context, snapshot) {
        final user = snapshot.data;
        return SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Mon compte',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: 24),
              if (user != null) ...[
                Text('Solde InkPoints : ${user.inkPointsBalance}'),
                const SizedBox(height: 8),
                Text(
                  'Rôle : ${user.role == AppConstants.roleAuthor ? "Auteur" : "Lecteur"}',
                ),
                if (user.isPremiumAuthor)
                  const Text('Abonnement Premium auteur actif'),
                const SizedBox(height: 24),
                Text(
                  'Rechargez vos InkPoints sur cette page (bonus +${AppConstants.inkPointsBonusPercentWeb}% sur le web).',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 16),
                FilledButton(
                  onPressed: () => context.go('/buy-inkpoints'),
                  child: const Text('Recharger des InkPoints'),
                ),
                const SizedBox(height: 24),
                OutlinedButton(
                  onPressed: () async {
                    await auth.signOut();
                    if (context.mounted) context.go('/');
                  },
                  child: const Text('Déconnexion'),
                ),
              ] else
                const CircularProgressIndicator(),
            ],
          ),
        );
      },
    );
  }
}
