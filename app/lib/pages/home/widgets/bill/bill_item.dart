import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class BillItem extends StatelessWidget {
  final double money;
  final String type;
  final String? note;
  final Function(BuildContext)? onEdit;
  final Function(BuildContext)? onDelete;
  final bool? hasBottomBorder;
  const BillItem(
      {super.key,
      this.onEdit,
      this.onDelete,
      required this.money,
      required this.type,
      this.note,
      this.hasBottomBorder = true});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          border: hasBottomBorder!
              ? BorderDirectional(
                  bottom:
                      BorderSide(color: Theme.of(context).colorScheme.outline))
              : null),
      child: Slidable(
        key: const ValueKey(0),
        endActionPane: ActionPane(
          motion: const ScrollMotion(),
          // dismissible: DismissiblePane(
          //   onDismissed: () {},
          //   closeOnCancel: true,
          //   confirmDismiss: () async {
          //     bool status = false;
          //     await showGeneralDialog(
          //       context: context,
          //       pageBuilder: (BuildContext buildContext,
          //           Animation<double> animation,
          //           Animation<double> secondaryAnimation) {
          //         return TDAlertDialog(
          //           title: "删除警告",
          //           content: "此操作将删除该数据，是否继续?",
          //           rightBtn: TDDialogButtonOptions(
          //             title: "删除",
          //             style: TDButtonStyle(
          //                 backgroundColor: Theme.of(context).colorScheme.error),
          //             action: () {
          //               status = true;
          //             },
          //           ),
          //         );
          //       },
          //     );

          //     return status;
          //   },
          // ),
          children: [
            SlidableAction(
              onPressed: onEdit,
              backgroundColor: Theme.of(context).primaryColor,
              foregroundColor: Colors.white,
              icon: Icons.edit_document,
              label: '编辑',
            ),
            SlidableAction(
              onPressed: (ctx) async {
                await showGeneralDialog(
                  context: context,
                  pageBuilder: (BuildContext buildContext,
                      Animation<double> animation,
                      Animation<double> secondaryAnimation) {
                    return TDAlertDialog(
                      title: "删除警告",
                      content: "此操作将删除该数据，是否继续?",
                      rightBtn: TDDialogButtonOptions(
                        title: "删除",
                        style: TDButtonStyle(
                            backgroundColor:
                                Theme.of(context).colorScheme.error),
                        action: () {
                          if (onDelete != null) {
                            onDelete!(ctx);
                          }
                        },
                      ),
                    );
                  },
                );
              },
              backgroundColor: Theme.of(context).colorScheme.error,
              foregroundColor: Colors.white,
              icon: Icons.delete,
              label: '删除',
            ),
          ],
        ),
        child: ListTile(
          leading: Icon(
            Icons.monetization_on,
            color: type == "INCOME" ? Colors.green : Colors.amber,
          ),
          title: note != null
              ? Text(
                  note!,
                  style: const TextStyle(color: Colors.black38, fontSize: 12),
                )
              : null,
          trailing: Text(
            "$money",
            style: const TextStyle(color: Colors.black, fontSize: 14),
          ),
        ),
      ),
    );
  }
}
