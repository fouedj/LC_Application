/* eslint-disable react/no-unstable-nested-components */
import React, {useRef} from 'react';
import {Platform, Linking, Share, DeviceEventEmitter} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GoBackIcon} from '../../components/Icon';
import {
  PagesToOpenInBrowser,
  PagesToOpenInInAppBrowser,
  WebViewUrlsHelpers,
} from '../../config/constants';
import LCWebView from '../../components/CustomWebView';
import {FavoriteState} from '../../recoil';
import {getFavoriteBookmarks} from '../../hooks/useBookmark';
import {getToken, getIsConnected} from '../../utils/getUserInformations';
import {useIsFocused} from '@react-navigation/native';
import {RightComponent, RightComponentConnected} from '../../components';
import {INJECTION_JAVASCRIPT} from '../../config/constantString';
import {getConvertedAnnounceIdToAscii} from '../../utils/functionString';
import {trackClickAjoutFavori, trackClickShared} from './tracking';
import VisitorIdState from '../../recoil/tracking';
import {tcVarsWebToTcVarsNative} from '../../utils/functionHashMap';
import {
  sendPageAnnonceDetail,
  sendGoBackActionClick,
  sendClickOnShareDetailPage,
} from '../../utils/tagCommander';
import {openInAppBrowser} from '../../utils/inAppBrowser';
import generateUserAgent from '../../utils/generateUserAgent';
import TrackingInfoSingleton from '../../utils/singleton/TrackingInfoSingleton';
import onMessage from './on-message';
import onShouldStartLoadWithRequest from './on-should-start-load';

export default function AnnounceDetail({route, navigation}: any) {
  const webViewRef: any = useRef(null);
  const [titlePage, setTitlePage] = React.useState('');
  const [tcVars, setTcVars] = React.useState<{[key: string]: any}>();
  const [ownerCorrelationId, setOwnerCorrelationId] = React.useState('');
  const {announceId, vertical} = route?.params;
  const reference: string =
    announceId && getConvertedAnnounceIdToAscii(announceId);
  const isConnected = getIsConnected();
  const visitor_id = VisitorIdState.useGet();
  const setFavorites = FavoriteState.useSet();
  const jsCode = INJECTION_JAVASCRIPT; //to get item's bookmark
  const message =
    'Voici une annonce intéressante que je viens de trouver sur LaCentrale';
  const url = `${WebViewUrlsHelpers.autoAnnouceDetails}${announceId}.html`;
  const shareOptions = {
    subject: '',
  };
  const content = {
    title: '',
    url:
      Platform.OS === 'ios'
        ? `${WebViewUrlsHelpers.autoAnnouceDetails}${announceId}.html`
        : null,
    message: Platform.OS === 'android' ? message + ':\n' + url : message,
  };
  //if this our solution perfectly running i will delete this Listenner
  // React.useEffect(() => {
  //   const beforeRemove = navigation.addListener('beforeRemove', () => {
  //     //use to detect the goBack action
  //     sendGoBackActionClick('detailPA', 'annonce');
  //     webViewRef?.current?.stopLoading();
  //     webViewRefListing?.reload();
  //   });
  // }, [navigation]);

  const onShareAd = async () => {
    sendClickOnShareDetailPage();
    trackClickShared(
      {
        classified_ref: reference,
        event_page: 'DETAIL',
        event_page_zone: 'header',
      },
      getToken(),
      visitor_id,
      tcVars,
      ownerCorrelationId,
    );
    const response = await Share.share(content, shareOptions);
  };

  const onClickFav = (clickAddsFavorite: boolean) => {
    trackClickAjoutFavori(
      clickAddsFavorite,
      {
        classified_ref: reference,
        event_page: 'DETAIL',
        event_page_zone: 'header',
      },
      getToken(),
      visitor_id,
      tcVars,
      ownerCorrelationId,
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: titlePage,
      headerRight: () => {
        return isConnected ? (
          // we proced with the webServices "for connected Mode"
          <RightComponentConnected
            onShare={onShareAd}
            onClickFav={onClickFav}
            reference={reference}
            title={titlePage}
            tcVars={tcVars}
            ownerCorrelationId={ownerCorrelationId}
          />
        ) : (
          // we proced with the injectionJs by webViews "for not connected Mode"
          <RightComponent
            webViewRef={webViewRef}
            injectJsCode={injectJsCode}
            onShare={onShareAd}
            onClickFav={onClickFav}
            reference={reference}
            title={titlePage}
            tcVars={tcVars}
            ownerCorrelationId={ownerCorrelationId}
          />
        );
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, titlePage, tcVars, ownerCorrelationId]);
  const injectJsCode = (code: string) => {
    webViewRef.current.injectJavaScript(code);
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      if (isConnected) {
        getFavoriteBookmarks({token: globalThis.accessToken}).then(
          (bookmarks: any) => {
            console.log(bookmarks.data);
            if (bookmarks?.data && bookmarks?.data?.length > 0) {
              setFavorites(prev => ({
                ...prev,
                favoriteConnected: bookmarks?.data,
              }));
            }
            if (bookmarks?.data?.length === 0) {
              setFavorites((prev: any) => ({
                ...prev,
                favoriteConnected: [],
              }));
            }
          },
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isConnected]);
  const stopLoadingAndRefresh = () => {
    sendGoBackActionClick('detailPA', 'annonce');
    webViewRef?.current?.goBack();
    // webViewRefListing?.reload();
    DeviceEventEmitter?.emit('reloadListing');
    navigation.goBack();
  };
  React.useEffect(() => {
    if (isFocused) {
      sendPageAnnonceDetail();
    }
  }, [isFocused, navigation]);

  React.useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerBackTitle: 'ok',
      headerRight: () => {
        return isConnected ? (
          // we proced with the webServices "for connected Mode"
          <RightComponentConnected
            onShare={onShareAd}
            onClickFav={onClickFav}
          />
        ) : (
          // we proced with the injectionJs by webViews "for not connected Mode"
          <RightComponent
            webViewRef={webViewRef}
            injectJsCode={injectJsCode}
            onShare={onShareAd}
            onClickFav={onClickFav}
            reference={reference}
            title={titlePage}
          />
        );
      },
      headerLeft: (props: any) => {
        return (
          <GoBackIcon
            {...props}
            showLeftTitle
            overrideBackBtn={stopLoadingAndRefresh}
          />
        );
      },
    });
  }, []);

  return (
    <LCWebView
      testID="detail-Announce-webview"
      ref={webViewRef}
      scrollEnabled={true}
      screen="DetailsAnnonce"
      containerStyle={{paddingBottom: 32, backgroundColor: 'white'}}
      injectedJavaScript={jsCode}
      onShouldStartLoadWithRequest={(request: any) =>
        onShouldStartLoadWithRequest(request, {
          PagesToOpenInBrowser,
          Linking,
          navigation,
          openInAppBrowser,
          PagesToOpenInInAppBrowser,
          WebViewUrlsHelpers,
        })
      }
      url={WebViewUrlsHelpers?.detailsAnnounce(announceId, vertical)}
      headers={{
        'user-agent': generateUserAgent(),
      }}
      onMessage={(event: any) =>
        onMessage(event, {
          setFavorites,
          setOwnerCorrelationId,
          setTcVars,
          setTitlePage,
          tcVarsWebToTcVarsNative,
          TrackingInfoSingleton,
        })
      }
    />
  );
}
