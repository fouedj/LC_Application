import React, {useEffect, useState, useMemo} from 'react';
import {
  Box,
  ConfirmationModal,
  EmptyResult,
  FavoriteItem,
  SortModal,
  Text,
} from '../../components';
import {FlatList} from 'react-native';
import mainStyles from '../../styles/styles';
import {getFavoriteBookmarks} from '../../hooks';
import {useIsFocused} from '@react-navigation/native';
import {FavoriteState} from '../../recoil';
import Loader from '../../components/Loader';
import useBottomModal from '../../hooks/useBottomModal';
import {STATUS} from '../../config/constantString';
import {useHeaderFavorite} from '../../hooks/useHeaderFavorite';

import {getConvertedAsciiToAnnounceId} from '../../utils/functionString';
import {
  sendClickFavoriteDeleteAllCancel,
  sendClickFavoriteDeleteAllValidate,
} from '../../utils/tagCommander';
import {_removeAllFavoritesConnected} from './FavoriteService';

export default function FavoriteContainerUserLogged({navigation}: any) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const setFavorites = FavoriteState.useSet();
  const favorites = FavoriteState.useGet()?.favoriteConnected;
  const webViewRef: any = FavoriteState?.useGetWebViewRefFilter();
  const webViewRefListing: any = FavoriteState?.useGetWebViewRefListing();
  const [isVisibleSort] = useState<boolean>(false);
  const sortFavorite = FavoriteState.useGetSortFavorit();
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
      showIcons: isNotEmpty(favorites),
    },
    [navigation, favorites, isVisible, isFocused],
  );

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getFavoriteBookmarks({token: globalThis.accessToken}).then(bookmarks => {
        if (bookmarks?.data?.length > 0) {
          setIsLoading(true);
          setFavorites(prev => ({
            ...prev,
            favoriteConnected: bookmarks?.data,
          }));
        } else {
          setFavorites(prev => ({
            ...prev,
            favoriteConnected: [],
          }));
        }
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, sortFavorite]);

  const _renderItem = ({item}: any) => {
    return (
      <FavoriteItem
        item={item}
        refListing={webViewRefListing}
        onPress={() =>
          navigation.navigate('AnnounceDetail', {
            announceId:
              item &&
              item?.classified &&
              item?.classified?.reference &&
              getConvertedAsciiToAnnounceId(item?.classified?.reference),
            vertical:
              item &&
              item?.classified &&
              ['auto', 'utils'].includes(item?.classified?.family)
                ? 'auto'
                : 'moto',
          })
        }
      />
    );
  };

  const sortedList = useMemo(() => {
    return [...favorites]
      .reverse()
      .filter(
        (favConnected: any) =>
          favConnected.classified?.status === STATUS.online,
      )
      .sort((a: any, b: any) => {
        return sortFavorite.sort(a, b);
      });
  }, [sortFavorite, favorites]);

  const _renderEmpty = () =>
    favorites.length !== 0 ? null : (
      <EmptyResult messageBody=" Aucune annonce n'est actuellement dans vos favoris" />
    );
  return (
    <Box
      testID="favoriteId"
      className="bg-white flex-1 items-center justify-center flex content-center w-full px-[8]">
      {isLoading ? (
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
          _removeAllFavoritesConnected(
            favorites,
            setFavorites,
            setIsLoadingButton,
            webViewRef,
            webViewRefListing,
            setFavorieStateChange,
            setIsVisible,
          );
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
      <SortModal actionSheetRef={actionSheetRef} onClose={onCloseActionSheet} />
    </Box>
  );
}
