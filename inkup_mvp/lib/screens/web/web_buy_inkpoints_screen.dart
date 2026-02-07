import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../core/constants.dart';
import '../../services/auth_service.dart';
import '../../services/stripe_web_service.dart';

class WebBuyInkPointsScreen extends StatefulWidget {
  const WebBuyInkPointsScreen({super.key});

  @override
  State<WebBuyInkPointsScreen> createState() => _WebBuyInkPointsScreenState();
}

class _WebBuyInkPointsScreenState extends State<WebBuyInkPointsScreen> {
  bool _loading = false;

  Future<void> _buy(int amount) async {
    final userId = context.read<AuthService>().currentUser?.uid;
    if (userId == null) return;
    setState(() => _loading = true);
    try {
      final url = await context
          .read<StripeWebService>()
          .getInkPointsCheckoutUrl(userId: userId, inkPointsAmount: amount);
      if (mounted) {
        if (url != null && url.isNotEmpty) {
          // En production : launchUrl(Uri.parse(url));
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Redirection Stripe (à brancher)')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Configurez une Cloud Function pour créer la session Stripe.',
              ),
            ),
          );
        }
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Acheter des InkPoints',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Bonus +${AppConstants.inkPointsBonusPercentWeb}% pour tout achat sur le web.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 24),
          const Text(
            'Choisissez un montant. Paiement sécurisé Stripe (Cloud Function à configurer).',
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            children: [
              FilledButton(
                onPressed: _loading ? null : () => _buy(100),
                child: const Text('100 InkPoints'),
              ),
              FilledButton(
                onPressed: _loading ? null : () => _buy(500),
                child: const Text('500 InkPoints'),
              ),
              FilledButton(
                onPressed: _loading ? null : () => _buy(1000),
                child: const Text('1000 InkPoints'),
              ),
            ],
          ),
          const SizedBox(height: 24),
          TextButton(
            onPressed: () => context.go('/account'),
            child: const Text('Retour au compte'),
          ),
        ],
      ),
    );
  }
}
