import * as React from 'react';
import {DeviceEventEmitter, Platform, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FavoriteState} from '../../recoil';
import colors from '../../styles/colors';
import mainStyles from '../../styles/styles';
import {goBackFunction} from '../../utils/goBackFuction';
import {removeBookmarkFromLocalStorage} from '../../utils/removeBookMarkFromLocaStorage';
import Box from '../Box';
import IconButton from '../Button/IconButton';
import {FavoriteCircleEmpty, FavoriteCircleFull, GeoLocation} from '../Icon';
import Text from '../Text';
import DetailsCar from './DetailsCar';
import Placeholder from '../images/Placeholder';

interface FavoriteItemProps {
  onPress: () => void;
  item: any;
}

const FavoriteItemNotConnected: React.FC<FavoriteItemProps> = ({
  onPress,
  item,
}) => {
  const {classified} = item;
  const favorites = FavoriteState?.useGet()?.favoriteNotConnected;
  const setFavorites = FavoriteState.useSet();
  const webViewRef = FavoriteState.useGetWebViewRefFilter();
  const webViewRefListing = FavoriteState.useGetWebViewRefListing();
  const isFavorite = React.useMemo(() => {
    return (
      favorites?.length &&
      favorites.some(
        (fav: any) => fav?.classified?.reference === item?.classifiedReference,
      )
    );
  }, [favorites, item]);
  const [isImageAvailable, setIsImageAvailable] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    // Fetch the image
    if (item && item?.classified?.pictureUrl) {
      fetch(item?.classified?.pictureUrl)
        .then(response => {
          // Check if the response status is 404
          if (response.status === 404) {
            setIsImageAvailable(false);
          } else {
            setIsImageAvailable(true);
          }
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          setIsImageAvailable(false);
        });
    } else {
      setIsImageAvailable(false);
    }
  }, []);

  const removeFavorite = async (refFav: any) => {
    DeviceEventEmitter.emit('refreshFavVehiculesAround', {
      reference: refFav,
      isFav: false,
    });
    const isExistLocalConnected = favorites?.find(
      (localFav: any) => localFav.classified.reference === refFav,
    );
    if (isExistLocalConnected) {
      setFavorites((prev: any) => ({
        ...prev,
        favoriteNotConnected: prev.favoriteNotConnected.filter(
          (local: any) => local.classified.reference !== refFav,
        ),
      }));
      if (webViewRef) {
        webViewRef.injectJavaScript(removeBookmarkFromLocalStorage(refFav));
        webViewRefListing.reload();
        //  webViewRefListing.injectJavaScript(goBackFunction());
      } else if (webViewRefListing) {
        webViewRefListing.injectJavaScript(
          removeBookmarkFromLocalStorage(refFav),
        );
        webViewRefListing.reload();
        webViewRefListing.injectJavaScript(goBackFunction());
      }
    }
  };

  return (
    <Box className="my-2 px-[16] w-full mx-auto">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        className="w-full">
        <Box
          style={{
            ...Platform.select({
              android: {elevation: 3, shadowColor: colors.boxShadowColor},
              ios: {
                shadowColor: colors.boxShadowColor,
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              },
            }),
          }}
          className="justify-center items-center bg-white rounded-3xl w-full">
          <Box className="items-center h-64 w-full">
            {isImageAvailable ? (
              <FastImage
                source={{
                  uri: item?.classified?.pictureUrl,
                }}
                resizeMode="cover"
                style={mainStyles.favoriteItemImage}>
                <Box className="flex items-end mb-auto">
                  <IconButton
                    icon={
                      isFavorite ? (
                        <FavoriteCircleFull />
                      ) : (
                        <FavoriteCircleEmpty />
                      )
                    }
                    style={mainStyles.favoriteCircleIcon}
                    onPress={() => removeFavorite(classified?.reference)}
                  />
                </Box>
                <Box className="flex space-x-3 flex-row m-[12] justify-start">
                  <Box className="flex space-x-3 flex-row m-[12] justify-start">
                    <Box className="flex flex-row bg-lightNature h-[24] px-[4] py-[2] rounded-r-[5] rounded-l-[5] justify-center items-center">
                      <Text className="text-[12] text-center font-semibold text-blackPro">
                        {classified?.customerType}
                      </Text>
                    </Box>
                    <Box className="flex flex-row  bg-lightNature h-[24] px-[4] py-[2] rounded-r-[5] rounded-l-[5] justify-center items-center space-x-[3]">
                      <GeoLocation />
                      <Text className="text-[12] text-center font-semibold text-blackPro">
                        {classified?.visitPlace}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </FastImage>
            ) : (
              <Box
                style={{
                  ...mainStyles.favoriteItemImage,
                  backgroundColor: colors.lc_connect_blue,
                }}>
                <Box className="flex items-end">
                  <IconButton
                    icon={
                      isFavorite ? (
                        <FavoriteCircleFull />
                      ) : (
                        <FavoriteCircleEmpty />
                      )
                    }
                    style={mainStyles.favoriteCircleIcon}
                    onPress={() => removeFavorite(classified?.reference)}
                  />
                </Box>
                <Box className="flex items-center my-auto">
                  <Placeholder />
                </Box>
                <Box className="flex space-x-3 flex-row m-3 justify-start ">
                  <Box className="flex space-x-3 flex-row m-3 justify-start ">
                    <Box className="flex flex-row  bg-lightNature h-[24] px-[4] py-[2] rounded-r-[5] rounded-l-[5] justify-center items-center">
                      <Text className="text-[12] text-center font-semibold text-blackPro">
                        {classified?.customerType}
                      </Text>
                    </Box>
                    <Box className="flex flex-row  bg-lightNature h-[24] px-[4] py-[2] rounded-r-[5] rounded-l-[5] justify-center items-center space-x-[3]">
                      <GeoLocation />
                      <Text className="text-[12] text-center font-semibold text-blackPro">
                        {classified?.visitPlace}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box className="px-[12] py-[8] w-full">
            <DetailsCar info={item} />
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default FavoriteItemNotConnected;