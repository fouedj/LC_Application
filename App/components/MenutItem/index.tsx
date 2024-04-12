import {TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../Text';
import Box from '../Box';
import mainStyles from '../../styles/styles';
import {sendClickOnMyAccountGoToPage} from '../../utils/tagCommander';
import {ChevronRight} from '../Icon';
import colors from '../../styles/colors';

type Props = {
  item: any;
  navigation: any;
};
export default function MenuItem({navigation, item}: Props) {
  const {label, page} = item;
  return (
    <Box>
      <TouchableOpacity
        onPress={() => {
          sendClickOnMyAccountGoToPage(page);
          navigation.navigate(page);
        }}>
        <Box>
          <Box className="flex-row justify-between">
            <Text style={mainStyles.cellSimpleTextStyle}>{label}</Text>
            <ChevronRight style={{marginRight: 20}} color={colors?.grey1} />
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
