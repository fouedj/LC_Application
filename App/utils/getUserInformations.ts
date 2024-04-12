import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getIsConnected = () => {
  if (globalThis.refreshToken != null) {
    return true;
  }
  return false;
};

export const getUserMail = () => {
  if (globalThis.refreshToken) {
    const decoded = jwt_decode(globalThis.refreshToken);
    if (
      decoded != null &&
      decoded.loggedUser != null &&
      decoded.loggedUser.username != null
    ) {
      return decoded.loggedUser.username;
    }
  }
  return '';
};

export const getCorrelationId = () => {
  const decoded = jwt_decode(globalThis.refreshToken);
  if (decoded != null && decoded.userCorrelationId != null) {
    return decoded.userCorrelationId;
  }
  return '';
};

export const getRefreshToken = () => {
  if (globalThis.refreshToken) {
    const decoded = jwt_decode(globalThis.refreshToken);

    if (globalThis.refreshToken != null) {
      return globalThis.refreshToken;
    }
  }
  return '';
};

export const getToken = () => {
  if (globalThis.accessToken != null) {
    const decoded = jwt_decode(globalThis.accessToken);
    if (globalThis.accessToken != null) {
      return globalThis.accessToken;
    }
  }
  return '';
};

const removeRefreshTokenFromStore = async () => {
  try {
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('accessToken');
  } catch (e) {
    // saving error
  }
};
