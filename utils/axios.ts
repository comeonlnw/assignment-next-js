import {
  deleteAccessToken,
  getAccessToken,
} from "@/services/auth/auth.service";
import useUserStore from "@/storages/user";
import axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      if (config.headers) {
        config.headers["Content-Type"] = "application/json";
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      await deleteAccessToken();
      useUserStore.getState().clearUsername();
    }
    return Promise.reject(error);
  }
);

export const axiosInstancePublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosInstance;
