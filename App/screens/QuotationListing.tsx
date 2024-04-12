import {useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import {Platform} from 'react-native';
import {Box, Header, LCWebView} from '../components';
import {GoBackIcon} from '../components/Icon';
import {PagesToOpenInInAppBrowser} from '../config/constants';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {sendGoBackActionClick} from '../utils/tagCommander';

function seoEncode(str: string | undefined) {
  return (str ?? '')
    .replace(/&/g, '^')
    .replace(/-/g, '_')
    .replace(/'/g, '`')
    .replace(/\+/g, '~')
    .replace(/\//g, '*')
    .replace(/ /g, '+')
    .toLowerCase();
}
export default function QuotationListing({navigation}: any) {
  const [key, setKey] = React.useState(0);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = React.useState(false);
  const [headerTitle, setHeaderTitle] = React.useState('');
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const globalUrl = route?.params?.url;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return Platform.OS === 'ios' ? (
          <GoBackIcon {...props} showLeftTitle />
        ) : null;
      },
    });
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => Header(isHeaderHidden, headerTitle),
    });
  }, [isHeaderHidden, headerTitle, navigation]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('listingCote', 'cote');
    });
  }, [navigation]);

  return (
    <Box testID="quotationListing" className="flex-1">
      <LCWebView
        url={globalUrl}
        key={key}
        ref={webViewRef}
        screen="quotationListing"
        onLoadEnd={() => {
          setPageLoaded(true);
        }}
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          const regexDetail = new RegExp(
            /^(https:\/\/).*[^-](---\.html)$/,
            'i',
          );
          if (regexDetail.test(url)) {
            navigation.navigate('QuotationDetails', {
              url, hasBeenRedirected : !pageLoaded
            });
            return false;
          } else if (url.includes('?version-id=')) {
            navigation.navigate('QuotationDetails', {
              url, hasBeenRedirected : !pageLoaded
            });
            return false;
          } else if (
            PagesToOpenInInAppBrowser.some((urlToCatch: string) =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          }
          return true;
        }}
        onMessage={event => {
          const response = event.nativeEvent.data;
          const object = JSON.parse(response);
          const {click} = object?.quotationData;
          if (click === 'validateFiltersModal') {
            setHeaderTitle('Cote La Centrale');
            setIsHeaderHidden(false);
          } else if (click === 'openFiltersModal') {
            setIsHeaderHidden(true);
          } else if (
            click === 'closeFiltersModal' ||
            click === 'cancelFiltersModal'
          ) {
            setHeaderTitle('Cote La Centrale');
            setIsHeaderHidden(false);
          }
        }}
      />
    </Box>
  );
}
