import { RESPONSE_CODE } from "./types.ts";
import {
  deleteOneClasses,
  findClassesList,
  findClassesPage,
  findOneClasses,
  insertOneClasses,
  updateOneClasses,
} from "../service/classes.ts";
import { helpers, RouterContext } from "../deps.ts";
import type { Classes } from "../db/model.ts";

/**
 * 添加年级数据
 */
export const addClasses = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: Classes = await body.value;

  const { ok, data } = await insertOneClasses(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "插入成功" : "插入失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const removeClasses = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await deleteOneClasses(_id);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "删除成功" : "删除失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const updateClasses = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: Classes = await body.value;

  const { ok, data } = await updateOneClasses(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "更新成功" : "更新失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询年级分页数据
 */
export const getClassesPage = async (ctx: RouterContext<string>) => {
  const query: any = helpers.getQuery(ctx);

  const { ok, data } = await findClassesPage(query);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询年级所有数据
 */
export const getClassesList = async (ctx: RouterContext<string>) => {
  const { ok, data } = await findClassesList();
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

  const { ok, data } = await findOneClasses({ _id });
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
