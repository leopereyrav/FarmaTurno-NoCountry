//RTK query sirve para manejar estados haciendo llamass apis evinyando usar thunks etc, lo que reduce la cantidad de codigos

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const companyName = sessionStorage.getItem('companyName');
export const companySlices = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}api`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        // include token in req header
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCompanyByName: build.query({
      query: () => `/pharmacy/${companyName}`,
      providesTags: ['company'],
    }),
  }),
});

export const { useGetCompanyByNameQuery } = companySlices;
