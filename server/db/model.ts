import { CLASS_CODE } from "../utils/constants.ts";

// 班级
export interface Classes {
  id?: string;
  code: CLASS_CODE;
  name: string;
  cover: string;
}

// 学科
export interface Subject {
  id?: string;
  classes: CLASS_CODE[];
  code: string;
  name: string;
}
// 系统信息
export interface System {
  id?: string;
  // 欢迎页
  welcome: { text: string; image: string }[];
}
export interface User {
  id?: string;
  username?: string;
  password?: string;
  name?: string;
  avatar?: string;
  classCode?: number;
  className?: string;
  token?: string;
}
