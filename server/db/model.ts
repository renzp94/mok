export interface UserModel {
  id?: string;
  openid?: string;
  // 用户昵称
  nickName: string;
  // 性别 0: 男 1: 女
  gender?: string;
  // 头像
  avatarUrl?: string;
  token?: string;
  // 账号
  username?: string;
  // 密码
  password?: string;
}

enum BILL_TYPE {
  INCOME = "INCOME",
  SPENDING = "SPENDING",
}
// 账单
export interface BillModel {
  id?: string;
  type: BILL_TYPE;
  year: number;
  month: number;
  day: number;
  money: number;
  // 备注
  note?: string;
}
