import type { Subject } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";
import { DEFAULT_PAGE_CURRENT, DEFAULT_PAGE_SIZE } from "../utils/constants.ts";

const tb = DB_TB.T_SUBJECT;

export const insertOneSubject = (data: Subject) => {
  return DB.insertOne(tb, data);
};
export const deleteOneSubject = (id: string) => {
  return DB.deleteOne(tb, { _id: DB.ObjectId(id) });
};
export const updateOneSubject = (data: Subject) => {
  const { id, ...updateData } = data;
  return DB.updateOne(tb, { _id: DB.ObjectId(id!) }, updateData);
};
export const findSubjectPage = (
  params: { pageSize: number; current: number },
) => {
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    current = DEFAULT_PAGE_CURRENT,
    ...rest
  } = params;
  const pagination = DB.getPagination(pageSize, current);

  return DB.find<Subject[]>(tb, { ...pagination, ...rest });
};
export const findSubjectList = () => {
  return findSubjectPage({ pageSize: Infinity, current: 1 });
};
export const findOneSubject = (params: Record<string, any>) => {
  if (params?._id) {
    params._id = DB.ObjectId(params._id);
  }
  return DB.findOne(tb, params);
};
