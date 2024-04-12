import searchSavedApi from '../api/searchSavedApi';
import * as Sentry from '@sentry/react-native';
import {AxiosError, AxiosResponse} from 'axios';
import {Platform} from 'react-native';

export const addSearchSaved = async (body, callback) => {
  const {token, searchParams, isOn} = body;

  try {
    const params = searchParams;
    if (isOn && globalThis.notificationDeviceToken) {
      params.channels = [
        {
          gateway: Platform.OS === 'android' ? 'push_fcm' : 'push_ios',
          target: globalThis.notificationDeviceToken,
        },
      ];
    }

    await searchSavedApi
      .post(`me/notifs/search`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response.status);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error, null);
  }
};

export const getSavedSearches = async (body, callback) => {
  const {token} = body;
  try {
    await searchSavedApi
      .get(`me/notifs/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error, null);
  }
};

export const deleteSavedSearch = async (body, callback) => {
  const {token, hash} = body;
  try {
    await searchSavedApi
      .delete(`me/notifs/search/${hash}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error, null);
  }
};

export const addNotifSavedSearch = async (body, callback) => {
  const {token, hash} = body;
  try {
    var params:{[key:string]: string} = {};
    if (globalThis.notificationDeviceToken) {
      params =
        {
          gateway: Platform.OS === 'android' ? 'push_fcm' : 'push_ios',
          target: globalThis.notificationDeviceToken,
        }
    }
    await searchSavedApi
      .post(`me/notifs/search/${hash}/channels`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response.status);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error, null);
  }
};

export const removeNotifSavedSearch = async (body, callback) => {
  const {token, hash, isNotifAdded} = body;
  try {
    const notifType = Platform.OS === 'android' ? 'push_fcm' : 'push_ios';
    await searchSavedApi
      .delete(`me/notifs/search/${hash}/channels/${notifType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (callback) {
          callback(null, response.status);
        }
      })
      .catch((error: AxiosError) => {
        Sentry.captureException(error);
        callback(error, null);
      });
  } catch (error) {
    Sentry.captureException(error);
    callback(error, null);
  }
};