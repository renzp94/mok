import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TDNavBar(
        title: "关于",
        onBack: () {
          context.goNamed("home");
        },
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(48),
        color: Colors.grey.shade50,
        child: Column(children: [
          Container(
            height: 80,
            width: 80,
            margin: const EdgeInsets.only(bottom: 8),
            clipBehavior: Clip.hardEdge,
            decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(12))),
            child: Image.asset("./assets/images/logo.png"),
          ),
          const Text(
            "Mok手记",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(
            height: 12,
          ),
          const Text(
            "基于Flutter开发的一款记账App",
            style: TextStyle(color: Colors.black),
          )
        ]),
      ),
    );
  }
}
