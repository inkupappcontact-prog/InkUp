import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/product_model.dart';
import '../../services/auth_service.dart';
import '../../services/product_service.dart';
import '../../services/stripe_mobile_service.dart';

/// Écran boutique : liste des produits (par auteur ou global), panier, checkout.
/// Pour le MVP on affiche une liste vide avec message "Boutique — ajoutez des produits côté auteur".
/// Si on a un authorId en paramètre, on charge les produits de cet auteur.
class ShopScreen extends StatefulWidget {
  const ShopScreen({super.key, this.authorId});

  final String? authorId;

  @override
  State<ShopScreen> createState() => _ShopScreenState();
}

class _ShopScreenState extends State<ShopScreen> {
  final List<ProductModel> _cart = [];

  @override
  Widget build(BuildContext context) {
    final authorId = widget.authorId;
    return Scaffold(
      appBar: AppBar(
        title: Text(authorId == null ? 'Boutique' : 'Boutique auteur'),
        actions: [
          if (_cart.isNotEmpty)
            IconButton(
              icon: Badge(
                label: Text('${_cart.length}'),
                child: const Icon(Icons.shopping_cart),
              ),
              onPressed: _showCart,
            ),
        ],
      ),
      body: authorId == null
          ? const Center(
              child: Text(
                'Parcourez les séries et ouvrez la boutique d\'un auteur pour voir ses produits physiques (albums, goodies).',
                textAlign: TextAlign.center,
              ),
            )
          : FutureBuilder<List<ProductModel>>(
              future: context.read<ProductService>().getProductsByAuthor(
                authorId,
              ),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const Center(child: CircularProgressIndicator());
                }
                final products = snapshot.data!;
                if (products.isEmpty) {
                  return const Center(
                    child: Text('Aucun produit pour le moment.'),
                  );
                }
                return ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: products.length,
                  itemBuilder: (context, index) {
                    final p = products[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: p.imageUrl != null
                            ? CachedNetworkImage(
                                imageUrl: p.imageUrl!,
                                width: 56,
                                height: 56,
                                fit: BoxFit.cover,
                              )
                            : const Icon(Icons.image),
                        title: Text(p.title),
                        subtitle: Text('${p.price.toStringAsFixed(2)} €'),
                        trailing: IconButton(
                          icon: const Icon(Icons.add_shopping_cart),
                          onPressed: () => _addToCart(p),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
    );
  }

  void _addToCart(ProductModel p) {
    setState(() => _cart.add(p));
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text('${p.title} ajouté au panier')));
  }

  void _showCart() {
    showModalBottomSheet<void>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) {
          return Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Panier (${_cart.length} article(s))',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 16),
                ..._cart.map(
                  (p) => ListTile(
                    title: Text(p.title),
                    trailing: Text('${p.price.toStringAsFixed(2)} €'),
                  ),
                ),
                const SizedBox(height: 16),
                FilledButton(
                  onPressed: () async {
                    Navigator.of(context).pop();
                    await _checkout();
                  },
                  child: const Text('Commander (Stripe via Cloud Function)'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Future<void> _checkout() async {
    final userId = context.read<AuthService>().currentUser?.uid;
    if (userId == null) return;
    final items = _cart
        .map((p) => {'productId': p.id, 'title': p.title, 'price': p.price})
        .toList();
    final url = await context
        .read<StripeMobileService>()
        .createPhysicalOrderCheckout(userId: userId, items: items);
    if (mounted) {
      if (url != null && url.isNotEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Redirection paiement (à brancher)')),
        );
      } else {
        setState(() => _cart.clear());
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Configurez une Cloud Function pour le checkout Stripe.',
            ),
          ),
        );
      }
    }
  }
}
