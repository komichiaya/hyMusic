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
      // console.log(res);
      return Promise.resolve(res.data);
    }
    return Promise.reject(res);
  },
  (err: any) => {
    return err;
  }
);

export { instance };
