import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:go_router/go_router.dart';
import 'package:mok_app/api/user.dart';
import 'package:mok_app/models/result.dart';
import 'package:mok_app/utils/storage.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

Map<String, String? Function(String?)> rules = {
  "username": (v) {
    return v!.trim().isNotEmpty ? null : "账号不能为空";
  },
  "password": (v) {
    return v!.trim().isNotEmpty ? null : "密码不能为空";
  },
};

class _LoginPageState extends State<LoginPage> {
  final GlobalKey _formKey = GlobalKey<FormState>();
  String? _username;
  String? _password;
  bool isShowPassword = false;

  void onLogin() async {
    final form = _formKey.currentState as FormState;

    if (form.validate()) {
      form.save();
      try {
        EasyLoading.show(status: "登录中...");
        Result res = await login(username: _username, password: _password);
        if (res.code == 0) {
          Map userInfo = res.data["userInfo"];
          String token = res.data["token"];
          storage.write(USER_INFO, userInfo);
          storage.write(TOKEN, token);
          EasyLoading.dismiss();
          context.replaceNamed("home");
        }
      } catch (e) {
        EasyLoading.dismiss();
        EasyLoading.showToast(e.toString());
      }
    }
  }

  void onGoRegisterPage() {
    context.goNamed("register");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).requestFocus(FocusNode());
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 48),
          width: double.infinity,
          decoration:
              const BoxDecoration(color: Color.fromRGBO(77, 112, 246, 1)),
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            const Text(
              "Mock手记",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold),
            ),
            const SizedBox(
              height: 12,
            ),
            const Text(
              "记录，让生活变美好",
              style: TextStyle(color: Colors.white),
            ),
            const SizedBox(
              height: 12,
            ),
            Form(
              key: _formKey,
              child: Column(
                children: [
                  const SizedBox(height: 24),
                  TextFormField(
                    decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.person),
                        hintText: "请输入账号",
                        hintStyle: TextStyle(color: Colors.white30),
                        labelText: "账号",
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.white30)),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.white)),
                        labelStyle: TextStyle(color: Colors.white)),
                    validator: rules["username"],
                    onSaved: (newValue) {
                      _username = newValue;
                    },
                  ),
                  TextFormField(
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.lock),
                      hintStyle: const TextStyle(color: Colors.white30),
                      hintText: "请输入密码",
                      labelText: "密码",
                      enabledBorder: const UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.white30)),
                      focusedBorder: const UnderlineInputBorder(
                          borderSide: BorderSide(color: Colors.white)),
                      labelStyle: const TextStyle(color: Colors.white),
                      suffixIcon: _password != null && _password != ''
                          ? InkWell(
                              onTap: () {
                                setState(() {
                                  isShowPassword = !isShowPassword;
                                });
                              },
                              child: isShowPassword
                                  ? const Icon(Icons.visibility)
                                  : const Icon(Icons.visibility_off))
                          : null,
                    ),
                    obscureText: !isShowPassword,
                    validator: rules["password"],
                    onChanged: (value) {
                      setState(() {
                        _password = value;
                      });
                    },
                  ),
                  const SizedBox(height: 48),
                  SizedBox(
                    height: 48,
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white),
                      onPressed: onLogin,
                      child: const Text(
                        "登录",
                        style:
                            TextStyle(color: Color.fromRGBO(77, 112, 246, 1)),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 64,
                    width: 120,
                    child: ElevatedButton(
                      onPressed: onGoRegisterPage,
                      child: const Text(
                        "注册",
                        style: TextStyle(
                            fontSize: 16,
                            color: Colors.white70,
                            decoration: TextDecoration.underline),
                      ),
                    ),
                  ),
                ],
              ),
            )
          ]),
        ),
      ),
    );
  }
}
