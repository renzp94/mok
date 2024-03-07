import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mok_app/api/bills.dart';
import 'package:mok_app/models/bills.dart';
import 'package:mok_app/models/result.dart';
import 'package:mok_app/utils/precision_limit_formatter.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

ColorScheme inputColorScheme = ColorScheme(
  brightness: Brightness.light,
  primary: const Color.fromRGBO(77, 112, 246, 1),
  onPrimary: const Color.fromRGBO(77, 112, 246, 1),
  error: const Color.fromRGBO(255, 77, 79, 1),
  onError: const Color.fromRGBO(255, 77, 79, 1),
  secondary: Colors.grey.shade300,
  onSecondary: Colors.grey.shade300,
  background: Colors.white,
  onBackground: Colors.white,
  surface: Colors.white,
  onSurface: Colors.black,
);

class AddPanel extends StatefulWidget {
  final String? title;
  final String? id;
  final int? money;
  final Function onOK;

  const AddPanel(
      {super.key, this.title, this.money, required this.onOK, this.id});

  @override
  State<AddPanel> createState() => _AddPanelState();
}

class _AddPanelState extends State<AddPanel> {
  String type = 'SPENDING';
  int? year;
  int? month;
  int? day;
  String? money;
  String? note;
  TextEditingController moneyFieldController = TextEditingController();
  TextEditingController noteFieldController = TextEditingController();

  @override
  void initState() {
    super.initState();
    DateTime now = DateTime.now();
    setState(() {
      year = now.year;
      month = now.month;
      day = now.day;
    });
    if (widget.id != null) {
      getDetails(widget.id!);
    }
  }

  void getDetails(String id) async {
    Result res = await fetchBillDetails(id);
    BillModel bill = BillModel.fromJson(res.data);
    moneyFieldController.text = bill.money.toString();
    noteFieldController.text = bill.note ?? '';
    setState(() {
      year = bill.year;
      month = bill.month;
      day = bill.day;
      type = bill.type;
      money = bill.money.toString();
      note = bill.note;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: TDPopupBottomConfirmPanel(
        title: widget.title,
        radius: 16,
        leftClick: () {
          Navigator.pop(context);
        },
        rightClick: () async {
          if (money == null || money!.isEmpty) {
            EasyLoading.showToast("请输入金额");
            return;
          }

          if (double.parse(money!) <= 0) {
            EasyLoading.showToast("请输入正确的金额");
            return;
          }

          BillModel data = BillModel.fromJson({
            "year": year,
            "month": month,
            "day": day,
            "money": double.parse(money!),
            "type": type,
            "note": note ?? ''
          });

          try {
            EasyLoading.show();
            if (widget.id == null) {
              await addBill(data);
            } else {
              data.id = widget.id;
              await updateBill(data);
            }
            Navigator.pop(context);
            widget.onOK();
          } finally {
            EasyLoading.dismiss();
          }
        },
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
              color: Colors.grey.shade100,
              border: Border(top: BorderSide(color: Colors.grey.shade100))),
          height: MediaQuery.of(context).size.height * 0.7,
          width: double.infinity,
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
                width: double.infinity,
                height: 48,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                margin: const EdgeInsets.only(top: 8),
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(12))),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "类型",
                    ),
                    Theme(
                        data: ThemeData(
                            colorScheme: ColorScheme(
                                brightness: Brightness.light,
                                primary: const Color.fromRGBO(77, 112, 246, 1),
                                onPrimary:
                                    const Color.fromRGBO(77, 112, 246, 1),
                                error: const Color.fromRGBO(255, 77, 79, 1),
                                onError: const Color.fromRGBO(255, 77, 79, 1),
                                secondary: Colors.grey.shade300,
                                onSecondary: Colors.grey.shade300,
                                background: Colors.white,
                                onBackground: Colors.white,
                                surface: Colors.white,
                                onSurface: Colors.grey.shade300,
                                outline: Colors.grey.shade100)),
                        child: Row(
                          children: [
                            SizedBox(
                                width: 100,
                                child: RadioListTile(
                                  value: 'SPENDING',
                                  groupValue: type,
                                  contentPadding: const EdgeInsets.all(0),
                                  title: const Text(
                                    '支出',
                                    style: TextStyle(color: Colors.black),
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      type = value!;
                                    });
                                  },
                                )),
                            SizedBox(
                                width: 100,
                                child: RadioListTile(
                                  value: 'INCOME',
                                  groupValue: type,
                                  contentPadding: const EdgeInsets.all(0),
                                  title: const Text(
                                    '收入',
                                    style: TextStyle(color: Colors.black),
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      type = value!;
                                    });
                                  },
                                )),
                          ],
                        ))
                  ],
                )),
            Container(
                width: double.infinity,
                height: 48,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                margin: const EdgeInsets.only(top: 8),
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(12))),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "时间",
                    ),
                    InkWell(
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text(
                            '$year年$month月$day日',
                          ),
                          const SizedBox(
                            width: 12,
                          ),
                          const Icon(
                            Icons.arrow_forward_ios,
                            size: 14,
                          )
                        ],
                      ),
                      onTap: () {
                        TDPicker.showDatePicker(context, title: '选择时间',
                            onConfirm: (selected) {
                          setState(() {
                            year = selected['year'];
                            month = selected['month'];
                            day = selected['day'];
                          });
                        }, initialDate: [year!, month!, day!]);
                      },
                    )
                  ],
                )),
            Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                margin: const EdgeInsets.only(top: 8),
                height: 48,
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(12))),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "金额",
                    ),
                    Row(
                      children: [
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.7,
                          child: Theme(
                              data: ThemeData(colorScheme: inputColorScheme),
                              child: TextField(
                                controller: moneyFieldController,
                                textAlign: TextAlign.end,
                                inputFormatters: [
                                  PrecisionLimitFormatter(2),
                                  LengthLimitingTextInputFormatter(12),
                                  FilteringTextInputFormatter.allow(
                                      RegExp('[0-9.,]+'))
                                ],
                                keyboardType:
                                    const TextInputType.numberWithOptions(
                                        decimal: true),
                                decoration: const InputDecoration(
                                  hintText: "请输入金额",
                                  hintStyle: TextStyle(color: Colors.grey),
                                  enabledBorder: UnderlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.white)),
                                  focusedBorder: UnderlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.white)),
                                ),
                                onChanged: (newValue) {
                                  money = newValue;
                                },
                              )),
                        ),
                        const Text(
                          "元",
                        ),
                      ],
                    )
                  ],
                )),
            Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                margin: const EdgeInsets.only(top: 8),
                height: 48,
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(12))),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "备注",
                    ),
                    const SizedBox(
                      width: 48,
                    ),
                    Expanded(
                        child: Theme(
                            data: ThemeData(colorScheme: inputColorScheme),
                            child: TextField(
                              controller: noteFieldController,
                              inputFormatters: [
                                LengthLimitingTextInputFormatter(20),
                              ],
                              decoration: const InputDecoration(
                                hintText: "请输入备注",
                                hintStyle: TextStyle(color: Colors.grey),
                                enabledBorder: UnderlineInputBorder(
                                    borderSide:
                                        BorderSide(color: Colors.white)),
                                focusedBorder: UnderlineInputBorder(
                                    borderSide:
                                        BorderSide(color: Colors.white)),
                              ),
                              onChanged: (newValue) {
                                note = newValue;
                              },
                            )))
                  ],
                )),
          ]),
        ),
      ),
    );
  }
}
