import 'package:flutter/material.dart';

Radius radius = const Radius.circular(24);

class HomeHeader extends StatelessWidget {
  final int year;
  final int month;
  // 结算
  final double totalMoney;
  // 收入
  final double incomeMoney;
  // 支出
  final double spendingMoney;
  final GestureTapCallback? onDateTap;
  const HomeHeader(
      {super.key,
      required this.year,
      required this.month,
      this.onDateTap,
      required this.totalMoney,
      required this.incomeMoney,
      required this.spendingMoney});

  @override
  Widget build(BuildContext context) {
    TextStyle moneyStyle = const TextStyle(fontWeight: FontWeight.bold);

    return DefaultTextStyle(
      style: const TextStyle(color: Colors.white),
      child: Container(
        width: double.infinity,
        height: 120,
        padding: const EdgeInsets.only(left: 24, right: 24, bottom: 36),
        decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            boxShadow: [
              BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  offset: const Offset(0, 2),
                  spreadRadius: 1,
                  blurRadius: 10)
            ],
            borderRadius:
                BorderRadius.only(bottomLeft: radius, bottomRight: radius)),
        child: Row(children: [
          InkWell(
            onTap: onDateTap,
            child: Container(
              height: 80,
              width: 80,
              margin: const EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(8)),
                  border: Border.all(
                    color: Colors.white,
                  )),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "$year年",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      "$month月",
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w800),
                    )
                  ]),
            ),
          ),
          DefaultTextStyle(
              style: const TextStyle(fontSize: 12),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text.rich(TextSpan(children: [
                    const TextSpan(text: "结算: "),
                    TextSpan(text: '$totalMoney', style: moneyStyle)
                  ])),
                  Text.rich(TextSpan(children: [
                    const TextSpan(
                      text: "收入: ",
                    ),
                    TextSpan(text: '$incomeMoney', style: moneyStyle)
                  ])),
                  Text.rich(TextSpan(children: [
                    const TextSpan(text: "支出: "),
                    TextSpan(text: '$spendingMoney', style: moneyStyle)
                  ])),
                ],
              ))
        ]),
      ),
    );
  }
}
