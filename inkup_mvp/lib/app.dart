import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/theme.dart';
import 'router/app_router.dart';
import 'services/auth_service.dart';
import 'services/chapter_service.dart';
import 'services/discovery_service.dart';
import 'services/inkpoints_service.dart';
import 'services/product_service.dart';
import 'services/purchase_service.dart';
import 'services/series_service.dart';
import 'services/stripe_mobile_service.dart';
import 'services/stripe_web_service.dart';

class InkUpApp extends StatelessWidget {
  const InkUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = AuthService();
    return MultiProvider(
      providers: [
        Provider<AuthService>.value(value: authService),
        Provider(create: (_) => ChapterService()),
        Provider(create: (_) => DiscoveryService()),
        Provider(create: (_) => PurchaseService()),
        Provider(create: (_) => InkPointsService()),
        Provider(create: (_) => ProductService()),
        Provider(create: (_) => SeriesService()),
        Provider(create: (_) => StripeMobileService()),
        Provider(create: (_) => StripeWebService()),
      ],
      child: MaterialApp.router(
        title: 'InkUp',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light,
        darkTheme: AppTheme.dark,
        routerConfig: createAppRouter(authService),
      ),
    );
  }
}
