import {styled} from 'nativewind';
import React from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {
  ActivityIndicator as RNActivityIndicator,
  Platform,
  View as RNView,
  StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';
import {ErrorState, NetworkState} from '../../recoil';
import {useSetRecoilState} from 'recoil';
import ErrorScreen from '../Error';
import withError from '../../hooks/withError';
import {getUrl} from '../../utils/functionString';
import {sendPageError} from '../../utils/tagCommander';
import * as Sentry from '@sentry/react-native';
import generateUserAgent from '../../utils/generateUserAgent';
import TrackingInfoSingleton from '../../utils/singleton/TrackingInfoSingleton';
import {PagesToOpenInInAppBrowser, WebViewUrlsHelpers} from '../../config/constants';
import { openInAppBrowser } from '../../utils/inAppBrowser';

type Props = {
  ref?: any;
  url: string;
  headers?: {[key: string]: string};
  error?: boolean;
  hiddenLoader?: boolean;
  screen: any;
  containerStyle?: any;
} & WebViewProps;

const ActivityIndicator = styled(RNActivityIndicator);
const View = styled(RNView);
//Sentry Test Performance
const transaction = Sentry.startTransaction({name: 'webview-transaction'}); //The root span (the span that is the parent of all other spans) is known as a transaction in Sentry.
const span = transaction.startChild({op: 'loadWebview'}); // This function returns a Span

const LCWebView: React.FC<Props> = ({hasLoadingSpinner = true, ...props}) => {
  const setError = useSetRecoilState(ErrorState.error);
  const [isLoading, setIsLoading] = React.useState(hasLoadingSpinner);
  const [reloadCounter, setReloadCounter] = React.useState(0);
  const [displayMode, setDisplayMode] = React.useState('flex'); // flex : the WebView is displayed, none: the WebView is hidden. We must hide the webview when errors occurs to hide the eror html page
  const handleError = (err: any) => {
    Sentry.captureException(err.nativeEvent);
    TrackingInfoSingleton.isErrorPageDisplayed = true;
    sendPageError();
    err &&
      setError(prev => ({
        error: err,
        url: '',
        screen: prev.screen || props.screen,
      }));
  };
  if (props.error) {
    return (
      <ErrorScreen
        reload={() =>
          setError({
            error: null,
            url: '',
            screen: '',
          })
        }
      />
    );
  }

  const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
  });

  return (
    <>
      <WebView
        style={{display: displayMode}}
        containerStyle={props.containerStyle}
        testID="webview"
        ref={(props as any).forwardedRef}
        useWebKit={Platform.OS === 'ios'}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically
        setSupportMultipleWindows
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={false}
        scalesPageToFit={true}
        originWhitelist={['*']}
        startInLoadingState={true}
        setBuiltInZoomControls={false}
        renderLoading={() => <></>}
        decelerationRate={1.0}
        onLoadProgress={event => {
          //nativeEvent.progress represents the current amount of the webview loaded
          //(between 0, not loaded and 1, fully loaded)
          //To hide the spinner when almost all elements of the webview have loaded,
          //I have choosen 0.25 as it is the better trade between content loaded and user experience
          if (event.nativeEvent.progress > 0.25) {
            setDisplayMode('flex');
            TrackingInfoSingleton.isErrorPageDisplayed = false;
          }
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoad={event => {
          //This is to ensure that the spinner is hidden if the load of the webview was so fast
          //that no onLoadProgress event was fired betwen 0.25 and 1
          setIsLoading(false);
          setDisplayMode('flex');

          span.setTag('http.url', event.nativeEvent.url);
          span.setData('data', event.nativeEvent);
          span.finish(); // Remember that only finished spans will be sent with the transaction
          transaction.finish(); // Finishing the transaction will send it to Sentry
        }}
        onLoadEnd={event => {
          //This is to ensure that the spinner is hidden if the load of the webview was so fast
          //that no onLoadProgress event was fired betwen 0.25 and 1
          setIsLoading(false);
          setDisplayMode('flex');

          span.setTag('http.url', event.nativeEvent.url);
          span.setData('data', event.nativeEvent);
          span.finish(); // Remember that only finished spans will be sent with the transaction
          transaction.finish(); // Finishing the transaction will send it to Sentry
        }}
        onHttpError={err => {
          if (err.nativeEvent.statusCode === 403) {
            //let datadome pass, an error 403 means that datadome is displayed
            return;
          }
          Sentry.captureException(err.nativeEvent);
          if (reloadCounter < 5) {
            setReloadCounter(reloadCounter + 1);
            props?.forwardedRef?.current?.reload();
          } else {
            //cette modification ça va aider à l'entrée dans la boucle d'erreur quand il s'agit d'une erreur
            Platform.OS === 'android' &&
              props.forwardedRef.current.clearCache(true); //to clear the cache of ram in android mode because he is sensible with js injection if i have an error we must to clear the cache
            const errorNative: object = err?.nativeEvent;

            setError({
              error: errorNative,
              url: props.url,
              screen: props.screen,
            });
            sendPageError();
            TrackingInfoSingleton.isErrorPageDisplayed = true;
          }
        }}
        onError={err => {
          if (reloadCounter < 3) {
            setDisplayMode('none');
            setReloadCounter(reloadCounter + 1);
            props?.forwardedRef?.current?.reload();
          } else {
            setDisplayMode('flex');
            handleError(err);
          }
        }}
        {...props}
        onShouldStartLoadWithRequest={request => {
          const {url} = request

          if(PagesToOpenInInAppBrowser.some((urlToCatch: string) =>
            url.includes(urlToCatch),
          )) {
            openInAppBrowser(url);
          }
          
          if( //Si l'url est empty
              //OU si l'url que l'on souhaite chargée est la même qu'actuellement utilisée par la webview
              //alors, on autorise la requête par défaut
            [WebViewUrlsHelpers.webEmpty, props.url]
              .some(authorizedUrl => {
                return url.includes(authorizedUrl)
              })
          ){
            return true;
          }

          // Sinon, on s'en refère aux cas spécifiques de la webview
          // Si aucun cas spécifique ne correspnds, on refuse par défaut.
          return (props as any)?.onShouldStartLoadWithRequest?.(request)
            || false
        }}
        onNavigationStateChange={navState => {
          //console.log({navState});
          
          if (
            (navState.loading || navState.navigationType) &&
            [
              WebViewUrlsHelpers.filtersPage,
              WebViewUrlsHelpers.quotationLanding,
            ].some(selfLoadingPageUrl => {
              return navState.url.includes(selfLoadingPageUrl);
            })
          ) {
            setIsLoading(true);
          }
        }}
        applicationNameForUserAgent={`#${generateUserAgent()}`}
        source={{uri: getUrl(props.url)}}
      />
      {isLoading && !props.hiddenLoader && (
        <ActivityIndicator
          size="large"
          color={colors.lc_blue}
          style={styles.loading}
          animating={isLoading}
          testID="activityIndicator"
        />
      )}
    </>
  );
};

export default withError(LCWebView);
