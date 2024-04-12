import * as React from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import mainStyles from '../../styles/styles';
import Box from '../Box';
import IconButton from '../Button/IconButton';
import {CloseIcon} from '../Icon';
import Text from '../Text';

interface CustomActionSheetProps {
  onClose: () => void;
  actionSheetRef: ActionSheetRef;
  title: string;
  children: React.ReactNode;
  closeOnTouchBackdrop?: any;
  style?: any;
  height?: number;
}

const BottomModal: React.ForwardedRef<CustomActionSheetProps> = ({
  onClose,
  actionSheetRef,
  title,
  children,
  closeOnTouchBackdrop,
  style,
  height,
}) => {
  return (
    <ActionSheet
      ref={actionSheetRef}
      closeOnTouchBackdrop={closeOnTouchBackdrop}
      containerStyle={[
        mainStyles.actionSheetContainer,
        height != null ? {height: height} : null,
      ]}
      //gestureEnabled={true}
      bounceOnOpen={true}
      onClose={onClose}>
      <Box className="justify-center item-center flex-row p-3">
        <Box className="flex-1 ios:px-11 android:px-6">
          <Text className="justify-center text-center items-center text-lg font-bold text-black ">
            {title}
          </Text>
        </Box>
        <Box className="justify-start items-end pr-[12]">
          <IconButton
            icon={<CloseIcon />}
            style={mainStyles.closeActionSheet}
            onPress={onClose}
          />
        </Box>
      </Box>
      <Box className="pb-[32] px-[20]">{children}</Box>
    </ActionSheet>
  );
};

export default BottomModal;
