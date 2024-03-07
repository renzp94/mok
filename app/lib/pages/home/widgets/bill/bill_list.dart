import 'package:flutter/material.dart';
import 'package:mok_app/models/bills.dart';
import 'package:mok_app/pages/home/widgets/bill/bill_card.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class BillList extends StatelessWidget {
  final List<TimeBill> data;
  final Function onUpdated;
  const BillList({super.key, required this.data, required this.onUpdated});

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Container(
            padding: const EdgeInsets.only(left: 12, right: 12, bottom: 12),
            child: data.isNotEmpty
                ? ListView(
                    children: data.map((item) {
                      return BillCard(
                        time: item.time,
                        incomeMoney: item.incomeMoney,
                        spendingMoney: item.spendingMoney,
                        data: item.children,
                        onUpdated: onUpdated,
                      );
                    }).toList(),
                  )
                : TDEmpty(
                    image: Icon(
                      Icons.shopify_sharp,
                      size: 100,
                      color: Colors.grey.shade400,
                    ),
                    emptyText: "无消费/收入记录",
                  )));
  }
}
