import React from 'react';
import {DeviceEventEmitter, Platform, View} from 'react-native';
import {
  addFavoriteBookmark,
  removeFavoriteBookmark,
} from '../../hooks/useBookmark';
import FavoriteState from '../../recoil/favorites';
import {getToken} from '../../utils/getUserInformations';
import IconButton from '../Button/IconButton';
import {FavoriteDetails, ShareIconAndroid, ShareIconIos} from '../Icon';
import {useRenderCount} from '@uidotdev/usehooks';
import {useFocusEffect} from '@react-navigation/native';
import {sendClickAjoutFavoriDetailPage} from '../../utils/tagCommander';

type Props = {
  onShare(): void;
  onClickFav(clickAddsFavorite: boolean): void;
  title?: string;
  reference?: string;
  tcVars?: string | any;
  ownerCorrelationId?: string;
};
function RightComponentConnected({
  onShare,
  onClickFav,
  title,
  reference,
  tcVars,
  ownerCorrelationId,
}: Props) {
  const setFavorites = FavoriteState.useSet();
  const favorites: any = FavoriteState.useGet()?.favoriteConnected;
  let isDisable = !title || !tcVars || !ownerCorrelationId;
  const renderCount = useRenderCount();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const setFavorieStateChange = FavoriteState?.useSetFavorieStateChange();
  useFocusEffect(() => {
    setIsFavorite(false);
    const exist = favorites?.some(
      (item: any) => item?.classifiedReference === reference,
    );
    //to limit the number of render component for accelerate the display and hide of "heart"
    if (exist && renderCount > 4) {
      setIsFavorite(true);
    }
  });

  const addRemoveFavorite = async () => {
    if (!reference) {
      return null;
    }
    DeviceEventEmitter.emit('refreshFavVehiculesAround', {
      reference,
      isFav: !isFavorite,
    });

    setFavorieStateChange(true);
    onClickFav(!isFavorite);
    sendClickAjoutFavoriDetailPage(!isFavorite, reference);
    const favoriteExistsInLocalConnected = favorites?.find(
      (localFav: any) => reference === localFav.classifiedReference,
    );
    if (favoriteExistsInLocalConnected) {
      setFavorites((prev: any) => ({
        ...prev,
        favoriteConnected: prev.favoriteConnected?.filter(
          (local: any) => local.classifiedReference !== reference,
        ),
      }));
      await removeFavoriteBookmark(
        {
          token: getToken(),
          reference: reference,
        },
        () => {},
      );
    } else {
      setFavorites((prev: any) => ({
        ...prev,
        favoriteConnected: [
          ...prev.favoriteConnected,
          {
            classifiedReference: reference,
            addDate: new Date().toLocaleDateString('fr'),
          },
        ],
      }));
      await addFavoriteBookmark(
        {token: getToken(), reference: reference},
        response => {},
      );
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        opacity: !title || !tcVars || !ownerCorrelationId ? 0.5 : 1.0,
      }}>
      {/* it's a generic icon component to minimize the number of touchbaleOpacity and lines of code */}
      <IconButton
        icon={
          Platform.OS === 'android' ? (
            <ShareIconAndroid isDisable={isDisable} />
          ) : (
            <ShareIconIos isDisable={isDisable} />
          )
        }
        onPress={onShare}
        style={{
          margin: Platform?.OS === 'android' ? 3.5 : 8.5,
        }}
      />
      <IconButton
        icon={<FavoriteDetails isClicked={isFavorite} isDisable={isDisable} />}
        onPress={addRemoveFavorite}
        disabled={!title || !tcVars || !ownerCorrelationId} //to disabled the heart when the webView loads data
        style={{
          margin: Platform?.OS === 'android' ? 3.5 : 8.5,
        }}
      />
    </View>
  );
}
export default RightComponentConnected;
