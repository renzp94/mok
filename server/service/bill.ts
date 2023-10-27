import type { BillModel } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";
import { DEFAULT_PAGE_CURRENT, DEFAULT_PAGE_SIZE } from "../utils/constants.ts";

const tb = DB_TB.T_BILL;

export const insertOneBill = (data: BillModel) => DB.insertOne(tb, data);

export const deleteOneBill = (id: string) =>
  DB.deleteOne(tb, { _id: DB.ObjectId(id) });

export const updateOneBill = (data: BillModel) => {
  const { id, ...updateData } = data;
  if (!id) {
    return { ok: false, data: null };
  }

  return DB.updateOne(tb, { _id: DB.ObjectId(id) }, updateData);
};

export const findBillPage = (
  params: { pageSize: number; current: number },
) => {
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    current = DEFAULT_PAGE_CURRENT,
    ...filter
  } = params;
  const pagination = DB.getPagination(pageSize, current);

  return DB.find<BillModel>(tb, { ...pagination, filter });
};
export const findBillList = (params: any) => {
  const filter = {
    year: params?.year ? Number(params.year) : undefined,
    month: params?.month ? Number(params.month) : undefined,
  };

  return DB.find<BillModel>(tb, {
    filter,
    limit: Infinity,
    skip: 0,
  });
};

export const findOneBill = <T>(id: string) =>
  DB.findOne<T>(tb, { _id: DB.ObjectId(id) });
