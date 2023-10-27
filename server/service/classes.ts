import type { Classes } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";
import { DEFAULT_PAGE_CURRENT, DEFAULT_PAGE_SIZE } from "../utils/constants.ts";

const tb = DB_TB.T_CLASSES;

export const insertOneClasses = (data: Classes) => {
  return DB.insertOne(tb, data);
};
export const deleteOneClasses = (id: string) => {
  return DB.deleteOne(tb, { _id: DB.ObjectId(id) });
};
export const updateOneClasses = (data: Classes) => {
  const { id, ...updateData } = data;
  return DB.updateOne(tb, { _id: DB.ObjectId(id!) }, updateData);
};
export const findClassesPage = (
  params: { pageSize: number; current: number },
) => {
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    current = DEFAULT_PAGE_CURRENT,
    ...rest
  } = params;
  const pagination = DB.getPagination(pageSize, current);

  return DB.find<Classes[]>(tb, { ...pagination, ...rest });
};
export const findClassesList = () => {
  return findClassesPage({ pageSize: Infinity, current: 1 });
};
export const findOneClasses = <T>(params: Record<string, any>) => {
  if (params?._id) {
    params._id = DB.ObjectId(params._id);
  }
  return DB.findOne<T>(tb, params);
};
