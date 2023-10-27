export const BASE_URL = "/api";
export const PORT = 4000;
/** 班级编码 */
export enum CLASS_CODE {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  FIX,
}
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_CURRENT = 1;

export const DATA_API_KEY =
  "PdACu2i9XWUJrORWou6XahzYnrSi2TZwBkZoo4sw20Rbzw3F94oYzWNtTyjmvgjc";
export const APP_ID = "data-jxxxr";
export const DATA_SOURCE = "mok";
export const DATA_BASE = "mok";

export const JWT_KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
export const JWT_ALG = "HS512";
