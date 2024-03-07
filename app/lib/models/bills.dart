import 'package:json_annotation/json_annotation.dart';

part 'bills.g.dart';

@JsonSerializable()
class BillModel {
  @JsonValue("_id")
  String? id;
  String type;
  int year;
  int month;
  int day;
  double money;
  String? note;

  BillModel(this.year, this.month, this.money, this.note, this.day, this.id,
      {required this.type});

  factory BillModel.fromJson(Map<String, dynamic> json) =>
      _$BillModelFromJson(json);
  Map<String, dynamic> toJson() => _$BillModelToJson(this);
}

@JsonSerializable()
class FetchBillListParams {
  final int year;
  final int month;

  FetchBillListParams(this.year, this.month);

  factory FetchBillListParams.fromJson(Map<String, dynamic> json) =>
      _$FetchBillListParamsFromJson(json);
  Map<String, dynamic> toJson() => _$FetchBillListParamsToJson(this);
}

@JsonSerializable()
class TimeBill {
  String time;
  double incomeMoney;
  double spendingMoney;
  List<BillModel> children;

  TimeBill(this.time, this.incomeMoney, this.spendingMoney, this.children);

  factory TimeBill.fromJson(Map<String, dynamic> json) =>
      _$TimeBillFromJson(json);
  Map<String, dynamic> toJson() => _$TimeBillToJson(this);
}
