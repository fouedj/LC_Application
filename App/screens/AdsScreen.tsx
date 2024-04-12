import React, {useRef} from 'react';
import {Platform, Share, useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Box, LCWebView} from '../components';
import {ChevronLeft} from '../components/Icon';
import {
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../config/constants';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {useSetRecoilState} from 'recoil';
import {AnnounceState} from '../recoil';
import {sendGoBackActionClick} from '../utils/tagCommander';

const onShareAd = async announceId => {
  // trackClickShared(
  //   {
  //     classified_ref: reference,
  //     event_page: 'DETAIL',
  //     event_page_zone: 'header',
  //   },
  //   getToken(),
  //   visitor_id,
  //   tcVars,
  // );
  const message =
    'Voici une annonce intéressante que je viens de trouver sur LaCentrale';
  const url = `${WebViewUrlsHelpers.autoAnnouceDetails}${announceId}.html`;
  const content = {
    title: '',
    url:
      Platform.OS === 'ios'
        ? `${WebViewUrlsHelpers.autoAnnouceDetails}${announceId}.html`
        : null,
    message: Platform.OS === 'android' ? message + ':\n' + url : message,
  };
  const shareOptions = {
    subject: '',
  };
  await Share.share(content, shareOptions);
};

const AdsScreen: React.FC = ({navigation}: any) => {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const setAnnounceId = useSetRecoilState(AnnounceState.announce);
  const route: any = useRoute();
  const isFocused = useIsFocused();
  const {width, height} = useWindowDimensions();
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);

  const viewPort = `var metaTag = document.createElement('meta');
  // Set attributes for the meta element
  metaTag.setAttribute('name', 'viewport');
  metaTag.setAttribute('content', 'user-scalable=no, width=819, shrink-to-fit=no');
  // Get the head element of the document
  var head = document.head || document.getElementsByTagName('head')[0];
  // Append the meta element to the head
  head.appendChild(metaTag)`;
  const jsCode = `${width > 819 ? viewPort : ''}`; //(for tablet)to limit the page width

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return (
          <ChevronLeft
            {...props}
            showLeftTitle
            overrideBackBtn={() => {
              navigation.navigate(navigation.getState().routes[0]);
            }}
          />
        );
      },
    });
    navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('mesAnnonces', 'compte');
    });
  }, [navigation]);

  React.useEffect(() => {
    webViewRef.current?.injectJavaScript(
      `window.location.href=("${WebViewUrlsHelpers?.myAdsPage}");`,
    );
  }, [isFocused, navigation]);

  React.useEffect(() => {
    if (isPageLoaded) {
      // We have to be sure that the page is fully loaded to get tc_vars
      webViewRef &&
        webViewRef?.current &&
        webViewRef.current?.injectJavaScript(jsCode);
    }
  }, [isPageLoaded]);

  return (
    <Box className="flex-1">
      <LCWebView
        url={WebViewUrlsHelpers.myAdsPage}
        key={key}
        ref={webViewRef}
        screen="Announce"
        onLoad={() => {
          setIsPageLoaded(true);
        }}
        onMessage={(event: any) => {
          //reading the page's source
          const response: string = event.nativeEvent.data;
          if (response.includes('shareMyAnnounce')) {
            const [_, announceId] = response.split(':');
            onShareAd(announceId);
          }
        }}
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          if (
            url.includes(WebViewUrlsHelpers.webDepositPage) ||
            url.includes(WebViewUrlsHelpers.depositPage)
          ) {
            navigation.navigate('BottomTab', {
              screen: 'SellMenu',
              params: {
                screen: 'DepositScreen',
                params: {from: 'AdsScreen'},
              },
            });
            return false;
          }
          // else if (url.includes(WebViewUrlsHelpers.webEditAdUrl)) {
          //   navigation.navigate('AdsScreenOptions', {url: url});
          //   return false;
          // }
          else if (
            PagesToOpenInInAppBrowser.some((urlToCatch: string) =>
              url.includes(urlToCatch),
            )
          ) {
            openInAppBrowser(url);
            return false;
          } else if (url.includes(WebViewUrlsHelpers.webEditAdUrl)) {
            const pattern = /\/annonces\/(.*?)\/modification/;
            const match = pattern.exec(url);
            navigation.navigate('AdsScreenOptions', {url: url});
            if (match && match[1]) {
              const announceId = match[1];
              navigation.navigate('BottomTab', {
                screen: 'SellMenu',
                params: {
                  screen: 'DepositScreen',
                  params: {announceId, from: 'AdsScreen'},
                },
              });
            }
            return false;
          } else if (
            WebViewUrlsHelpers.anyAnnounceDetails.some(detailUrl =>
              url.includes(detailUrl),
            )
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
          }
          return true;
        }}
      />
    </Box>
  );
};

export default AdsScreen;
