import React, {useRef} from 'react';
import {Box, LCWebView, Text} from '../components';
import {CheckedIcon} from '../components/Icon';
import {Platform} from 'react-native';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import WebView from 'react-native-webview';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {extractQueryString} from '../utils/functionString';
import {useRoute} from '@react-navigation/native';
import {sendGoBackActionClick} from '../utils/tagCommander';

const DepositConfirm = ({navigation}: {navigation: any}) => {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => (
        <CheckedIcon
          {...props}
          showLeftTitle
          overrideBackBtn={() => {
            navigation.navigate('Sell');
          }}
        />
      ),
    });
  }, [navigation]);

  const {queryString} = route?.params;

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('depotAnnonceConfirmation', 'depot');
    });
  }, [navigation]);

  return (
    <Box testID="favoriteId" className="flex-1  ">
      <LCWebView
        url={
          WebViewUrlsHelpers.depositConfirmation +
          '?' +
          queryString +
          '&mobileapp=true'
        }
        key={key}
        ref={webViewRef}
        screen="depositConfirm"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;

          if (
            PagesToOpenInInAppBrowser.some(urlToCatch =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          } else if (
            url.includes(WebViewUrlsHelpers.myAdsPage) ||
            url.includes(WebViewUrlsHelpers.myAdsAccountPage)
          ) {
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
          }
          return true;
        }}
      />
    </Box>
  );
};

export default DepositConfirm;
