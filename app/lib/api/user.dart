import 'package:mok_app/api/dio.dart';
import 'package:mok_app/models/result.dart';

const prefix = "/user";

Future<Result> login({String? username, String? password, int? classCode}) {
  return dio.post('$prefix/login', data: {
    "username": username,
    "password": password,
  });
}

Future<Result> register(
    {String? username, String? password, String? nickName}) {
  return dio.post('$prefix/register', data: {
    "username": username,
    "password": password,
  });
}

Future<Result> logout() {
  return dio.post('$prefix/logout');
}
