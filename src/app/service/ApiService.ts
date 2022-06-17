import { useNavigate } from "react-router";
import { createNotification } from "../utils/MessageUtil";
import { ROUTE } from "./../contant/Contant";
import { getToken } from "./StorageService";

const BASE_URL_DEV = "http://localhost:3001/";
export interface ResponseType<T> {
  status: number;
  code: number;
  message: string;
  data: any;
}

const createAPI = () => {
  const APIInstant = require("axios").default.create();
  APIInstant.defaults.baseURL = BASE_URL_DEV;
  APIInstant.defaults.timeout = 20000;
  APIInstant.defaults.headers = { "Content-Type": "application/json" };
  APIInstant.interceptors.request.use(async (config: any) => {
    config.headers.token = getToken() || "";
    return config;
  }, Promise.reject);

  APIInstant.interceptors.response.use((response: ResponseType<any>) => {
    const data = response.data;
    if (data && data?.code === 403) {
      createNotification({
        type: "warning",
        message: "Vui lòng đăng nhập lại",
      });
      const navigate = useNavigate();
      localStorage.clear();
      navigate(ROUTE.LOGIN);
    } else if (data && data.status !== 1)
      createNotification({ type: "warning", message: data.message });
    return response;
  });
  return APIInstant;
};

const axiosClient = createAPI();

/* Support function */
function handleResult<T>(api: any) {
  return api.then((res: any) => {
    return handleResponse<T>(res.data);
  });
}

function handleResponse<T>(data: ResponseType<T>) {
  if (data.status !== 1)
    return Promise.reject(new Error(data?.message || "Co loi xay ra"));
  return Promise.resolve(data);
}

export const ApiClient = {
  get: (url: string, payload: any) =>
    handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload: any) =>
    handleResult(axiosClient.post(url, payload)),
  put: (url: string, payload: any) =>
    handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload: any) =>
    handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload: any) =>
    handleResult(axiosClient.delete(url, { data: payload })),
};
