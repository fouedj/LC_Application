import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  Box,
  ConfirmationModal,
  EmptyResult,
  FavoriteItemNotConnected,
  LCWebView,
  SortModal,
  Text,
} from '../../components';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import mainStyles from '../../styles/styles';
import {useIsFocused} from '@react-navigation/native';
import {FavoriteState} from '../../recoil';
import Loader from '../../components/Loader';
import useBottomModal from '../../hooks/useBottomModal';
import {INJECT_BOOKMARKS_ONLY, STATUS} from '../../config/constantString';
import {useHeaderFavorite} from '../../hooks/useHeaderFavorite';

import {getConvertedAsciiToAnnounceId} from '../../utils/functionString';
import {
  sendClickFavoriteDeleteAllCancel,
  sendClickFavoriteDeleteAllValidate,
} from '../../utils/tagCommander';

import * as Sentry from '@sentry/react-native';
import {WebViewUrlsHelpers} from '../../config/constants';
import {areEquals} from '../../utils/compareArray';
import WebView from 'react-native-webview';
import {
  fetchLocalFavorites,
  _removeAllFavoritesNotConnected,
} from './FavoriteService';

export default function FavoriteContainerUserNotLogged({navigation}: any) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWebviewLoaded, setWebviewLoaded] = React.useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const webViewFavNativRef = useRef<WebView | null>(null);
  const setFavorites = FavoriteState.useSet();
  const favoriteNotConnected = FavoriteState.useGet()?.favoriteNotConnected;
  const [isVisibleSort] = useState<boolean>(false);
  const sortFavorite = FavoriteState.useGetSortFavorit();
  const [key, setKey] = useState<number>(0);
  const setFavorieStateChange = FavoriteState.useSetFavorieStateChange();
  const {onOpenActionSheet, onCloseActionSheet, actionSheetRef} =
    useBottomModal();

  const isNotEmpty = (array: Array) => {
    return array.length > 0;
  };
  useHeaderFavorite(
    {
      onOpenActionSheet,
      navigation,
      toggleDeleteModal: () => setIsVisible(true),
      showIcons: isNotEmpty(favoriteNotConnected),
    },
    [navigation, isVisible, isFocused, favoriteNotConnected],
  );

  useEffect(() => {
    try {
      if (webViewFavNativRef?.current) {
        webViewFavNativRef?.current?.injectJavaScript(INJECT_BOOKMARKS_ONLY);
      }
    } catch (error: any) {
      Sentry.captureMessage('Favorites:loadFavoritesNotConnected', error);
      console.error(error);
    }
  }, [isFocused, navigation, isWebviewLoaded]);

  const loadFavoritesNotConnected = () => {
    fetchLocalFavorites({setIsLoading, favoriteNotConnected, setFavorites});
  };
  useEffect(() => {
    if (isFocused) {
      loadFavoritesNotConnected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, favoriteNotConnected, sortFavorite, navigation]);
  const _renderItem = ({item}: any) => {
    const itemNotConnected = {
      ...item,
      classifiedReference: item?.classified?.reference,
    };

    return (
      <FavoriteItemNotConnected
        item={itemNotConnected}
        webViewRef={webViewFavNativRef}
        onPress={() =>
          navigation.navigate('AnnounceDetail', {
            announceId:
              item &&
              item?.classified &&
              item?.classified?.reference &&
              getConvertedAsciiToAnnounceId(item?.classified?.reference),
            vertical: 'auto',
          })
        }
      />
    );
  };
  const _renderEmpty = () =>
    favoriteNotConnected.length !== 0 ? null : (
      <EmptyResult messageBody=" Aucune annonce n'est actuellement dans vos favoris" />
    );
  const sortedList = useMemo(() => {
    return [...favoriteNotConnected]
      .filter(
        (favNotConnected: any) =>
          favNotConnected &&
          favNotConnected.classified?.status === STATUS.online,
      )
      .sort((a: any, b: any) => {
        return sortFavorite.sort(a, b);
      });
  }, [favoriteNotConnected, sortFavorite]);
  //to recuperate the add Date of each bookmark of localStorage but have a problem with with addDate he make all bookmarks with the last addDate

  return (
    <Box
      testID="favoriteId"
      className="bg-white flex-1 items-center justify-center flex content-center w-full px-[8]">
      {!isWebviewLoaded || isLoading ? (
        <Box className=" absolute bottom-0 top-0 ">
          <Loader size={'large'} />
        </Box>
      ) : (
        <FlatList
          ListEmptyComponent={_renderEmpty}
          ListHeaderComponent={
            <Text style={{...mainStyles.upperTextEmptyResult}}>
              Les annonces qui disparaissent du site sont automatiquement
              supprimées de vos favoris
            </Text>
          }
          renderItem={_renderItem}
          data={sortedList}
          style={mainStyles.favoriteListStyle}
          onRefresh={() => loadFavoritesNotConnected()}
          refreshing={false}
        />
      )}
      {/**@ts-ignore */}
      <ConfirmationModal
        visible={isVisible}
        onClose={() => {
          sendClickFavoriteDeleteAllCancel();
          setIsVisible(false);
        }}
        onConfirm={() => {
          sendClickFavoriteDeleteAllValidate();
          _removeAllFavoritesNotConnected({
            favoriteNotConnected,
            setFavorites,
            setIsVisible,
            setIsLoadingButton,
            webViewRef: webViewFavNativRef,
            setFavorieStateChange,
          });
        }}
        bodyStyle={mainStyles.bodyModal}
        title="Supprimer toutes les annonces ?"
        bodyText="Voulez-vous supprimer toutes les annonces de vos favoris ?"
        closeButton
        confirmButton
        titleCloseButton="Annuler"
        titleConfirmButton="Supprimer"
        styleCloseButton={mainStyles.closeContainer}
        styleTextCloseButton={mainStyles.closeButtonText}
        styleModalTitle={mainStyles.modalTitle}
        styleContainerConfirmButton={mainStyles.confirmContainer}
        styleTitleButtonConfirm={mainStyles.titleConfirm}
        isLoading={isLoadingButton}
        isVisibleSort={isVisibleSort}
        actionSheetRef={actionSheetRef}
        onCloseActionSheet={onCloseActionSheet}
        modalContentWithoutCloseIcon={mainStyles.modalContentWithoutCloseIcon}
      />
      <Box style={{flex: 1, opacity: 0}}>
        <TouchableWithoutFeedback>
          <LCWebView
            style={{height: 1}}
            testID="my-Account-webview"
            key={key}
            screen="login"
            ref={webViewRefe => (webViewFavNativRef.current = webViewRefe)}
            hasLoadingSpinner={false}
            onLoadEnd={() => setWebviewLoaded(true)}
            onMessage={event => {
              const response = event.nativeEvent.data;
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
            }}
            url={WebViewUrlsHelpers?.webEmpty}
            onShouldStartLoadWithRequest={() => {
              return true;
            }}
          />
        </TouchableWithoutFeedback>
      </Box>
      <SortModal actionSheetRef={actionSheetRef} onClose={onCloseActionSheet} />
    </Box>
  );
}
