import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mok_app/api/bills.dart';
import 'package:mok_app/models/bills.dart';
import 'package:mok_app/models/result.dart';
import 'package:mok_app/pages/home/widgets/add_panel.dart';
import 'package:mok_app/pages/home/widgets/bill/bill_list.dart';
import 'package:mok_app/pages/home/widgets/drawer.dart';
import 'package:mok_app/pages/home/widgets/header.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late int year;
  late int month;
  double totalMoney = 0;
  double incomeMoney = 0;
  double spendingMoney = 0;
  List<BillModel> bills = [];
  List<TimeBill> timeBills = [];

  @override
  void initState() {
    super.initState();
    DateTime now = DateTime.now();
    setState(() {
      year = now.year;
      month = now.month;
    });
    init();
  }

  void init() {
    getList();
  }

  void getList() async {
    FetchBillListParams data = FetchBillListParams(year, month);
    Result res = await fetchBillList(data);
    List<BillModel> list = [];
    List<TimeBill> timeBillList = [];
    double income = 0;
    double spending = 0;

    if (res.data != null && (res.data as List).isNotEmpty) {
      Set<String> timeSet = {};
      for (var item in res.data) {
        BillModel bill = BillModel.fromJson(item);
        list.add(bill);
        timeSet.add("${bill.year}${bill.month}${bill.day}");
      }

      List<String> timeList = List.from(timeSet)
        ..sort((a, b) => int.parse(b) - int.parse(a));

      for (var bill in list) {
        String time = "${bill.year}${bill.month}${bill.day}";
        int index = timeList.indexWhere((item) => item == time);
        bool hasTimeBill = timeBillList.length > index;
        bool isIncome = bill.type == "INCOME";
        if (hasTimeBill) {
          timeBillList[index].children.add(bill);
          if (isIncome) {
            timeBillList[index].incomeMoney += bill.money;
            income += timeBillList[index].incomeMoney;
          } else {
            timeBillList[index].spendingMoney += bill.money;
            spending += timeBillList[index].spendingMoney;
          }
        } else {
          timeBillList.add(TimeBill(
              "${bill.month.toString().padLeft(2, "0")}月${bill.day.toString().padLeft(2, "0")}日",
              isIncome ? bill.money : 0,
              !isIncome ? bill.money : 0,
              [bill]));

          if (isIncome) {
            income += bill.money;
          } else {
            spending += bill.money;
          }
        }
      }
    }

    setState(() {
      timeBills = timeBillList;
      bills = list;
      incomeMoney = income;
      spendingMoney = spending;
      totalMoney = income - spending;
    });
  }

  onConfirm(value) {
    setState(() {
      year = value['year'];
      month = value['month'];
    });

    getList();
  }

  onShowDate() {
    TDPicker.showDatePicker(context,
        title: "",
        useDay: false,
        onConfirm: onConfirm,
        initialDate: [year, month + 1, 0]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100.withOpacity(0.3),
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: const Text(
          "Mok手记",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      drawer: const HomeDrawer(),
      floatingActionButton: IconButton(
        icon: const Icon(
          Icons.add,
          size: 30,
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).primaryColor,
          shadowColor: Colors.grey.shade100.withOpacity(0.3),
          elevation: 10.0,
        ),
        onPressed: () {
          Navigator.of(context).push(TDSlidePopupRoute(
              slideTransitionFrom: SlideTransitionFrom.bottom,
              builder: (context) {
                return AddPanel(
                  title: "添加账单",
                  onOK: getList,
                );
              }));
        },
      ),
      body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        HomeHeader(
          year: year,
          month: month,
          totalMoney: totalMoney,
          incomeMoney: incomeMoney,
          spendingMoney: spendingMoney,
          onDateTap: onShowDate,
        ),
        const SizedBox(
          height: 12,
        ),
        BillList(
          data: timeBills,
          onUpdated: getList,
        )
      ]),
    );
  }
}
