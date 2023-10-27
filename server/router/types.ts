export enum RESPONSE_CODE {
  SUCCESS,
  ERROR,
}

export interface ResponseBody<T = unknown> {
  code: RESPONSE_CODE;
  data: T;
  msg: string;
}
