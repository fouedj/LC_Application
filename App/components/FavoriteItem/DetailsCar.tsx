import React from 'react';
import mainStyles from '../../styles/styles';
import {formatPrice} from '../../utils/functionString';
import {getDealAnnounce} from '../../utils/getDealAnnounce';
import {getDealStyle} from '../../utils/getDealStyle';
import Box from '../Box';
import {EuroIcon} from '../Icon';
import Text from '../Text';
import colors from '../../styles/colors';


interface DetailsCarProps {
  info: any;
}

const DetailsCar: React.FC<DetailsCarProps> = info => {
  const {classified} = info?.info;
  const dealColors = getDealStyle(classified?.goodDealBadge);
  return (
    <Box className="w-full">
      <Box style={mainStyles.favoriteItemTitle}>
        <Text style={mainStyles.vehicleMake}>{classified?.vehicle_make}</Text>
        <Text style={mainStyles.vehicleModel}>
          {classified?.vehicle_commercialName}
        </Text>
      </Box>
      <Text className="text-Dark_Grey text-[12px] leading-[16] mb-[4]">
        {classified?.vehicle_version}
      </Text>
      <Box>
        <Text style={mainStyles.textInfo}>
          {`${classified?.vehicle_year} | ${classified?.vehicle_mileage} km`}
        </Text>
      </Box>
      <Box className="border-b border-b-backgroundLine my-[8]" />
      <Box className="flex flex-row items-center space-x-1 mb-[8]">
        <Text className="text-base font-bold text-blackPro">
          {/* to make space after the second carac */}
          {formatPrice(classified?.price)} €<Text />
        </Text>
      </Box>
      <Box
        className={'flex-row items-center space-x-1 h-[30] justify-center rounded-r-[8] mb-[8] rounded-l-[8] py-[2] px-[8] border'}
        style={{
          backgroundColor: dealColors?.background,
          borderColor: dealColors?.border,
          width: dealColors?.width + (Platform.OS === "android" ? 20 : 0),
        }}
      >
        <EuroIcon iconColor={dealColors?.text} />
        <Text style={{fontWeight: 700, color: dealColors?.text}}>
          {getDealAnnounce(classified?.goodDealBadge)}
        </Text>
      </Box>
    </Box>
  );
};
export default DetailsCar;
