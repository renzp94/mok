// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'bills.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

BillModel _$BillModelFromJson(Map<String, dynamic> json) => BillModel(
      json['year'] as int,
      json['month'] as int,
      (json['money'] as num).toDouble(),
      json['note'] as String?,
      json['day'] as int,
      json['id'] as String?,
      type: json['type'] as String,
    );

Map<String, dynamic> _$BillModelToJson(BillModel instance) => <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'year': instance.year,
      'month': instance.month,
      'day': instance.day,
      'money': instance.money,
      'note': instance.note,
    };

FetchBillListParams _$FetchBillListParamsFromJson(Map<String, dynamic> json) =>
    FetchBillListParams(
      json['year'] as int,
      json['month'] as int,
    );

Map<String, dynamic> _$FetchBillListParamsToJson(
        FetchBillListParams instance) =>
    <String, dynamic>{
      'year': instance.year,
      'month': instance.month,
    };

TimeBill _$TimeBillFromJson(Map<String, dynamic> json) => TimeBill(
      json['time'] as String,
      (json['incomeMoney'] as num).toDouble(),
      (json['spendingMoney'] as num).toDouble(),
      (json['children'] as List<dynamic>)
          .map((e) => BillModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$TimeBillToJson(TimeBill instance) => <String, dynamic>{
      'time': instance.time,
      'incomeMoney': instance.incomeMoney,
      'spendingMoney': instance.spendingMoney,
      'children': instance.children,
    };
