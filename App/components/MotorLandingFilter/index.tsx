import React, {useRef, useState} from 'react';
//import WebView from 'react-native-webview';
import LCWebView from '../../components/CustomWebView';
import {DimensionScreen, WebViewUrlsHelpers} from '../../config/constants';
import {Platform, StyleSheet, View} from 'react-native';
import {useSetFiltersParam} from '../../recoil/filtersParam';
import {getRestOfStringFrom} from '../../utils/functionString';
import {INJECT_BOOKMARKS_ONLY} from '../../config/constantString';
import {FavoriteState} from '../../recoil';
import {areEquals} from '../../utils/compareArray';
import {getIsConnected} from '../../utils/getUserInformations';

type MotorLandingFilterProps = {
  navigation: any;
  webViewRef: any;
  onFullScreen: () => void;
  onPartialScreen: () => void;
  webViewIsFull: boolean;
};

const MotorLandingFilter: React.FC<MotorLandingFilterProps> = ({
  navigation,
  onFullScreen,
  onPartialScreen,
  webViewIsFull,
  webViewRef,
}) => {
  const setFilters = useSetFiltersParam();
  //const webViewRef = useRef<WebView>(null);
  const [webViewHeight, setWebViewHeight] = useState(330);
  const favoriteNotConnected = FavoriteState.useGet()?.favoriteNotConnected;
  const setFavorites = FavoriteState.useSet();
  const isConnected = getIsConnected();

  return (
    <View
      testID="motorLandingFilter"
      style={webViewIsFull ? viewStyles.fullScreen : {height: webViewHeight}}>
      <LCWebView
        url={WebViewUrlsHelpers?.appLandingPage}
        ref={webViewRef}
        scrollEnabled={webViewIsFull}
        screen="depositConfirm"
        injectedJavaScript={`${
          !isConnected ? INJECT_BOOKMARKS_ONLY : ''
        };window.innerHeight = ${
          DimensionScreen.windowHeight
        };window.ReactNativeWebView.postMessage(document.body.scrollHeight)`}
        onMessage={event => {
          const response = event.nativeEvent.data;
          // TO DO : code to be in util to not duplicate code
          // fav on postmessage
          if (
            response.includes('type:"Favoris"') ||
            response.includes('"type":"Favoris"')
          ) {
            const object = JSON.parse(response);

            if (object.data) {
              let parsedArrayFavorits = JSON.parse(object.data);

              if (parsedArrayFavorits.length > 0) {
                // ajouter addDate de localstorage vers data api car l'api ne contient pas addDate

                parsedArrayFavorits =
                  parsedArrayFavorits &&
                  parsedArrayFavorits.length !== 0 &&
                  parsedArrayFavorits.map(fav => {
                    return {
                      ...fav,
                    };
                  });
                const referencesLocalstorage = parsedArrayFavorits
                  .map(fav => fav && fav.classifiedReference)
                  .filter(Boolean);
                const referencesAtom = favoriteNotConnected
                  .map(fav => {
                    if (fav.classifiedReference) {
                      return fav.classifiedReference;
                    }
                    if (fav.classified && fav.classified.reference) {
                      return fav.classified.reference;
                    }
                  })
                  .filter(Boolean);
                // Update the list of favorites if needed
                if (!areEquals(referencesAtom, referencesLocalstorage)) {
                  //console.log('++get favNotConnected from webView '+parsedArrayFavorits.length);
                  setFavorites((prev: any) => ({
                    ...prev,
                    favoriteNotConnected: parsedArrayFavorits,
                  }));
                }
              } else {
                // Clear the list of favorites if it was populated to be make sure all the the list be empty
                if (favoriteNotConnected.length) {
                  setFavorites((prev: any) => ({
                    ...prev,
                    favoriteNotConnected: [],
                  }));
                }
              }
            }
          }
          // fav on postmessage

          try {
            const height = parseInt(response);
            if (height) {
              setWebViewHeight(height);
            }
            const searchDataInfo = JSON.parse(response);
            if (
              searchDataInfo &&
              searchDataInfo.data &&
              searchDataInfo.data.action === 'open'
            ) {
              onFullScreen();
            } else {
              onPartialScreen();
            }
          } catch (error) {
            // console.log('++erreur');
            console.log(error);
          }
        }}
        onShouldStartLoadWithRequest={state => {
          const isListingPage = state.url.includes(
            WebViewUrlsHelpers?.listingPage,
          );
          const isWebListingPage = state.url.includes(
            WebViewUrlsHelpers?.webListingPage,
          );
          const isWebFiltersPage = state.url.includes(
            WebViewUrlsHelpers?.webFiltersPage,
          );
          // si on arrive ici (plus de criteres) : /filters?....
          if (isWebFiltersPage) {
            webViewRef.current?.stopLoading();
            setFilters(getRestOfStringFrom(state.url, '?'));
            navigation.navigate('Filters');
          }
          if (isListingPage || isWebListingPage) {
            webViewRef.current?.stopLoading();
            if (state.url.includes('?')) {
              setFilters(getRestOfStringFrom(state.url, '?'));
            } else {
              setFilters('');
            }
            navigation.navigate('Filters', {hiddenLoader: true});
            navigation.navigate('Listing', {previous_screen: 'Home'});
          }
        }}
      />
    </View>
  );
};

const viewStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
export default MotorLandingFilter;
