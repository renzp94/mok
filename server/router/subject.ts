import { RESPONSE_CODE } from "./types.ts";
import {
  deleteOneSubject,
  findOneSubject,
  findSubjectList,
  findSubjectPage,
  insertOneSubject,
  updateOneSubject,
} from "../service/subject.ts";
import { helpers, RouterContext } from "../deps.ts";
import type { Subject } from "../db/model.ts";

/**
 * 添加学科数据
 */
export const addSubject = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: Subject = await body.value;

  const { ok, data } = await insertOneSubject(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "插入成功" : "插入失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const removeSubject = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await deleteOneSubject(_id);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "删除成功" : "删除失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const updateSubject = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: Subject = await body.value;

  const { ok, data } = await updateOneSubject(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "更新成功" : "更新失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询学科分页数据
 */
export const getSubjectPage = async (ctx: RouterContext<string>) => {
  const query: any = helpers.getQuery(ctx);

  const { ok, data } = await findSubjectPage(query);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询学科所有数据
 */
export const getSubjectList = async (ctx: RouterContext<string>) => {
  const { ok, data } = await findSubjectList();
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
/**
 * 查询学科详情
 */
export const getSubjectDetails = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await findOneSubject({ _id });
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
