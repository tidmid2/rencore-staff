import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../features/auth/authSlice';
import { showSnackbar } from '../features/ui/uiSlice';

const auth = localStorage.getItem('x-access-token');
const baseQuery = fetchBaseQuery({ baseUrl: '/api' })

const baseQueryWithLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // Session expired - log out the UI
    api.dispatch(logOut()) // Clear Redux store
    api.dispatch(showSnackbar({
      message: 'Срок действия сеанса истек. Пожалуйста, войдите снова.',
      severity: 'success'
    }));
  }
  return result
}

export const api = createApi({
    baseQuery: baseQueryWithLogout,
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      auth: builder.mutation({
        query: (credentials) => ({
          url: '/auth',
          method: 'POST',
          body: credentials,
          headers: {
            'x-access-token': auth,
          }
        }),
      }),
      signup: builder.mutation({
        query: (user) => ({
          url: '/auth/signup',
          method: 'POST',
          body: user,
        }),
      }),
      updatePass: builder.mutation({
        query: (credentials) => ({
          url: `/auth/reset-password`,
          method: 'POST',
          body: credentials,
        }),
      }),
      reset: builder.mutation({
        query: (email) => ({
          url: '/auth/forgot-pass',
          method: 'POST',
          body: email,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
      }),
      getSecretMsg: builder.query({
        query: () => '/data/secret',
      }),
      document: builder.mutation({
        query: (uid) => ({
          url: '/document/add',
          method: 'POST',
          body: uid,
        }),
      }),
    }),
})

export const { 
      useLoginMutation, 
      useAuthMutation,
      useSignupMutation, 
      useUpdatePassMutation,
      useResetMutation,
      useLogoutMutation,
      useGetSecretMsgQuery,
      useDocumentMutation,
} = api;