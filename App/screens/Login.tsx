import React, {useCallback, useEffect, useRef} from 'react';
import {Box, IconButton} from '../components';
import {PagesToOpenInInAppBrowser, WebViewUrlsHelpers} from '../config/constants';

import LCWebView from '../components/CustomWebView';
import {CloseIcon} from '../components/Icon';
import * as Sentry from '@sentry/react-native';
import WebView from 'react-native-webview';
import {getCookie} from '../utils/functionString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserState from '../recoil/connectedUser';
import {Platform} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {FavoriteState} from '../recoil';
import {addUserCategory} from '../utils/tagCommander';
import classNames from 'classnames';
import { openInAppBrowser } from '../utils/inAppBrowser';

export default function Login({navigation}: any) {
  const webViewRef = useRef<WebView>(null);
  const [key, _] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const route: any = useRoute();
  const setFavorieStateChange = FavoriteState.useSetFavorieStateChange();
  const INJECTJS = 'window.ReactNativeWebView.postMessage(document.cookie)';
  const webViewRefListing: any = FavoriteState?.useGetWebViewRefListing();
  const setLoginPageState = UserState.useSetActiveAccountTabPage();
  const _renderCookies = event => {
    let cookie = event?.nativeEvent?.data;
    if (cookie.includes('access-token') && cookie.includes('refresh-token')) {
      setIsLoading(false);
      // if connected
      const accessToken = getCookie(cookie, 'access-token');
      const refreshToken = getCookie(cookie, 'refresh-token');
      storeData(refreshToken, accessToken);
      globalThis.refreshToken = refreshToken;
      globalThis.accessToken = accessToken;

      addUserCategory('particulier');
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <IconButton
          icon={<CloseIcon />}
          onPress={() => {
            const isElegiblePreviousScreen =
              route?.params?.lastScreen === 'Sell' ||
              route?.params?.lastScreen === 'Listing';
            if (isElegiblePreviousScreen) {
              navigation.canGoBack() && navigation?.goBack();
            } else {
              setLoginPageState('ACCOUNT');
            } //we will need to use this
          }}
        />
      ),
    });
  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      return () => {
        setLoginPageState('ACCOUNT');
      };
    }, []),
  );

  const storeData = async (refreshToken: string, accessToken: string) => {
    try {
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('accessToken', accessToken);
      const isElegiblePreviousScreen =
        route?.params?.lastScreen === 'Sell' ||
        route?.params?.lastScreen === 'Listing';
      if (isElegiblePreviousScreen) {
        navigation.canGoBack() && navigation?.goBack();
      } else {
        //navigation.navigate('Filters') // when connected from account page, we go back to the filters page
        setLoginPageState('ACCOUNT');
      } //we will need to use this
    } catch (e) {
      // saving error
    }
  };

  return (
    <Box testID="favoriteId" className={classNames({
      'opacity-0': isLoading,
      'flex-1': true,
    })}>
      <LCWebView
        testID="filters-Announce-webview"
        key={key}
        screen="login"
        ref={webViewRef}
        hasLoadingSpinner={false}
        injectedJavaScript={INJECTJS}
        onMessage={_renderCookies}
        url={WebViewUrlsHelpers?.authenticationApp}
        onShouldStartLoadWithRequest={(state: any) => {
          const {url} = state;
          if (
            PagesToOpenInInAppBrowser.some(urlToCatch =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          } else if (url === WebViewUrlsHelpers.baseUrlAuth) {
            try {
              if (Platform.OS === 'ios') {
                setTimeout(() => {
                  setLoginPageState('ACCOUNT');
                }, 1500);
                webViewRef?.current?.injectJavaScript(
                  ` window.location.reload()`,
                );
                if (webViewRefListing) {
                  setFavorieStateChange(true);
                }
              } else {
                webViewRef?.current?.injectJavaScript(
                  ` window.location.reload()`,
                );
                setFavorieStateChange(true);
                setTimeout(() => {
                  setLoginPageState('ACCOUNT');
                }, 3500);
              }
            } catch (e: any) {
              Sentry.captureMessage('Login:onShouldStartLoadWithRequest', e);
            }
          }

          return true;
        }}
      />
    </Box>
  );
}
