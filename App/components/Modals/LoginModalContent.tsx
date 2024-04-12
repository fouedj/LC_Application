import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {titleButtons} from '../../config/constantString';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import {BlackBell} from '../Icon';
import Text from '../Text';
type Props = {
  onPress: () => void;
};
export default function LoginModalContent({onPress}: Props) {
  return (
    <Box className="w-full items-center justify-center  ">
      <Box className="flex-col flex w-[335] h-[85] ">
        <Box className=" flex flex-row justify-between ">
          <Box className="items-start justify-start">
            <BlackBell />
          </Box>
          <Box className="w-[303]">
            <Text className="text-base text-black text-left">
              Activez les alertes pour être notifié lorsqu'une nouvelle annonce
              correspond à vos critères
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="flex justify-center items-center ">
        <TouchableOpacity
          style={[mainStyles.roundButtonStyleBlue]}
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
