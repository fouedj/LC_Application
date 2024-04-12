import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import LCWebView from '../components/CustomWebView';
import {WebViewUrlsHelpers} from '../config/constants';
import {Box} from '../components';
import {getCookie} from '../utils/functionString';
import {updateAccessToken} from '../utils/cmpStoreManager';
import {
  INJECT_JS_GET_COOKIES,
} from '../config/constantString';
import {Platform} from 'react-native';

import {GoBackIcon} from '../components/Icon';
export default function CmpScreen({navigation}) {
  const [key, setKey] = React.useState(0);
  const _renderCookies = event => {
    let cookie = event?.nativeEvent?.data;
    if (cookie.includes('atPrivacy')) {
      const atPrivacy = getCookie(cookie, 'atPrivacy');
      updateAccessToken(atPrivacy);
    }
  };

  const webViewRef = useRef<WebView>(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      headerLeft: props => {
        return Platform.OS === 'ios' ? (
          <GoBackIcon {...props} showLeftTitle />
        ) : null;
      },
    });
  }, [navigation]);
  return (
    <Box testID="favoriteId" className="flex-1  ">
      <LCWebView
        url={WebViewUrlsHelpers.charteCookiesPage}
        key={key}
        ref={webViewRef}
        screen="message"
        onShouldStartLoadWithRequest={state => {
          return true;
        }}
        onMessage={event => {
          const response = event.nativeEvent.data;
          if (response.includes('{"cmpData":')) {
            const cmpDataInfo = JSON.parse(response);
              if (cmpDataInfo && cmpDataInfo.cmpData) {
                updateAccessToken(cmpDataInfo.cmpData === 'accepté' ? 'optin' : 'exempt')
              }
            setTimeout(() => {
              webViewRef.current?.injectJavaScript(INJECT_JS_GET_COOKIES);
            }, 800);    
          } else if (
            response === 'optout' ||
            response === 'cmpOut clicked'
          ) {
            webViewRef.current?.injectJavaScript(INJECT_JS_GET_COOKIES);
          } else if (response.includes('atPrivacy=')) {
            _renderCookies(event);
          }
        }}
    />
    </Box>
  );
}