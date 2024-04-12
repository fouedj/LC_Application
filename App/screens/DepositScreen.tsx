import React, {useRef} from 'react';
import {Box, LCWebView, Text} from '../components';
import {ChevronLeft, GoBackIcon} from '../components/Icon';
import {Linking, Platform} from 'react-native';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {extractQueryString} from '../utils/functionString';
import {sendGoBackActionClick} from '../utils/tagCommander';

const DepositScreen = ({navigation}: {navigation: any}) => {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  const announceId = route?.params?.announceId || null;
  const from = route?.params?.from || null;
  const disableZoomScript = `
  if (!window.disableZoomScriptExecuted) {
    let element = document.createElement('meta');
    element.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    element.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(element);
    window.disableZoomScriptExecuted = true;
  }
`;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        if (from) {
          return (
            <ChevronLeft
              {...props}
              showLeftTitle
              overrideBackBtn={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Sell'}],
                });
                navigation.navigate(from);
              }}
            />
          );
        }
        return <ChevronLeft {...props} showLeftTitle />;
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('vendre', 'cote');
    });
  }, [navigation]);

  return (
    <Box testID="favoriteId" className="flex-1  ">
      <LCWebView
        url={
          announceId !== null
            ? WebViewUrlsHelpers.webEditMyAdUrl(announceId)
            : WebViewUrlsHelpers.depositPage
        }
        key={key}
        ref={webViewRef}
        screen="message"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (
            PagesToOpenInInAppBrowser.some(urlToCatch =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          } else if (url.includes('mailto')) {
            Linking.openURL(url);
            return false;
          } else if (url.includes(WebViewUrlsHelpers.webMyAdsUrl)) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Sell'}],
            });
            navigation.navigate('BottomTab', {
              screen: 'myAccount',
              params: {
                screen: 'AdsScreen',
              },
            });
            return false;
          } else if (url.includes(WebViewUrlsHelpers.depositConfirmation)) {
            const queryString = extractQueryString(url);
            navigation.navigate('DepositConfirmation', {queryString});
            return false;
          }
          webViewRef?.current?.injectJavaScript(disableZoomScript);
          return true;
        }}
      />
    </Box>
  );
};

export default DepositScreen;
