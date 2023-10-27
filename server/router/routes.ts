import {
  addClasses,
  getClassesDetails,
  getClassesList,
  getClassesPage,
  removeClasses,
  updateClasses,
} from "./classes.ts";
import { Router } from "../deps.ts";
import { BASE_URL } from "../utils/constants.ts";
import {
  addSubject,
  getSubjectDetails,
  getSubjectList,
  getSubjectPage,
  removeSubject,
  updateSubject,
} from "./subject.ts";
import { getSystem, updateSystem } from "./system.ts";
import {
  addUser,
  getUserDetails,
  getUserInfo,
  getUserPage,
  login,
  logout,
  removeUser,
  updateUser,
} from "./user.ts";

const router = new Router({ prefix: BASE_URL });

router
  .post("/classes", addClasses)
  .delete("/classes/:id", removeClasses)
  .put("/classes", updateClasses)
  .get("/classes/page", getClassesPage)
  .get("/classes/:id", getClassesDetails);

router
  .post("/subject", addSubject)
  .delete("/subject/:id", removeSubject)
  .put("/subject", updateSubject)
  .get("/subject/page", getSubjectPage)
  .get("/subject/:id", getSubjectDetails);

router
  .put("/system", updateSystem);

router
  .post("/user", addUser)
  .delete("/user/:id", removeUser)
  .get("/user/page", getUserPage)
  .get("/user/:id", getUserDetails);

router
  .get("/app/classes/list", getClassesList)
  .get("/app/subject/list", getSubjectList)
  .post("/app/login", login)
  .post("/app/logout", logout)
  .get("/app/user/userInfo", getUserInfo)
  .put("/app/user", updateUser)
  .get("/app/system", getSystem);

export default router;
