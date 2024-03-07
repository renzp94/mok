import {
  decode,
  existsSync,
  loadEnvSync,
  type Payload,
  type RouterContext,
} from "../deps.ts";
import type { UserModel } from "../db/model.ts";
/**
 * 从路由上下文中获取token
 * @param ctx 路由上下文
 * @returns 返回获取的token
 */
export const getHeaderToken = (ctx: RouterContext<string>) => {
  const authorization = ctx.request.headers.get("authorization");
  return authorization?.replace("Bearer ", "");
};
/**
 * 从路由上下文中获取token并解析出来id
 * @param ctx 路由上下文
 * @returns 返回获取的id
 */
export const getHeaderTokenUserId = (ctx: RouterContext<string>) => {
  const authorization = ctx.request.headers.get("authorization");
  const token = authorization?.replace("Bearer ", "");
  let id;
  try {
    if (token) {
      const [_, playLoad] = decode(token);
      id = (playLoad as Payload)?.iss;
    }
  } catch {
    return id;
  }

  return id;
};
export const removeUserOpenidAndToken = (data: UserModel) => {
  return {
    ...data,
    openid: undefined,
    token: undefined,
  };
};
export const removeUserPasswordAndToken = (data: UserModel) => {
  return {
    ...data,
    password: undefined,
    token: undefined,
  };
};

export const loadEnv = () => {
  const hasEnvFile = existsSync("./.env");
  return hasEnvFile ? loadEnvSync() : Deno.env.toObject();
};
