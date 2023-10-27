export const BASE_URL = "/api";
export const PORT = 4000;

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_CURRENT = 1;

export const JWT_KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
export const JWT_ALG = "HS512";
