import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../screens/author/author_dashboard_screen.dart';
import '../screens/author/author_series_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/discovery/discovery_screen.dart';
import '../screens/auth/sign_up_screen.dart';
import '../screens/home/home_shell.dart';
import '../screens/reader/reader_screen.dart';
import '../screens/shop/shop_screen.dart';
import '../screens/web/web_dashboard_shell.dart';
import '../screens/web/web_account_screen.dart';
import '../screens/web/web_buy_inkpoints_screen.dart';
import '../screens/web/web_landing_screen.dart';
import '../screens/web/web_login_screen.dart';
import '../screens/web/web_premium_screen.dart';
import '../services/auth_service.dart';

GoRouter createAppRouter(AuthService authService) {
  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isWeb = kIsWeb;
      final isLoggedIn = authService.currentUser != null;
      final path = state.matchedLocation;

      if (isWeb) {
        if (path == '/' || path.startsWith('/login')) return null;
        if (path.startsWith('/account') ||
            path.startsWith('/buy-inkpoints') ||
            path.startsWith('/premium')) {
          return isLoggedIn ? null : '/login';
        }
        return null;
      }

      if (!isLoggedIn && path != '/login' && path != '/signup') return '/login';
      if (isLoggedIn && (path == '/login' || path == '/signup')) return '/';
      return null;
    },
    routes: [if (kIsWeb) ..._webRoutes else ..._mobileRoutes],
  );
}

final _webRoutes = <RouteBase>[
  GoRoute(path: '/', builder: (context, state) => const WebLandingScreen()),
  GoRoute(path: '/login', builder: (context, state) => const WebLoginScreen()),
  ShellRoute(
    builder: (context, state, child) => WebDashboardShell(child: child),
    routes: [
      GoRoute(
        path: '/account',
        builder: (context, state) => const WebAccountScreen(),
      ),
      GoRoute(
        path: '/buy-inkpoints',
        builder: (context, state) => const WebBuyInkPointsScreen(),
      ),
      GoRoute(
        path: '/premium',
        builder: (context, state) => const WebPremiumScreen(),
      ),
    ],
  ),
];

final _shellNavigatorKeys = [
  GlobalKey<NavigatorState>(),
  GlobalKey<NavigatorState>(),
  GlobalKey<NavigatorState>(),
  GlobalKey<NavigatorState>(),
];

final _mobileRoutes = <RouteBase>[
  GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
  GoRoute(path: '/signup', builder: (context, state) => const SignUpScreen()),
  StatefulShellRoute.indexedStack(
    builder: (context, state, navigationShell) =>
        HomeShell(navigationShell: navigationShell),
    branches: [
      StatefulShellBranch(
        navigatorKey: _shellNavigatorKeys[0],
        routes: [
          GoRoute(
            path: '/',
            builder: (context, state) => const DiscoveryScreen(),
          ),
        ],
      ),
      StatefulShellBranch(
        navigatorKey: _shellNavigatorKeys[1],
        routes: [
          GoRoute(
            path: '/library',
            builder: (context, state) => const LibraryPlaceholder(),
          ),
        ],
      ),
      StatefulShellBranch(
        navigatorKey: _shellNavigatorKeys[2],
        routes: [
          GoRoute(
            path: '/shop',
            builder: (context, state) => const ShopScreen(),
          ),
        ],
      ),
      StatefulShellBranch(
        navigatorKey: _shellNavigatorKeys[3],
        routes: [
          GoRoute(
            path: '/profile',
            builder: (context, state) => const ProfilePlaceholder(),
          ),
        ],
      ),
    ],
  ),
  GoRoute(
    path: '/chapter/:id',
    builder: (context, state) {
      final id = state.pathParameters['id']!;
      return ReaderScreen(chapterId: id);
    },
  ),
  GoRoute(
    path: '/author/dashboard',
    builder: (context, state) => const AuthorDashboardScreen(),
  ),
  GoRoute(
    path: '/author/series',
    builder: (context, state) => const AuthorSeriesScreen(),
  ),
];
