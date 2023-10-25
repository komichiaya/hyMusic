import instance, { http } from "./ajax";
import { LoginRes } from "./type";
export const userLoginQRCreateKey = () =>
  instance({
    url: "/login/qr/key",
  });
export const userLoginQR = (key: any) =>
  http.get<LoginRes>("/login/qr/create", {
    params: {
      key,
      qrimg: true,
    },
  });
export const userLoginQRCheck = (key: any) =>
  http.get("/login/qr/check", {
    params: {
      key,
      timerstamp: new Date().getTime(),
    },
  });
export const getAccount = () => http.get("/user/account");
export const getUserDetail = (uid: string | number) =>
  http.get("/user/detail", {
    params: {
      uid,
    },
  });
export const logout = () => http.get("/logout");
