import { instance, instanceLogin } from "./ajax";

export const userLoginQRCreateKey = () =>
  instance({
    url: "/login/qr/key",
  });
export const userLoginQR = (key: any) =>
  instance({
    url: "/login/qr/create",
    params: {
      key,
      qrimg: true,
    },
  });
export const userLoginQRCheck = (key: any) =>
  instance({
    url: "/login/qr/check",
    params: {
      key,
      timerstamp: new Date().getTime(),
    },
  });
