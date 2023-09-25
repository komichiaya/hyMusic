import { instance, instanceLogin } from "./ajax";

export const getCode = () =>
  instanceLogin({
    responseType: "blob",
    url: `/common/image_code.jsp?tiem=${new Date().getTime()}`,
  });
export const login = (data: any) =>
  instanceLogin({
    url: "/ajax/login",
    method: "POST",
    responseType: "json",
    headers: {
      "Content- Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data,
  });
