import { RESPONSE_CODE } from "./types.ts";
import { findSystem, updateOneSystem } from "../service/system.ts";
import { RouterContext } from "../deps.ts";
import type { System } from "../db/model.ts";

export const updateSystem = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: System = await body.value;

  const { ok, data } = await updateOneSystem(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "更新成功" : "更新失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询系统信息
 */
export const getSystem = async (ctx: RouterContext<string>) => {
  const { ok, data } = await findSystem();

  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询年级详情
 */
export const getClassesDetails = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await findSystem();
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
