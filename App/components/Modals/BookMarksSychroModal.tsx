import * as React from 'react';
import BottomModal from './CustomActionSheet';
import {Box, Text, SellViewButton} from '../../components';
import mainStyles from '../../styles/styles';
import {TouchableOpacity} from 'react-native';
import {textBody, titleButtons} from '../../config/constantString';

type Props = {
  actionSheetRef: any;
  onClose: any;
  onPress: () => void;
};
export default function BookMarksSychroModal({
  actionSheetRef,
  onClose,
  onPress,
}: Props) {
  return (
    <BottomModal
      height={200}
      title={titleButtons?.SychroTitle}
      actionSheetRef={actionSheetRef}
      onClose={onClose}>
      <Box className="items-center justify-center content-center">
        <Text
          style={[
            mainStyles.text16,
            {textAlign: 'center', marginHorizontal: 16},
          ]}>
          {textBody.synchroBookmarksBody}
        </Text>
        <TouchableOpacity
          style={[mainStyles.roundButtonStyleBlue, {marginTop: 15}]}
          onPress={() => {
            onPress();
            onClose();
          }}>
          <Box style={mainStyles.horizontalView2}>
            <Text style={[mainStyles.text16MeduimWhite]}>
              {titleButtons?.connectCreate}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </BottomModal>
  );
}
