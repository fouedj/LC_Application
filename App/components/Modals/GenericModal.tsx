import * as React from 'react';
import Modal from 'react-native-modal';
import Box from '../Box';

import IconButton from '../Button/IconButton';
import {CloseIcon} from '../Icon';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  bodyStyle?: string | any;
  closeButton?: boolean;
  confirmButton?: boolean;
  titleCloseButton?: string;
  styleCloseButton?: any;
  containerTitleWithIcon?: any;
  styleTextCloseButton?: any;
  styleModalTitle: any;
  bodyText: string;
  titleConfirmButton: string;
  styleContainerConfirmButton?: any;
  styleTitleButtonConfirm?: any;
  isLoading: boolean;
  isVisibleSort: boolean;
  actionSheetRef: any;
  close?: boolean;
  onCloseActionSheet: () => void;
  displayList: boolean;
  containerTitle?: any;
  containerClose?: any;
  closeIcon?: any;
  modalContentWithCloseIcon?: any;
  modalContentWithoutCloseIcon?: any;
}

const GenericModal: React.ForwardedRef<CustomModalProps> = ({
  visible,
  onClose,
  close,
  closeIcon,
  body,
  footer,
  header,
}: any) => {
  return (
    <>
      <Modal
        isVisible={visible}
        style={{alignItems: 'center'}}
        backdropOpacity={0.6}
        onBackdropPress={onClose} // Fermer le modal lorsque l'utilisateur clique à l'extérieur
        animationIn="bounceIn"
        animationOut="bounceOut">
        <Box>
          <Box className="p-2 w-[318] h-[308] bg-white rounded-tl-[11] rounded-tr-[11] rounded-bl-[11] rounded-br-[11] ">
            <Box className="flex flex-row justify-center items-center p-3">
              {header}
            </Box>
            <Box className="p-1">{body}</Box>

            {footer}
            {close && (
              <Box className="absolute ios:top-2 android:top-3 right-1">
                <IconButton
                  icon={<CloseIcon />}
                  onPress={onClose}
                  style={closeIcon}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GenericModal;
