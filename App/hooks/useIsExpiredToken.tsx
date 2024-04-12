import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {Box, Text} from '../components';
import {WarningIcon} from '../components/Icon';
import mainStyles from '../styles/styles';
import {getRefreshToken, getToken} from '../utils/getUserInformations';
import {isTokenExpired} from '../utils/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAccessTokenApi} from './useAccessToken';
import {AxiosResponse} from 'axios';
import {WebViewUrlsHelpers} from '../config/constants';

const useIsExpiredToken = (webViewRef: any) => {
  const accessToken = getToken();
  const refreshToken = getRefreshToken();

  React.useEffect(() => {
    let isExpiredAccessToken = isTokenExpired(accessToken);
    let isExpiredRefreshToken = isTokenExpired(refreshToken);

    if (isExpiredRefreshToken) {
      showMessage({
        renderCustomContent: () => (
          //i will refaco this after when i have time
          <Box
            // eslint-disable-next-line react-native/no-inline-styles
            style={mainStyles.toastSuccess}>
            <Box className="mr-[8]">
              <WarningIcon />
            </Box>
            <Box>
              <Text style={mainStyles.toastText}>Vous avez été déconnecté</Text>
            </Box>
          </Box>
        ),
        message: '',
        backgroundColor: 'transparent',
        duration: 3500,
      });
      if (isExpiredRefreshToken) {
        // remove token form localstorage
        AsyncStorage.removeItem('refreshToken');
        AsyncStorage.removeItem('accessToken');
        globalThis.accessToken = null;
        globalThis.refreshToken = null;
        webViewRef.current?.injectJavaScript(
          `var nomDuCookie = 'access-token'; 
          document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
          var nomDuCookie = 'refresh-token'; 
          document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
          window.location.href=("${WebViewUrlsHelpers?.filtersPage}");`,
        );
      }
      if (isExpiredAccessToken && !isExpiredRefreshToken) {
        getAccessTokenApi(
          {refreshToken: globalThis.refreshToken},

          (token: AxiosResponse) => {
            AsyncStorage.setItem('refreshToken', token.data.refreshToken);
            AsyncStorage.setItem('accessToken', token.data.token);
            globalThis.refreshToken = token.data.refreshToken;
            globalThis.accessToken = token.data.token;
          },
        );
      }
    }
  }, [accessToken, refreshToken]);
};
export default useIsExpiredToken;
