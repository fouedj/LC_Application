import axios, {AxiosResponse} from 'axios';
import {ApiBaseUrl, device} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAccessTokenApi} from '../hooks/useAccessToken';
const bookmarksApi = axios.create({
  baseURL: ApiBaseUrl?.baseUrlBookmarkApi,
  headers: {
    'x-client-source': `classified:${device}:lcpab`,
  },
});

bookmarksApi.interceptors.response.use(
  request => {
    return request;
  },
  async error => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it

    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await getAccessTokenApi(
          {refreshToken: globalThis.refreshToken},
          (token: AxiosResponse) => {
            AsyncStorage.setItem('refreshToken', token.data.refreshToken);
            AsyncStorage.setItem('accessToken', token.data.token);
            globalThis.refreshToken = token.data.refreshToken;
            globalThis.accessToken = token.data.token;
          },
        );
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${globalThis.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  },
);

export default bookmarksApi;
