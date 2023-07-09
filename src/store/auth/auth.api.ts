import axiosBaseQuery from 'config/axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import { REDUCER_PATHS } from 'store/constants';
import { AUTH_API } from 'constants/api';

const authApi = createApi({
  reducerPath: REDUCER_PATHS.AUTH,
  baseQuery: axiosBaseQuery(AUTH_API.login.api),
  keepUnusedDataFor: 10,
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (data: { email: string; password: string }) => {
        const { email, password } = data;
        return {
          method: 'POST',
          data: {
            email,
            password,
          },
          headers: {},
        };
      },
      transformResponse: (response) => {
        return response;
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),
  }),
});

export default authApi;
