import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
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
/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.post(url, data, config);
  },
  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config);
  },
};

export default instance;
