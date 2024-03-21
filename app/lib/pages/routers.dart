import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import './about/about.dart';
import './auth_route/auth_route.dart';
import './home/home.dart';
import './login/login.dart';
import './register/register.dart';

final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter router =
    GoRouter(navigatorKey: rootNavigatorKey, routes: <RouteBase>[
  GoRoute(
    path: '/',
    redirect: authRoute,
  ),
  ...routes
]);

class TabBarDaTa {
  final String name;
  final Icon icon;
  final GoRoute route;

  TabBarDaTa(
    this.icon,
    this.route,
    this.name,
  );
}

List<RouteBase> routes = [
  GoRoute(
    parentNavigatorKey: rootNavigatorKey,
    name: "home",
    path: '/home',
    builder: (context, state) => const HomePage(),
  ),
  GoRoute(
    name: "login",
    path: '/login',
    parentNavigatorKey: rootNavigatorKey,
    builder: (context, state) => const LoginPage(),
  ),
  GoRoute(
    name: "register",
    path: '/register',
    parentNavigatorKey: rootNavigatorKey,
    builder: (context, state) => const RegisterPage(),
  ),
  GoRoute(
    name: "about",
    path: '/about',
    parentNavigatorKey: rootNavigatorKey,
    builder: (context, state) => const AboutPage(),
  )
];