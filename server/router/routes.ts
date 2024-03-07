import { Router } from "../deps.ts";
import { BASE_URL } from "../utils/constants.ts";

import { login, logout, register, weappLogin } from "./user.ts";
import {
  addBill,
  getBillDetails,
  getBillList,
  removeBill,
  updateBill,
} from "./bill.ts";

const router = new Router({ prefix: BASE_URL });

// 账单
router
  .post("/app/bill", addBill)
  .delete("/app/bill/:id", removeBill)
  .put("/app/bill", updateBill)
  .get("/app/bills", getBillList)
  .get("/app/bill/:id", getBillDetails);

router
  .post("/app/user/weappLogin", weappLogin)
  .post("/app/user/register", register)
  .post("/app/user/login", login)
  .post("/app/user/logout", logout);

export default router;
