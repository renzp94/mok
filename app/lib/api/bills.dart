import 'package:app/api/dio.dart';
import 'package:app/models/bills.dart';
import 'package:app/models/result.dart';

// 获取账单数据
Future<Result> fetchBillList(
  FetchBillListParams data,
) {
  return dio.get('/bills', queryParameters: data.toJson());
}

// 添加账单
Future<Result> addBill(
  BillModel bill,
) {
  Map data = bill.toJson();
  data.remove("id");
  return dio.post('/bill', data: data);
}

// 删除账单
Future<Result> removeBill(
  String id,
) {
  return dio.delete('/bill/$id');
}

// 更新账单
Future<Result> updateBill(
  BillModel data,
) {
  return dio.put('/bill', data: data.toJson());
}

// 获取账单详情
Future<Result> fetchBillDetails(
  String id,
) {
  return dio.get('/bill/$id');
}
