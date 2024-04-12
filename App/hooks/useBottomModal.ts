import {useRef} from 'react';
import {ActionSheetRef} from 'react-native-actions-sheet';

const useBottomModal = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const onOpenActionSheet = () => {
    return actionSheetRef?.current?.setModalVisible(true);
  };
  const onCloseActionSheet = () => {
    return actionSheetRef?.current?.setModalVisible(false);
  };
  return {
    onOpenActionSheet,
    onCloseActionSheet,
    actionSheetRef,
  };
};
export default useBottomModal;
