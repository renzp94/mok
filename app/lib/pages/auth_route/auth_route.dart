import 'package:flutter/material.dart';
import 'package:app/utils/storage.dart';

final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>();

Future<String> authRoute(context, state) async {
  String? token = storage.read<String>(TOKEN);
  if (token == null || token.isEmpty) {
    return '/login';
  }

  return '/home';
}
