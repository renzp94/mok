import type { UserModel } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";
import { DEFAULT_PAGE_CURRENT, DEFAULT_PAGE_SIZE } from "../utils/constants.ts";

const tb = DB_TB.T_USER;

export const insertUser = (data: UserModel) => {
  return DB.insertOne<UserModel>(tb, data);
};
export const deleteUser = (id: string) => {
  return DB.deleteOne(tb, { _id: DB.ObjectId(id) });
};
export const updateOneUser = (data: UserModel) => {
  const { id, ...updateData } = data;
  return DB.updateOne(tb, { _id: DB.ObjectId(id!) }, updateData);
};
export const clearUserToken = (id?: string) => {
  return id
    ? DB.updateOne(tb, { _id: DB.ObjectId(id) }, { token: "" })
    : { ok: true, data: null };
};
export const findUserPage = (
  params: { pageSize: number; current: number },
) => {
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    current = DEFAULT_PAGE_CURRENT,
    ...rest
  } = params;
  const pagination = DB.getPagination(pageSize, current);

  return DB.find<UserModel[]>(tb, { ...pagination, ...rest });
};
export const findOneUser = <T>(params: Record<string, any>) => {
  if (params?._id) {
    params._id = DB.ObjectId(params._id);
  }
  return DB.findOne<T>(tb, params);
};
