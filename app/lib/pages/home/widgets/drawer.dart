import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:go_router/go_router.dart';
import 'package:mok_app/api/user.dart';
import 'package:mok_app/utils/storage.dart';

class HomeDrawer extends StatelessWidget {
  const HomeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    Map userInfo = storage.read(USER_INFO);

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            currentAccountPicture: Container(
                decoration: BoxDecoration(boxShadow: [
                  BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      offset: const Offset(0, 2),
                      spreadRadius: 2,
                      blurRadius: 20)
                ]),
                child: const CircleAvatar(
                    backgroundImage: AssetImage("./assets/images/logo.png"))),
            accountName: Text(
              "${userInfo["nickName"]}",
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold),
            ),
            accountEmail: const Text(""),
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
            ),
          ),
          ListTile(
              onTap: () {
                context.goNamed("about");
              },
              leading: const Icon(Icons.help_outline, color: Colors.black),
              title: const Text("关于", style: TextStyle(color: Colors.black))),
          ListTile(
              onTap: () async {
                try {
                  EasyLoading.show();
                  await logout();
                  storage.remove(TOKEN);
                  storage.remove(USER_INFO);
                  context.goNamed("login");
                } finally {
                  EasyLoading.dismiss();
                }
              },
              leading: const Icon(Icons.logout, color: Colors.black),
              title: const Text("退出登录", style: TextStyle(color: Colors.black))),
        ],
      ),
    );
  }
}
