import type { UserModel } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";

const tb = DB_TB.T_USER;

export const insertUser = (data: UserModel) => {
  return DB.insertOne<UserModel>(tb, data);
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
export const findOneUser = <T>(params: Record<string, any>) => {
  if (params?._id) {
    params._id = DB.ObjectId(params._id);
  }
  return DB.findOne<T>(tb, params);
};
