import React, {useRef} from 'react';
import LCWebView from '../components/CustomWebView';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import {Box} from '../components';
import {ChevronLeft, GoBackIcon} from '../components/Icon';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {sendGoBackActionClick} from '../utils/tagCommander';
const regexList = new RegExp(/^(https:\/\/).*(----\.html)$/, 'i');
const regexListWithFilter = new RegExp(
  /^https:\/\/[a-zA-Z0-9.-]+\/app-cote-([a-zA-Z0-9-]+)--([0-9]+)-.html(\?.*)?$/,
  'i',
);
const regexDetail = new RegExp(/^(https:\/\/).*[^-](---\.html)$/, 'i');
export default function QuotationScreen({navigation}) {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);

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
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('homeCote', 'cote');
    });
  }, [navigation]);

  return (
    <Box testID="quotation" className="flex-1">
      <LCWebView
        url={WebViewUrlsHelpers?.quotationLanding}
        key={key}
        ref={webViewRef}
        screen="quotation"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (url.includes('?version-id')) {
            navigation.navigate('QuotationDetails', {url});
            return false;
          } else if (regexDetail.test(url)) {
            navigation.navigate('QuotationDetails', {url});
            return false;
          } else if (regexList.test(url) || regexListWithFilter?.test(url)) {
            navigation.navigate('QuotationListing', {url});
            return false;
          } else if (
            PagesToOpenInInAppBrowser.some(urlToCatch =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          }
          return true;
        }}
        onMessage={(event: any) => {}}
      />
    </Box>
  );
}
