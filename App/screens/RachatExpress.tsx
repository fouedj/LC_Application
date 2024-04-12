import React, {useRef} from 'react';
import {Box, LCWebView, Text} from '../components';
import {ChevronLeft} from '../components/Icon';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import WebView from 'react-native-webview';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {sendGoBackActionClick} from '../utils/tagCommander';
import {Linking} from 'react-native';
import {useRoute} from '@react-navigation/native';

const RachatExpress = ({navigation}: {navigation: any}) => {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const transaction = route?.params?.transaction || null;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
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
          transaction
            ? WebViewUrlsHelpers.webRachatUrls[1].replace(
                '?mobileapp=true',
                '',
              ) + `/resume.html?id=${transaction}&mobileapp=true`
            : WebViewUrlsHelpers.rachatExpressPage
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
          } else if (url.includes(WebViewUrlsHelpers.webMyAppointmentsPage)) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Sell'}],
            });
            navigation.navigate('BottomTab', {
              screen: 'myAccount',
              params: {
                screen: 'MyAppointments',
              },
            });
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
          } else if (url.includes(WebViewUrlsHelpers.webListingPage)) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Sell'}],
            });
            navigation.navigate('BottomTab', {
              screen: 'SearchAndListing',
              params: {
                screen: 'Listing',
              },
            });
            return false;
          } else if (url === `${WebViewUrlsHelpers.baseUrl}/`) {
            webViewRef.current?.injectJavaScript(
              `window.location.href=("${WebViewUrlsHelpers?.rachatExpressPage}");`,
            );
          }
          return true;
        }}
      />
    </Box>
  );
};

export default RachatExpress;
