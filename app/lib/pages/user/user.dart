import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:go_router/go_router.dart';
import 'package:mok_app/api/user.dart';
import 'package:mok_app/models/result.dart';
import 'package:mok_app/utils/storage.dart';

class UserPage extends StatefulWidget {
  const UserPage({super.key});

  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "我的",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ElevatedButton(
        child: const Text("退出"),
        onPressed: () async {
          try {
            EasyLoading.show(status: "退出中...");
            Result res = await logout();
            storage.remove(TOKEN);
            EasyLoading.showToast(res.msg);
            context.replaceNamed("login");
          } catch (e) {
            EasyLoading.dismiss();
            EasyLoading.showToast(e.toString());
          }
        },
      ),
    );
  }
}
