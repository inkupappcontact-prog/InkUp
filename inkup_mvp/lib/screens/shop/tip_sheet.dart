import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../services/auth_service.dart';
import '../../services/stripe_mobile_service.dart';

/// Bottom sheet pour envoyer un pourboire à un auteur.
void showTipSheet(
  BuildContext context, {
  required String authorId,
  String? authorName,
}) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    builder: (context) =>
        _TipSheetContent(authorId: authorId, authorName: authorName),
  );
}

class _TipSheetContent extends StatefulWidget {
  const _TipSheetContent({required this.authorId, this.authorName});

  final String authorId;
  final String? authorName;

  @override
  State<_TipSheetContent> createState() => _TipSheetContentState();
}

class _TipSheetContentState extends State<_TipSheetContent> {
  final _amountController = TextEditingController(text: '5');
  final _messageController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _amountController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final amount =
        double.tryParse(_amountController.text.replaceAll(',', '.')) ?? 0;
    if (amount <= 0) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Montant invalide')));
      return;
    }
    final userId = context.read<AuthService>().currentUser?.uid;
    if (userId == null) return;
    setState(() => _loading = true);
    try {
      final url = await context.read<StripeMobileService>().createTipPayment(
        fromUserId: userId,
        toAuthorId: widget.authorId,
        amountEur: amount,
        message: _messageController.text.trim().isEmpty
            ? null
            : _messageController.text.trim(),
      );
      if (mounted) {
        Navigator.of(context).pop();
        if (url != null && url.isNotEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Paiement (à brancher)')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Configurez une Cloud Function pour les tips Stripe.',
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
    return Padding(
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 24,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Envoyer un pourboire${widget.authorName != null ? ' à ${widget.authorName}' : ''}',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _amountController,
            decoration: const InputDecoration(
              labelText: 'Montant (€)',
              suffixText: '€',
            ),
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _messageController,
            decoration: const InputDecoration(labelText: 'Message (optionnel)'),
            maxLines: 2,
          ),
          const SizedBox(height: 24),
          FilledButton(
            onPressed: _loading ? null : _send,
            child: _loading
                ? const SizedBox(
                    height: 20,
                    width: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text('Envoyer'),
          ),
        ],
      ),
    );
  }
}
