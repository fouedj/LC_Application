import React from 'react';
import {TouchableOpacity} from 'react-native';
import {textBody, titleButtons} from '../../config/constantString';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import Text from '../Text';
type Props = {
  onPress: () => void;
};
export default function LoginUser({onPress}: Props) {
  return (
    <Box style={mainStyles.roundedViewStyle}>
      <Box className="p-2 items-center justify-center content-center">
        <Box className="w-[290] h-[60] items-center justify-center content-center mb-3 ">
          <Text style={[mainStyles.title20, {textAlign: 'center'}]}>
            {textBody?.textAccount}
          </Text>
        </Box>
        <TouchableOpacity
          style={[mainStyles.roundButtonStyleBlue, , {marginBottom: 15}]}
          onPress={onPress}>
          <Box style={mainStyles.horizontalView2}>
            <Text style={[mainStyles.text16MeduimWhite]}>
              {titleButtons?.connectCreate}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
