import React, {useRef} from 'react';
import LCWebView from '../components/CustomWebView';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import {Box} from '../components';
import {ChevronLeft} from '../components/Icon';
import {Platform, useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {sendGoBackActionClick} from '../utils/tagCommander';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavoriteState} from '../recoil';
import {extractQueryString} from '../utils/functionString';

export default function MyProfile({navigation}) {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const favorites = FavoriteState?.useGet()?.favoriteConnected;
  const favoritesNotConnected = FavoriteState?.useGet()?.favoriteNotConnected;

  const {width, height} = useWindowDimensions();
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);

  const viewPort = `var metaTag = document.createElement('meta');
  // Set attributes for the meta element
  metaTag.setAttribute('name', 'viewport');
  metaTag.setAttribute('content', 'user-scalable=no, width=765, shrink-to-fit=no');
  // Get the head element of the document
  var head = document.head || document.getElementsByTagName('head')[0];
  // Append the meta element to the head
  head.appendChild(metaTag)`;
  const jsCode = `${width > 764 ? viewPort : ''}`; //(for tablet)to limit the page width

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return <ChevronLeft {...props} showLeftTitle />;
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isPageLoaded) {
      // We have to be sure that the page is fully loaded to get tc_vars
      webViewRef &&
        webViewRef?.current &&
        webViewRef.current?.injectJavaScript(jsCode);
    }
  }, [isPageLoaded]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('monProfil', 'compte');
    });
  }, [navigation]);

  const removeRefreshTokenFromStore = async () => {
    try {
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      console.log({e});
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
    removeRefreshTokenFromStore();
    globalThis.refreshToken = null;
    globalThis.token = null;
    webViewRef.current?.injectJavaScript(
      `window.localStorage.setItem('bookmarks',JSON.stringify(${stringifyBookmarks}));
      var nomDuCookie = 'access-token'; 
      document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
      var nomDuCookie = 'refresh-token'; 
      document.cookie = nomDuCookie + '=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;domain=${WebViewUrlsHelpers?.baseUrlLight} ;secure;';
      window.location.href=("${WebViewUrlsHelpers?.disconnectPage}");`,
    );
  };

  return (
    <Box testID="myProfile" className="flex-1">
      <LCWebView
        url={WebViewUrlsHelpers.myProfile}
        key={key}
        ref={webViewRef}
        screen="Mon profil"
        onLoad={() => {
          setIsPageLoaded(true);
        }}
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (
            PagesToOpenInInAppBrowser.some(urlToCatch =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
          }
          if (url.includes(WebViewUrlsHelpers.myProfileWeb)) {
            //When editing profile, first charge app url with passing QueryqString
            const queryString = extractQueryString(url);

            setTimeout(() => {
              webViewRef.current?.injectJavaScript(
                `window.location.href=("${WebViewUrlsHelpers.myProfile}?${
                  queryString && queryString
                }");`,
              );
            }, 500);
            return Platform.OS === 'ios' && true;
          } else if (url.includes('/deconnexion')) {
            removeRefreshTokenFromStore();
            disconnect();
            setTimeout(() => {
              navigation?.goBack();
            }, 600);
          } else if (url.includes(WebViewUrlsHelpers.myProfile)) {
            //Then we end up here, and authorize the webview to go forward
            return true;
          } else if (url.includes(WebViewUrlsHelpers.myProfileWeb)) {
            const queryString = extractQueryString(url);
            setTimeout(() => {
              webViewRef.current?.injectJavaScript(
                `window.location.href=("${WebViewUrlsHelpers.myProfile}?${
                  queryString && queryString
                }");`,
              );
            }, 500);
          }
          return Platform.OS === 'ios' && false;
        }}
      />
    </Box>
  );
}
