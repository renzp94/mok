import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

import 'pages/routers.dart';

ColorScheme colorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: const Color.fromRGBO(77, 112, 246, 1),
    onPrimary: const Color.fromRGBO(77, 112, 246, 1),
    error: const Color.fromRGBO(255, 77, 79, 1),
    onError: const Color.fromRGBO(255, 77, 79, 1),
    secondary: Colors.grey.shade300,
    onSecondary: Colors.grey.shade300,
    background: Colors.white,
    onBackground: Colors.white,
    surface: Colors.white,
    onSurface: Colors.white,
    outline: Colors.grey.shade100);

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'MOK手记',
      theme: ThemeData(
          appBarTheme: const AppBarTheme(
            backgroundColor: Colors.white,
            elevation: 0,
          ),
          colorScheme: colorScheme,
          textTheme:
              const TextTheme(bodyMedium: TextStyle(color: Colors.black)),
          elevatedButtonTheme: const ElevatedButtonThemeData(
            style: ButtonStyle(
              elevation: MaterialStatePropertyAll(0),
              foregroundColor: MaterialStatePropertyAll(Colors.white),
              backgroundColor:
                  MaterialStatePropertyAll(Color.fromRGBO(77, 112, 246, 1)),
            ),
          )),
      routerConfig: router,
      builder: EasyLoading.init(),
    );
  }
}
