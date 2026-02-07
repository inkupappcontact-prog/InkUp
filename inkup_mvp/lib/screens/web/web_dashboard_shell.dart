import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class WebDashboardShell extends StatelessWidget {
  const WebDashboardShell({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mon compte InkUp'),
        actions: [
          TextButton(
            onPressed: () => context.go('/account'),
            child: const Text('Compte'),
          ),
          TextButton(
            onPressed: () => context.go('/buy-inkpoints'),
            child: const Text('InkPoints'),
          ),
          TextButton(
            onPressed: () => context.go('/premium'),
            child: const Text('Premium'),
          ),
        ],
      ),
      body: child,
    );
  }
}
