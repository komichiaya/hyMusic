import axios from "axios";

const instance = axios.create({
  baseURL: "/music",
  timeout: 20000,
});
instance.interceptors.request.use((res: any) => {
  return res;
});
instance.interceptors.response.use(
  (res: any) => {
    if (res.status == 0 || res.status == 200) {
      // code值为 0 或 200 时视为成功
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (err: any) => {
    return err;
  }
);
const instanceLogin = axios.create({
  baseURL: "/login",
  timeout: 20000,
});
instanceLogin.interceptors.request.use((res: any) => {
  return res;
});
instanceLogin.interceptors.response.use(
  (res: any) => {
    if (res.status == 0 || res.status == 200) {
      // code值为 0 或 200 时视为成功
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (err: any) => {
    return err;
  }
);
export { instance, instanceLogin };
