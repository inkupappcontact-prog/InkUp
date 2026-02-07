import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../core/constants.dart';
import '../../services/auth_service.dart';
import '../../services/stripe_web_service.dart';

class WebPremiumScreen extends StatefulWidget {
  const WebPremiumScreen({super.key});

  @override
  State<WebPremiumScreen> createState() => _WebPremiumScreenState();
}

class _WebPremiumScreenState extends State<WebPremiumScreen> {
  bool _loading = false;

  Future<void> _subscribe() async {
    final userId = context.read<AuthService>().currentUser?.uid;
    if (userId == null) return;
    setState(() => _loading = true);
    try {
      final url = await context
          .read<StripeWebService>()
          .getPremiumSubscriptionCheckoutUrl(userId: userId);
      if (mounted) {
        if (url != null && url.isNotEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Redirection Stripe (à brancher)')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Configurez une Cloud Function pour l\'abonnement Stripe.',
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
            'Abonnement Premium Auteur',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 16),
          Text(
            '${AppConstants.premiumAuthorPriceWeb.toStringAsFixed(2)} €/mois — Commission réduite à ${AppConstants.commissionPremiumTier.toInt()}%, référencement prioritaire, statistiques avancées.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 24),
          const Text(
            'Souscription via Stripe. Après paiement, votre compte est mis à jour automatiquement.',
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: _loading ? null : _subscribe,
            child: _loading
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : Text(
                    'S\'abonner à ${AppConstants.premiumAuthorPriceWeb.toStringAsFixed(2)} €/mois',
                  ),
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
