import React from 'react';
import {useLayoutEffect, useRef, useState} from 'react';
import {Platform, Linking} from 'react-native';
import WebView from 'react-native-webview';
import {Box, LCWebView} from '../components';
import {ChevronLeft} from '../components/Icon';
import {WebViewUrlsHelpers} from '../config/constants';
import {sendGoBackActionClick} from '../utils/tagCommander';

const MyAppointmentsScreen: React.FC = ({navigation}: any) => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef<WebView>(null);
  useLayoutEffect(() => {
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
      sendGoBackActionClick('mesRdv', 'compte');
    });
  }, [navigation]);

  return (
    <Box className="flex-1 ">
      <LCWebView
        url={WebViewUrlsHelpers?.myAppointmentsPage}
        key={key}
        ref={webViewRef}
        screen="Appointment"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (
            WebViewUrlsHelpers.webRachatUrls.some(rachatWebUrl =>
              url.includes(rachatWebUrl),
            )
          ) {
            if (url.includes('/resume.html?id=')) {
              const transaction = new URL(url).searchParams.get('id');
              navigation.navigate('BottomTab', {
                screen: 'SellMenu',
                params: {
                  screen: 'RachatExpress',
                  params: {transaction},
                },
              });
              // openInAppBrowser(
              //   createUrlConnected(
              //     WebViewUrlsHelpers.rachatExpressPage
              //     + '/resume.html?id=' + transaction
              //   ),
              // );
            } else {
              navigation.navigate('BottomTab', {
                screen: 'SellMenu',
                params: {
                  screen: 'RachatExpress',
                },
              });
            }
            return false;
          } else if (url.slice(0, 3) === 'tel') {
            Linking.openURL(url);
            return false;
          }
          return true;
        }}
      />
    </Box>
  );
};

export default MyAppointmentsScreen;
