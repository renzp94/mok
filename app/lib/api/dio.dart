import 'dart:convert';
import 'package:dio/dio.dart';

import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:mok_app/models/result.dart';
import 'package:mok_app/pages/routers.dart';
import 'package:mok_app/utils/storage.dart';

import '../utils/constant.dart';

class AppDio {
  late Dio dio;
  AppDio(String? baseUrl) {
    dio = Dio();
    if (baseUrl != null) {
      dio.options.baseUrl = baseUrl;
    }

    dio.interceptors.add(InterceptorsWrapper(
        onRequest: (RequestOptions options, RequestInterceptorHandler handler) {
      String? token = storage.read(TOKEN);
      if (token != null) {
        options.headers.addAll({"Authorization": "Bearer $token"});
      }
      return handler.next(options);
    }, onResponse: (Response response, ResponseInterceptorHandler handler) {
      Map responseMap = json.decode(json.encode(response.data));
      if (responseMap['code'] != 0) {
        EasyLoading.showToast(responseMap['msg']);
      }

      return handler.next(response);
    }, onError: (DioException e, ErrorInterceptorHandler handler) {
      if (e.response != null && e.response?.statusCode == 401) {
        storage.remove(TOKEN);
        storage.remove(USER_INFO);
        router.goNamed("login");
        EasyLoading.showToast("当前登录已失效，请重新登录");
        Future.delayed(const Duration(microseconds: 1000), () {
          router.goNamed("login");
        });

        return handler.reject(e);
      }

      if (e.response?.statusCode != 200) {
        EasyLoading.showToast(e.message ?? e.error.toString());
        return handler.reject(e);
      }

      return handler.next(e);
    }));
  }
  Future<Result> get<T>(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    Result result = Result(0, '', null);
    try {
      Response res = await dio.get(path,
          data: data,
          queryParameters: queryParameters,
          options: options,
          cancelToken: cancelToken,
          onReceiveProgress: onReceiveProgress);

      result = Result.fromJson(res.data);
    } on DioException catch (e) {
      print(e);
    }

    return result;
  }

  Future<Result> post<T>(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    Result result = Result(0, '', null);
    try {
      Response res = await dio.post(path,
          data: data,
          queryParameters: queryParameters,
          options: options,
          cancelToken: cancelToken,
          onReceiveProgress: onReceiveProgress);

      result = Result.fromJson(res.data);
    } finally {}

    return result;
  }

  Future<Result> put<T>(
    String path, {
    Object? data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    Result result = Result(0, '', null);
    try {
      Response res = await dio.put(path,
          data: data,
          queryParameters: queryParameters,
          options: options,
          cancelToken: cancelToken,
          onReceiveProgress: onReceiveProgress);

      result = Result.fromJson(res.data);
    } finally {}

    return result;
  }

  Future<Result> delete<T>(String path,
      {Object? data,
      Map<String, dynamic>? queryParameters,
      Options? options,
      CancelToken? cancelToken}) async {
    Result result = Result(0, '', null);
    try {
      Response res = await dio.delete(path,
          data: data,
          queryParameters: queryParameters,
          options: options,
          cancelToken: cancelToken);

      result = Result.fromJson(res.data);
    } finally {}

    return result;
  }
}

AppDio dio = AppDio(baseUrl);
