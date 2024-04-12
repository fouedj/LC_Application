import React, {useRef} from 'react';
import LCWebView from '../components/CustomWebView';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import {
  Box,
  GenericModal,
  IconButton,
  ListIformationsModal,
  Text,
} from '../components';
import Log from '../utils/Log';
import {ChevronLeft} from '../components/Icon';
import WebView from 'react-native-webview';
import InfoIcon from '../components/Icon/InfoIcon';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {useSetRecoilState} from 'recoil';
import {AnnounceState} from '../recoil';
import {useIsFocused} from '@react-navigation/native';
import {
  sendClickInfoMessagerie,
  sendGoBackActionClick,
} from '../utils/tagCommander';

export default function MessageScreen({navigation}) {
  const [key, setKey] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const setAnnounceId = useSetRecoilState(AnnounceState.announce);
  const webViewRef = useRef<WebView>(null);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return <ChevronLeft {...props} showLeftTitle />;
      },
      headerRight: (props: any) => {
        return (
          <IconButton
            icon={<InfoIcon />}
            onPress={() => {
              setIsVisible(true);
              sendClickInfoMessagerie();
            }}
          />
        );
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isFocused) {
      // sendPageMessagerie();
    }
  }, [isFocused, navigation]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('maMessagerie', 'compte');
    });
  }, [navigation]);

  return (
    <Box testID="favoriteId" className="flex-1  ">
      <GenericModal
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        close
        header={
          <Text
            className="text-base font-bold text-blackPro"
            fontFamily="OpenSans-Regular">
            Règles de prudence
          </Text>
        }
        body={<ListIformationsModal />}
      />
      <LCWebView
        url={WebViewUrlsHelpers.messagePage}
        key={key}
        ref={webViewRef}
        screen="message"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (
            url.includes(WebViewUrlsHelpers.autoAnnouceDetails) ||
            url.includes(WebViewUrlsHelpers.utilAnounceDetails) ||
            url.includes(WebViewUrlsHelpers.quadAnounceDetails) ||
            url.includes(WebViewUrlsHelpers.motoAnounceDetails) ||
            url.includes(WebViewUrlsHelpers.scooterAnounceDetails)
          ) {
            const announceId = url.slice(
              url.lastIndexOf('-') + 1,
              url.lastIndexOf('.html'),
            );
            const matchResult = url.match(/\b(moto|auto)\b/i);
            let vertical = 'auto';
            if (matchResult) {
              vertical = matchResult[0];
            }
            setAnnounceId(announceId);
            navigation.navigate('AnnounceDetail', {announceId, vertical});
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
      />
    </Box>
  );
}
