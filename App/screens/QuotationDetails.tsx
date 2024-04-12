import {CommonActions, StackActions, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import {Platform} from 'react-native';
import {Box, LCWebView} from '../components';
import {GoBackIcon} from '../components/Icon';
import { PagesToOpenInInAppBrowser } from '../config/constants';
import { openInAppBrowser } from '../utils/inAppBrowser';
import { sendGoBackActionClick } from '../utils/tagCommander';

export default function QuotationDetails({navigation}: any) {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const {url, hasBeenRedirected} = route?.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return <GoBackIcon {...props} showLeftTitle overrideBackBtn={() => {
          if(hasBeenRedirected){
            navigation.pop();
          }
          navigation.pop();
        }} />;
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => { //use to detect the goBack action
      sendGoBackActionClick('detailCote', 'cote');
    });
  }, [navigation]);

  return (
    <Box testID="quotationDetail" className="flex-1">
      <LCWebView
        url={url}
        key={key}
        ref={webViewRef}
        screen="quotationDetail"
        onShouldStartLoadWithRequest={(state: any) => {
          const {url} = state;

          const regexList = new RegExp(/^(https:\/\/).*(----\.html)$/, 'i');
          if (regexList.test(state?.url)) {
            navigation.navigate('QuotationListing', {
              url: state?.url,
            });
            return false;
          } else if (
            PagesToOpenInInAppBrowser.some((urlToCatch: string) =>
              state?.url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(state?.url);
            return false;
          }
          return true;
        }}
        onMessage={event => {
          const response = event.nativeEvent.data;
        }}
      />
    </Box>
  );
}
