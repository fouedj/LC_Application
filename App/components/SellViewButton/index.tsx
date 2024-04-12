import React from 'react';
import {TouchableOpacity} from 'react-native';
import {textBody, titleButtons} from '../../config/constantString';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import Text from '../Text';
import SellDealer from '../../components/Icon/SellDealer';
import DisposeAnnounce from '../../components/Icon/DisposeAnnounce';
import ChevronRight from '../../components/Icon/ChevronRight';
import colors from '../../styles/colors';

type Props = {
  onPress?: () => void;
  isSellIcon?: boolean;
  titleText?: string;
  text?: string;
  backgroundColor?: string;
};
export default function SellViewButton({
  onPress,
  isSellIcon,
  titleText,
  text,
  backgroundColor,
}: Props) {
  return (
    <Box
      style={[
        mainStyles.roundedViewStyle,
        {backgroundColor: backgroundColor, marginVertical: 10},
      ]}>
      <TouchableOpacity
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 14,
        }}
        onPress={onPress}>
        <Box className='px-[12] py-[16] flex-auto'>
          <Box
            className="items-center justify-center content-center w-[40] h-[40] mb-[12]"
            style={[
              {
                backgroundColor: isSellIcon
                  ? '#D3D5FC'
                  : colors.lc_connect_blue,
                borderRadius: 8,
              },
            ]}>
            {isSellIcon ? <SellDealer /> : <DisposeAnnounce />}
          </Box>
          <Box>
            <Text
              style={[
                mainStyles.textUnderline16Semi,
                {textAlign: 'left', marginBottom: 8},
              ]}>
              {titleText}
            </Text>
            <Text style={[mainStyles.text14, {textAlign: 'left'}]}>
              {text}
            </Text>
          </Box>
        </Box>
        <Box
          style={{
            flexDirection: 'row',
            paddingRight: 12,
            justifyContent: 'flex-end',
            height: 24,
            width: 24,
          }}>
          <ChevronRight color={colors.lc_blue} />
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
