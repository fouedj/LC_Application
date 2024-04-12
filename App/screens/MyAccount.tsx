import React, {useRef, useState} from 'react';
import {Box, LCWebView, LoginUser, MenuItem, Text} from '../components';
import colors from '../styles/colors';
import mainStyles from '../styles/styles';
import {INJECT_BOOKMARKS_ONLY, myAccount} from '../config/constantString';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {titleButtons} from '../config/constantString';
import {useIsFocused} from '@react-navigation/native';

import {getUserMail, getIsConnected} from '../utils/getUserInformations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavoriteState} from '../recoil';

import {
  sendPageMyAccountHome,
  sendClickOnDisconnectMyAccountPage,
  sendClickOnConnectMyAccountPage,
  removeUserCategory,
} from '../utils/tagCommander';
import UserState from '../recoil/connectedUser';
import WebView from 'react-native-webview';
import {WebViewUrlsHelpers} from '../config/constants';
import * as Sentry from '@sentry/react-native';
export default function MyAccount({navigation}: {navigation: any}) {
  const [isConnected, setIsConnected] = useState(getIsConnected());
  const isFocused = useIsFocused();
  const connectedState = getIsConnected();
  const favorites = FavoriteState?.useGet()?.favoriteConnected;
  const favoritesNotConnected = FavoriteState?.useGet()?.favoriteNotConnected;
  const webviewRefListing = FavoriteState.useGetWebViewRefListing();
  const webviewRefFilters = FavoriteState.useGetWebViewRefFilter();
  const setFavorites = FavoriteState?.useSet();
  const setLoginPageState = UserState.useSetActiveAccountTabPage();
  const webViewRef = useRef<WebView>(null);
  const [key, _] = React.useState(0);
  React.useEffect(() => {
    if (isFocused) {
      sendPageMyAccountHome();
      if (globalThis.refreshToken == null) {
        setIsConnected(false);
      } else if (connectedState) {
        setIsConnected(true);
      }
    }
  }, [isFocused, navigation]);

  const removeRefreshTokenFromStore = async () => {
    try {
      let firstExecute = false;

      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('accessToken');
      if (favorites && favorites.length !== 0) {
        setFavorites(prev => ({
          ...prev,
          //favoriteNotConnected: [],
          favoriteConnected: [],
        }));
        firstExecute = true;
        if (webviewRefListing && firstExecute) {
          webviewRefListing.injectJavaScript(INJECT_BOOKMARKS_ONLY);

          webviewRefListing?.reload();
        }
        if (webviewRefFilters) {
          webviewRefFilters?.reload();
        }
      }
    } catch (e: any) {
      Sentry.captureMessage('MyAccount:removeRefreshTokenFromStore', e);
      console.log(e);
    }
  };

  const disconnect = () => {
    const bookmark = favoritesNotConnected?.map(fav => {
      return {
        classifiedReference: fav?.classified?.reference,
        addDate: new Date().toLocaleDateString('fr'),
      };
    });
    let stringifyBookmarks = JSON.stringify(bookmark);
    sendClickOnDisconnectMyAccountPage();
    removeRefreshTokenFromStore();
    globalThis.refreshToken = null;
    globalThis.token = null;
    setIsConnected(false);
    webViewRef.current?.injectJavaScript(
      `window.localStorage.setItem('bookmarks',JSON.stringify(${stringifyBookmarks}));
      var nomDuCookie = 'access-token'; 
      document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
      var nomDuCookie = 'refresh-token'; 
      document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
      window.location.href=("${WebViewUrlsHelpers?.disconnectPage}");`,
    );
    // navigation.navigate('Filters');
    removeUserCategory();
    //setFavorieStateChange(true);
  };

  const disconnectedList = [
    {
      label: 'Paramètres',
      page: 'Parameters',
    },
  ];
  const _renderItem = ({item}: any) => (
    <MenuItem item={item} navigation={navigation} />
  );

  const connectedList = Object.entries(myAccount).map(([page, label]) => {
    return {page, label};
  });

  const renderSeparator = () => (
    <Box className="border-b-backgroundLine border-b-0.5 mx-[20] my-[16] " />
  );

  return (
    <Box style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {!isConnected ? (
        <LoginUser
          onPress={() => {
            sendClickOnConnectMyAccountPage();
            setLoginPageState('LOGIN');
          }}
        />
      ) : (
        <Box style={mainStyles.roundedViewStyle}>
          <Text style={mainStyles.mailTextStyle}>{getUserMail()}</Text>
        </Box>
      )}
      <Box>
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          data={isConnected ? connectedList : disconnectedList}
          key={'myAccountList'}
          renderItem={_renderItem}
        />
        {renderSeparator()}
        {isConnected ? (
          <TouchableOpacity onPress={disconnect}>
            <Box className="mt-4 mb-2.5 ms-2">
              <Text style={mainStyles.disconectTextStyle}>
                {titleButtons?.disconnect}
              </Text>
            </Box>
          </TouchableOpacity>
        ) : null}
      </Box>
      <Box style={{flex: 1, opacity: 0}}>
        <TouchableWithoutFeedback>
          <LCWebView
            style={{height: 1}}
            testID="my-Account-webview"
            key={key}
            screen="login"
            ref={webViewRef}
            hasLoadingSpinner={false}
            // onMessage={_renderCookies}
            url={WebViewUrlsHelpers?.webEmpty}
            onShouldStartLoadWithRequest={(state: any) => {
              return true;
            }}
          />
        </TouchableWithoutFeedback>
      </Box>
    </Box>
  );
}
