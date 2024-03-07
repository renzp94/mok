import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:mok_app/api/bills.dart';
import 'package:mok_app/models/bills.dart';
import 'package:mok_app/pages/home/widgets/add_panel.dart';
import 'package:mok_app/pages/home/widgets/bill/bill_item.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class BillCard extends StatelessWidget {
  final String time;
  final double incomeMoney;
  final double spendingMoney;
  final List<BillModel> data;
  final Function onUpdated;
  const BillCard(
      {super.key,
      required this.time,
      required this.incomeMoney,
      required this.spendingMoney,
      required this.data,
      required this.onUpdated});

  @override
  Widget build(BuildContext context) {
    void onDelete(String id) async {
      try {
        EasyLoading.show();
        await removeBill(id);
        onUpdated();
      } finally {
        EasyLoading.dismiss();
      }
    }

    void onEdit(String id) async {
      Navigator.of(context).push(TDSlidePopupRoute(
          slideTransitionFrom: SlideTransitionFrom.bottom,
          builder: (context) {
            return AddPanel(
              title: "编辑账单",
              id: id,
              onOK: onUpdated,
            );
          }));
    }

    Widget header = Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
          border: BorderDirectional(
              bottom: BorderSide(color: Theme.of(context).colorScheme.outline)),
          color: Colors.grey.shade100),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            time,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
                decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: const BorderRadius.all(Radius.circular(4))),
                child: const Text("收"),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text(
                  incomeMoney.toString(),
                  style: const TextStyle(color: Colors.green),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
                decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: const BorderRadius.all(Radius.circular(4))),
                child: const Text("支"),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text(
                  spendingMoney.toString(),
                  style: const TextStyle(color: Colors.amber),
                ),
              ),
            ],
          )
        ],
      ),
    );

    List<Widget> children = [header];

    children.addAll(data
        .map((item) => BillItem(
              type: item.type,
              money: item.money,
              note: item.note,
              onDelete: (ctx) => onDelete(item.id!),
              onEdit: (ctx) => onEdit(item.id!),
            ))
        .toList());

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
          border: Border.all(color: Theme.of(context).colorScheme.outline),
          borderRadius: const BorderRadius.all(Radius.circular(8))),
      child: Column(children: children),
    );
  }
}
