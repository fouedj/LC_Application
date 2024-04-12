import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {textBody, titleButtons} from '../../config/constantString';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import { SearchIcon } from '../Icon';
import Text from '../Text';
type Props = {
  onPress: () => void;
  numberAnnounce:object
};
const FindCarContainer: React.FC <Props> = ({onPress,numberAnnounce}) =>  {
  return (
    <Box style={mainStyles.rectangleViewStyle}>
      <Box className="p-3 items-center justify-center content-center">
        <Box className="w-[303] h-[52] items-center justify-center content-center mb-3 px-2 ">
          <Text style={[mainStyles.title18, {textAlign: 'center'}]}>
           {textBody?.text1FindMyCar}
            <Text style={{fontWeight:Platform?.OS==="ios"?"600":"700"}} > {numberAnnounce} {textBody?.text2FindMyCar}</Text>
            <Text> {textBody?.text3FindMyCar}</Text>
          </Text>
        </Box>
        <TouchableOpacity
          style={[mainStyles.roundButtonStyleBlue, , {marginBottom: 15}]}
          onPress={onPress}>
          <Box style={mainStyles.horizontalView2}>
            <Box className='mr-1'>
            <SearchIcon isWhite/>
            </Box>
            <Text style={[mainStyles.text16MeduimWhite]}>
              {titleButtons?.findMyCarTitle}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
export default FindCarContainer