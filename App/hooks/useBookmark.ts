import {AxiosError, AxiosResponse} from 'axios';
import bookMarkApi from '../api/bookMarkApi';
import * as Sentry from '@sentry/react-native';

export const getFavoriteBookmarks = async (body: any = null) => {
  return new Promise(async (resolve, reject) => {
    const {token} = body;
    try {
      bookMarkApi.interceptors.request.use((req, res) => {
        return req;
      });
      await bookMarkApi
        .get('me/classified-bookmarks', {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          resolve(response?.data);
        })
        .catch(async (error: AxiosError) => {
          //add the listner when the error will be detected "lorsque le token est expiré"

          if (error && error.message) {
            if (error?.message?.includes('403')) {
            } else {
              Sentry.captureException(error);
              return reject(error);
            }
          }
        });
    } catch (err) {
      return reject(err);
    }
  });
};
export const addFavoriteBookmark = async (body, callback) => {
  const {token, reference} = body;
  try {
    bookMarkApi.interceptors.request.use(request => {
      return request;
    });
    const params = body;

    await bookMarkApi
      .put(`me/classified-bookmarks/${reference}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (callback) {
          callback(response);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error);
  }
};
export const removeFavoriteBookmark = async (body, callback) => {
  const {token, reference} = body;
  try {
    bookMarkApi.interceptors.request.use(request => request);

    await bookMarkApi
      .delete(`me/classified-bookmarks/${reference}?reference=${reference}`, {
        headers: {
          Authorization: `Bearer ${encodeURIComponent(token)}`,
        },
      })
      .then(response => {
        if (callback) {
          callback(response);
        }
      })
      .catch((error: AxiosError) => {
        callback(error);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error);
  }
};
export const removeFavoriteBookmarks = async (body, callback) => {
  const {token, data} = body;

  try {
    bookMarkApi.interceptors.request.use(request => request);

    await bookMarkApi
      .post(
        'me/classified-bookmarks/batch-delete',
        {data},
        {
          headers: {
            Authorization: `Bearer ${encodeURIComponent(token)}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response?.data);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error);
  }
};
export const getLocalFavorites = async (
  body,
  callback,
  onFinish = () => {},
) => {
  const {references} = body;
  try {
    bookMarkApi.interceptors.request.use(request => {
      return request;
    });

    await bookMarkApi
      .get(`me/classifieds/hydrate`, {
        params: {
          refs: references,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(response);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error);
      })
      .finally(() => {
        onFinish();
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error);
  }
};
