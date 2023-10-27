import { RESPONSE_CODE } from "./types.ts";
import {
  compareSync,
  create,
  decode,
  getNumericDate,
  hash,
  Header,
  helpers,
  Payload,
  RouterContext,
} from "../deps.ts";
import type { Classes, User } from "../db/model.ts";
import {
  clearUserToken,
  deleteUser,
  findOneUser,
  findUserPage,
  insertUser,
  updateOneUser,
} from "../service/user.ts";
import { JWT_ALG, JWT_KEY } from "../utils/constants.ts";
import {
  getHeaderToken,
  getHeaderTokenUserId,
  removeUserPasswordAndToken,
} from "../utils/tools.ts";
import { findOneClasses } from "../service/classes.ts";

/**
 * 添加
 */
export const addUser = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: User = await body.value;
  playLoad.password = await hash(playLoad.password as string);
  const classTarget = await findOneClasses<Classes>({
    code: playLoad.classCode,
  });
  if (classTarget.ok) {
    playLoad.className = classTarget.data?.name;
  }

  const { ok, data } = await insertUser(playLoad);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "插入成功" : "插入失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const removeUser = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await deleteUser(_id);
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "删除成功" : "删除失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const updateUser = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const playLoad: User = await body.value;
  const _id = getHeaderTokenUserId(ctx);
  let ok = false;
  let data;
  if (_id) {
    const classTarget = await findOneClasses<Classes>({
      code: playLoad.classCode,
    });
    let className;
    if (classTarget.ok) {
      className = classTarget.data?.name;
    }
    const updateRes = await updateOneUser({
      id: _id,
      name: playLoad.name,
      classCode: playLoad.classCode,
      className,
    });
    if (updateRes.ok) {
      const res = await findOneUser({ _id });
      ok = res.ok;
      data = res.data;
    }
  }

  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "更新成功" : "更新失败";

  ctx.response.body = {
    code,
    data: data ? removeUserPasswordAndToken(data) : data,
    msg,
  };
};
/**
 * 查询分页
 */
export const getUserPage = async (ctx: RouterContext<string>) => {
  const query: any = helpers.getQuery(ctx);

  const { ok, data } = await findUserPage(query);
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
export const getUserDetails = async (ctx: RouterContext<string>) => {
  const _id = ctx?.params?.id;

  if (!_id) {
    ctx.response.body = {
      code: RESPONSE_CODE.ERROR,
      msg: "参数id验证错误",
      data: null,
    };
    return;
  }

  const { ok, data } = await findOneUser({ _id });
  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};
export const getUserInfo = async (ctx: RouterContext<string>) => {
  const _id = getHeaderTokenUserId(ctx);
  const { ok, data } = await findOneUser<User>({ _id });

  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "查询成功" : "查询失败";

  ctx.response.body = {
    code,
    data: data ? removeUserPasswordAndToken(data) : data,
    msg,
  };
};
interface LoginUserInfo extends Omit<User, "password"> {
  password: undefined;
}

interface LoginData {
  userInfo: LoginUserInfo;
  token: string;
}
export const login = async (ctx: RouterContext<string>) => {
  const body = ctx.request.body();
  const { username, password, classCode }: {
    username: string;
    password: string;
    classCode: number;
  } = await body.value;

  let { ok, data: user } = await findOneUser<User>({ username });
  // 查不到则报账号密码错误
  ok = ok && !!user;
  let data: LoginData | null = null;
  if (ok && user) {
    const status = compareSync(password, user.password as string);
    ok = status;

    if (ok) {
      const payload: Payload = {
        iss: user.id,
        exp: getNumericDate(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      };
      const header: Header = {
        alg: JWT_ALG,
        typ: "JWT",
      };

      const jwt = await create(header, payload, JWT_KEY);
      ok = (await updateOneUser({
        ...user,
        classCode,
        token: jwt,
      })).ok;

      if (ok) {
        data = {
          userInfo: removeUserPasswordAndToken(user),
          token: jwt,
        };
      }
    }
  }

  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "登录成功" : "账户或密码错误";

  ctx.response.body = {
    code,
    data,
    msg,
  };
};

export const logout = async (ctx: RouterContext<string>) => {
  const token = getHeaderToken(ctx);

  let ok = true;
  // 如果有token则解析出来token的id，如果没有则直接退出成功
  if (token) {
    let id: string | undefined;

    try {
      // 如果解析失败也是退出成功
      const [_, playLoad] = decode(token);
      id = (playLoad as Payload)?.iss;
    } catch (e) {
      console.log("token error", e);
    } finally {
      ok = (await clearUserToken(id)).ok;
    }
  }

  const code = ok ? RESPONSE_CODE.SUCCESS : RESPONSE_CODE.ERROR;
  const msg = ok ? "退出成功" : "退出失败，请稍后重试";

  ctx.response.body = {
    code,
    data: null,
    msg,
  };
};
