import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/constants.dart';
import '../../models/order_model.dart';
import '../../services/auth_service.dart';

/// Tableau de bord auteur : ventes physiques et numériques.
class AuthorDashboardScreen extends StatelessWidget {
  const AuthorDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final uid = context.watch<AuthService>().currentUser?.uid;
    if (uid == null)
      return const Scaffold(body: Center(child: Text('Non connecté')));

    return Scaffold(
      appBar: AppBar(title: const Text('Tableau de bord auteur')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Ventes', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 16),
            StreamBuilder<QuerySnapshot>(
              stream: FirebaseFirestore.instance
                  .collection(AppConstants.colOrders)
                  .where('authorId', isEqualTo: uid)
                  .limit(100)
                  .snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData)
                  return const Center(child: CircularProgressIndicator());
                final orders =
                    snapshot.data!.docs
                        .map(
                          (d) => OrderModel.fromMap(
                            d.id,
                            d.data() as Map<String, dynamic>,
                          ),
                        )
                        .toList()
                      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));
                final totalPhysical = orders
                    .where((o) => o.type == AppConstants.orderTypePhysical)
                    .fold<double>(0, (s, o) => s + o.amount);
                final totalDigital = orders
                    .where((o) => o.type == AppConstants.orderTypeDigital)
                    .fold<int>(0, (s, o) => s + (o.inkPointsSpent ?? 0));

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Ventes physiques (total)',
                              style: Theme.of(context).textTheme.titleSmall,
                            ),
                            Text(
                              '${totalPhysical.toStringAsFixed(2)} €',
                              style: Theme.of(context).textTheme.headlineSmall,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Ventes numériques (InkPoints)',
                              style: Theme.of(context).textTheme.titleSmall,
                            ),
                            Text(
                              '$totalDigital points',
                              style: Theme.of(context).textTheme.headlineSmall,
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Dernières commandes',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8),
                    if (orders.isEmpty)
                      const Text('Aucune commande')
                    else
                      ...orders
                          .take(10)
                          .map(
                            (o) => ListTile(
                              title: Text(o.type),
                              subtitle: Text(
                                '${o.amount.toStringAsFixed(2)} € — ${o.createdAt.toString().substring(0, 16)}',
                              ),
                            ),
                          ),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
