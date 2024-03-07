import { loadEnv } from "../utils/tools.ts";

const {
  DB_API_URL,
  DB_DATA_API_KEY,
  DB_DATA_BASE,
  DB_DATA_SOURCE,
} = loadEnv();

const defaultBody = {
  dataSource: DB_DATA_SOURCE,
  database: DB_DATA_BASE,
};

const headers = {
  "Content-Type": "application/json",
  "api-key": DB_DATA_API_KEY,
};

// 数据表
export enum DB_TB {
  T_BILL = "t_bill",
  T_USER = "t_user",
}

export type DBResponse<T> = Promise<{
  ok: boolean;
  data: T;
}>;

const replace_id = <T>(data?: any): T => {
  const { _id, ...rest } = data;

  return {
    id: _id,
    ...rest,
  } as T;
};

export default class DB {
  /**
   * 插入单条数据
   * @param tb 数据表
   * @param data 插入的数据
   * @returns 返回插入结果
   */
  static insertOne<T>(
    tb: string,
    document: T,
  ): DBResponse<{ insertedId: string } | null> {
    return this.#run({
      action: "insertOne",
      collection: tb,
      params: { document },
    });
  }
  /**
   * 插入多条数据
   * @param tb 数据表
   * @param data 插入的数据
   * @returns 返回插入结果
   */
  static insertMany<T>(tb: string, documents: T[]): DBResponse<unknown> {
    return this.#run({
      action: "insertMany",
      collection: tb,
      params: { documents },
    });
  }
  static #delete(
    action: "deleteOne" | "deleteMany",
    tb: string,
    filter: Record<string, unknown>,
  ): DBResponse<unknown> {
    return this.#run({
      action,
      collection: tb,
      params: { filter },
    });
  }
  /**
   * 删除单条数据
   * @param tb 数据表
   * @param filter 删除参数
   * @returns 返回删除结果
   */
  static deleteOne(
    tb: string,
    filter: Record<string, unknown>,
  ): DBResponse<unknown> {
    return this.#delete("deleteOne", tb, filter);
  }
  /**
   * 删除多条数据
   * @param tb 数据表
   * @param filter 删除参数
   * @returns 返回删除结果
   */
  static deleteMany<T>(
    tb: string,
    filter: Record<string, unknown>,
  ): DBResponse<unknown> {
    return this.#delete("deleteMany", tb, filter);
  }
  static #update<T>(
    action: "updateOne" | "updateMany",
    tb: string,
    filter: Record<string, unknown>,
    data: Record<string, unknown>,
  ) {
    return this.#run({
      action,
      collection: tb,
      params: { filter, update: { "$set": data } },
    });
  }
  /**
   * 更新单条数据
   * @param tb 数据表
   * @param filter 更新参数
   * @param data 更新内容
   * @returns 返回更新结果
   */
  static updateOne<T>(
    tb: string,
    filter: Record<string, unknown>,
    data: Record<string, unknown>,
  ) {
    return this.#update("updateOne", tb, filter, data);
  }
  /**
   * 更新多条数据
   * @param tb 数据表
   * @param filter 更新参数
   * @param data 更新内容
   * @returns 返回更新结果
   */
  static updateMany<T>(
    tb: string,
    filter: Record<string, unknown>,
    data: Record<string, unknown>,
  ) {
    return this.#update("updateMany", tb, filter, data);
  }
  /**
   * 查找单条数据
   * @param tb 数据表
   * @param filter 查找参数
   * @returns 返回查找结果
   */
  static async findOne<T>(
    tb: string,
    filter: Record<string, unknown>,
  ): DBResponse<T | null> {
    const { ok, data } = await this.#run<{ document: T }>({
      action: "findOne",
      collection: tb,
      params: { filter },
    });

    return {
      ok,
      data: data?.document ? replace_id(data.document) : null,
    };
  }
  /**
   * 查找多条数据
   * @param tb 数据表
   * @param params 查找参数
   * @returns 返回查找结果
   */
  static async find<T>(tb: string, params: {
    filter?: Record<string, unknown>;
    sort?: Record<string, string>;
    limit?: number;
    skip?: number;
  }): DBResponse<T[]> {
    const { ok, data } = await this.#run<{ documents: T[] }>({
      action: "find",
      collection: tb,
      params,
    });

    return {
      ok,
      data: data?.documents
        ? data?.documents?.map((item) => replace_id<T>(item))
        : [],
    };
  }
  /**
   * 执行db命令
   * @param param0 命令参数
   * @returns
   */
  static async #run<T>(
    { action, collection, params }: {
      action: string;
      collection: string;
      params?: Record<string, unknown>;
    },
  ) {
    const URL = `${DB_API_URL}/${action}`;
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...defaultBody,
        collection,
        ...params,
      }),
    };

    const result = await fetch(URL, options);
    return this.#readJson<T>(result);
  }
  /**
   * 读取json数据
   * @param result fetch返回结果
   * @returns {ok: boolean, data: T}
   */
  static async #readJson<T>(result: Response) {
    const ok = result.ok;
    const data = ok ? (await result.json()) as T : null;

    return {
      ok,
      data,
    };
  }
  static ObjectId(id: string) {
    return { "$oid": id };
  }
  static getPagination(pageSize: number, current: number) {
    const limit = Number(pageSize);
    const skip = Number(pageSize) * Number(current - 1);
    return { limit, skip };
  }
}
