import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import ROUTE from 'routers/routes';
import { HTTP_STATUS, TOKEN } from '../constants';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosConfig.interceptors.request.use((config: any) => {
  const token = Cookies.get(TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error;
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZE: {
        Cookies.remove(TOKEN);
        window.location.href = `${window.location.origin}${ROUTE.login.path}`;

        return;
      }
      case HTTP_STATUS.SERVER_ERROR: {
        return Promise.reject({ message: 'Internal Server Error' });
      }
      default:
        break;
    }
  }
);

const { CancelToken } = axios;
const { isCancel } = axios;

const axiosBaseQuery =
  (url: string): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async (axiosRequestConfig) => {
    try {
      const result = await axiosConfig({
        url,

        baseURL: process.env.REACT_APP_BACKEND_URL,

        ...axiosRequestConfig,
      });

      return {
        data: result,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { isCancel, CancelToken };

export default axiosBaseQuery;
