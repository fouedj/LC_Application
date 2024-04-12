import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {DeviceEventEmitter, Platform, View} from 'react-native';
import FavoriteState from '../../recoil/favorites';
import {getBookMarksLocalStorage} from '../../utils/getBookMarksLocalStorage';
import IconButton from '../Button/IconButton';
import {FavoriteDetails, ShareIconAndroid, ShareIconIos} from '../Icon';
import {useRenderCount} from '@uidotdev/usehooks';
import {sendClickAjoutFavoriDetailPage} from '../../utils/tagCommander';
import * as Sentry from '@sentry/react-native';
type Props = {
  injectJsCode(jscode: string): void;
  webViewRef?: any;
  onShare(): void;
  onClickFav(clickAddsFavorite: boolean): void;
  reference?: string;
  title: string;
  tcVars?: string | any;
  ownerCorrelationId?: string;
};
const RightComponent = React.memo(
  ({
    injectJsCode,
    onShare,
    onClickFav,
    reference,
    title,
    tcVars,
    ownerCorrelationId,
  }: Props) => {
    const setFavorites = FavoriteState.useSet();
    const favorites: any = FavoriteState.useGet()?.favoriteNotConnected;
    const [isFavorite, setIsFavorite] = React.useState(false);
    const setFavorieStateChange = FavoriteState?.useSetFavorieStateChange();
    let isDisable = !title || !tcVars || !ownerCorrelationId;
    //it's a hook to make all the informations of render component "number of render"
    const renderCount = useRenderCount('RightComponent');
    //to performe the display and hide of "heart"
    useFocusEffect(() => {
      setIsFavorite(false);
      const exist = favorites?.some(
        (item: any) => item?.classifiedReference === reference,
      );

      //to limit the number of render component for accelerate the display and hide of "heart"
      if (exist && renderCount > 2) {
        setIsFavorite(true);
      }
    });
    const addRemoveFavorite = () => {
      try {
        //to fix crash in list favorites because we have possibility to have no reference
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
        const favoriteExistsInLocalNotConnected = favorites?.find(
          (localFav: any) =>
            reference === localFav.classifiedReference && !localFav.deleted,
        );
        if (favoriteExistsInLocalNotConnected) {
          setFavorites((prev: any) => ({
            ...prev,
            favoriteNotConnected: prev.favoriteNotConnected?.filter(
              (local: any) => local.classifiedReference !== reference,
            ),
          }));
        } else {
          setFavorites((prev: any) => ({
            ...prev,
            favoriteNotConnected: [
              {
                classifiedReference: reference,
                addDate: new Date().toISOString('fr'),
              },
              ...prev.favoriteNotConnected,
            ],
          }));
        }
        //to verify in localStorage if the favoris existe on delete it else we add it and to sychronize with localstorage
        injectJsCode(getBookMarksLocalStorage(reference));
      } catch (err: any) {
        Sentry.captureMessage('RightComponent:addRemoveFavorite', err);
        console.error(err);
      }
    };

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          marginRight: 5,
          opacity: isDisable ? 0.5 : 1.0,
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
          onPress={() => onShare(tcVars)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: Platform?.OS === 'android' ? 3.5 : 8.5,
          }}
        />
        <IconButton
          icon={
            <FavoriteDetails
              isClicked={isFavorite}
              isDisable={!title || !tcVars || !ownerCorrelationId}
            />
          }
          onPress={addRemoveFavorite}
          disabled={!title || !tcVars || !ownerCorrelationId} //to disabled the heart when the webView loads data
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: Platform?.OS === 'android' ? 3.5 : 8.5,
          }}
        />
      </View>
    );
  },
);
export default RightComponent;
