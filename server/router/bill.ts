import { RESPONSE_CODE } from "./types.ts";
import {
  deleteOneBill,
  findBillList,
  findBillPage,
  findOneBill,
  insertOneBill,
  updateOneBill,
} from "../service/bill.ts";
import { helpers, type RouterContext } from "../deps.ts";
import type { BillModel } from "../db/model.ts";

/**
 * 添加账单
 */
export const addBill = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: BillModel = await body.value;

  const { ok, data } = await insertOneBill(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "添加成功" : "添加失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 删除账单
 */
export const removeBill = async (ctx: RouterContext<string>) => {
  const id = ctx?.params?.id;

  if (!id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await deleteOneBill(id);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "删除成功" : "删除失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 更新账单
 */
export const updateBill = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: BillModel = await body.value;

  const { ok, data } = await updateOneBill(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "编辑成功" : "编辑失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询分页数据
 */
export const getBillPage = async (ctx: RouterContext<string>) => {
  const query: any = helpers.getQuery(ctx);

  const { ok, data } = await findBillPage(query);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询无分页数据
 */
export const getBillList = async (ctx: RouterContext<string>) => {
  const query: any = helpers.getQuery(ctx);

  const { ok, data } = await findBillList(query);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询详情
 */
export const getBillDetails = async (ctx: RouterContext<string>) => {
  const id = ctx?.params?.id;

  if (!id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await findOneBill(id);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
