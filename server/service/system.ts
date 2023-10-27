import type { System } from "../db/model.ts";
import DB, { DB_TB } from "../db/db.ts";

const tb = DB_TB.T_SYSTEM;

export const updateOneSystem = (data: System) => {
  const { id, ...updateData } = data;
  return DB.updateOne(tb, { _id: DB.ObjectId(id!) }, updateData);
};
export const findSystem = async () => {
  const { ok, data: [data] } = await DB.find<System[]>(tb, { limit: 1 });
  return { ok, data };
};
