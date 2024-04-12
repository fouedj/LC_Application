import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import PlaceholderAds from '../images/PlaceholderAds';
import FastImage from 'react-native-fast-image';
import {getDealAnnounce} from '../../utils/getDealAnnounce';
import {getDealStyle} from '../../utils/getDealStyle';
import {EuroIcon, FavoriteCircleEmpty, FavoriteCircleFull} from '../Icon';

interface Vehicle {
  item: any;
}

interface AnnouncementCardProps {
  item: Vehicle;
  onSelectCell: (f: any) => void;
  onSelectInfo: (f: any) => void;
  onSelectFav: (f: any) => void;
}
const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  item,
  onSelectCell,
  onSelectInfo,
  onSelectFav,
}) => {
  const [isImageAvailable, setIsImageAvailable] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    if (item && item?.item?.photoUrl) {
      fetch(item?.item?.photoUrl)
        .then(response => {
          if (response.status === 404) {
            setIsImageAvailable(false);
          } else {
            setIsImageAvailable(true);
          }
        })
        .catch(() => {
          setIsImageAvailable(false);
        });
    } else {
      setIsImageAvailable(false);
    }
  }, [item]);

  const getSmallImages = () => {
    if (item && item?.item?.photoUrl) {
      const urlObj = new URL(item?.item?.photoUrl);
      return {
        firstSmallImage: `https://${urlObj.hostname}/140x105/${item?.item?.reference}_STANDARD_1.jpg`,
        secondSmallImage: `https://${urlObj.hostname}/140x105/${item?.item?.reference}_STANDARD_2.jpg`,
      };
    }
    return {firstSmallImage: null, secondSmallImage: null};
  };

  const {firstSmallImage, secondSmallImage} = getSmallImages();
  const dealColors = getDealStyle(item?.item?.goodDealBadge);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelectCell(item)}>
      {/* Images container */}
      <View style={styles.rowImages}>
        {!isImageAvailable && (
          <View style={styles.firstImage}>
            <PlaceholderAds />
          </View>
        )}
        {isImageAvailable && (
          <FastImage
            source={{
              uri: item && item?.item?.photoUrl,
            }}
            resizeMode="contain"
            style={styles.firstImage}
          />
        )}
        {/* Second and third image */}
        {!isImageAvailable && (
          <View>
            <View style={styles.smallImage}>
              <PlaceholderAds width={`${284 * 0.33}`} height={`${141 / 2}`} />
            </View>
            <View style={styles.secondSmallImage}>
              <PlaceholderAds width={`${284 * 0.33}`} height={`${141 / 2}`} />
            </View>
          </View>
        )}
        {isImageAvailable && (
          <View>
            {firstSmallImage && (
              <FastImage
                source={{
                  uri: firstSmallImage,
                }}
                resizeMode="contain"
                style={styles.smallImage}
              />
            )}
            {secondSmallImage && (
              <FastImage
                source={{
                  uri: secondSmallImage,
                }}
                resizeMode="contain"
                style={styles.smallImage}
              />
            )}
          </View>
        )}
      </View>

      {/* TitreAnnonce */}
      {item?.item?.vehicle?.commercialName && (
        <View style={styles.viewAdsTitle}>
          <Text style={styles.adsTitle}>
            {item?.item?.vehicle?.commercialName}
          </Text>
        </View>
      )}

      {/* Year and Mileage */}
      <View style={styles.viewInfo}>
        {item?.item?.vehicle?.year && (
          <View style={styles.distanceContainer}>
            <Image
              style={styles.infoItemIcon}
              source={require('../../../assets/images/calendar.png')}
            />
            <Text style={styles.distanceText}>{item?.item?.vehicle?.year}</Text>
          </View>
        )}
        {item?.item?.vehicle?.mileage && (
          <View style={styles.distanceContainer}>
            <Image
              style={styles.infoItemIcon}
              source={require('../../../assets/images/dashboard.png')}
            />
            <Text
              style={
                styles.distanceText
              }>{`${item?.item?.vehicle?.mileage} km`}</Text>
          </View>
        )}
      </View>

      {/* Transmission and Fuel type */}
      <View style={styles.viewInfo}>
        {item?.item?.vehicle?.gearbox && (
          <View style={styles.distanceContainer}>
            <Image
              style={styles.infoItemIcon}
              source={require('../../../assets/images/gearbox.png')}
            />
            <Text style={styles.distanceText}>
              {item?.item?.vehicle?.gearbox}
            </Text>
          </View>
        )}

        {item?.item?.vehicle?.energy && (
          <View style={styles.distanceContainer}>
            <Image
              style={styles.infoItemIcon}
              source={require('../../../assets/images/engine.png')}
            />
            <Text style={styles.distanceText}>
              {item?.item?.vehicle?.energy}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.separator} />

      {/* Price, Monthly Price and button info */}
      <View style={styles.rowPrice}>
        {item?.item?.price && (
          <Text numberOfLines={1} style={styles.priceTotal}>
            {`${item?.item?.price} €`}
          </Text>
        )}
        {item?.item?.financing?.teasingPriceClassic && (
          <Text style={styles.orText}>{'ou'}</Text>
        )}
        {item?.item?.financing?.teasingPriceClassic && (
          <Text numberOfLines={1} style={styles.monthlyPrice}>
            {`${item?.item?.financing?.teasingPriceClassic} €/mois`}
          </Text>
        )}
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => onSelectInfo(item)}>
          <Image
            style={styles.infoIcon}
            source={require('../../../assets/images/info.png')}
          />
        </TouchableOpacity>
      </View>

      {/* View Bonne affaire */}
      {item?.item?.goodDealBadge && (
        <View
          style={{
            ...styles.proContainer,
            backgroundColor: dealColors?.background,
            borderColor: dealColors?.border,
          }}>
          <EuroIcon iconColor={dealColors?.text} />
          <Text style={{...styles.bonneAffaireText, color: dealColors?.text}}>
            {getDealAnnounce(item?.item?.goodDealBadge)}
          </Text>
        </View>
      )}

      {/* Favorites button (add or delete) */}
      {
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => onSelectFav(item)}>
          {item?.item?.isFav && <FavoriteCircleFull />}
          {!item?.item?.isFav && <FavoriteCircleEmpty />}
        </TouchableOpacity>
      }

      {/* Tag and geolocInfo*/}
      <View style={styles.leftTopRow}>
        {item?.item?.customerType && (
          <View style={styles.viewTag}>
            <Text style={styles.labelTag}>{item?.item?.customerType}</Text>
          </View>
        )}
        {item?.item?.location?.visitPlace && (
          <View style={styles.viewTag}>
            <Image
              style={styles.geolocOutlined}
              source={require('../../../assets/images/geolocOutlined.png')}
            />
            <Text style={styles.labelTag}>
              {item?.item?.location?.visitPlace}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AnnouncementCard;
