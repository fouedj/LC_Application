import * as React from 'react';
import Modal from 'react-native-modal';
import Box from '../Box';
import Button from '../Button';
import IconButton from '../Button/IconButton';
import {CloseIcon} from '../Icon';
import ListIformationsModal from '../ListIformationsModal';
import Text from '../Text';

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

const ConfirmationModal: React.ForwardedRef<CustomModalProps> = ({
  visible,
  onClose,
  title,
  bodyStyle,
  closeButton,
  titleCloseButton,
  styleCloseButton,
  styleTextCloseButton,
  styleModalTitle,
  bodyText,
  confirmButton,
  titleConfirmButton,
  styleContainerConfirmButton,
  onConfirm,
  styleTitleButtonConfirm,
  isLoading,
  close,
  displayList,
  containerTitleWithIcon,
  containerTitle,
  containerClose,
  closeIcon,
  modalContentWithCloseIcon,
  modalContentWithoutCloseIcon,
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
        <Box
          style={
            close && title
              ? modalContentWithCloseIcon
              : modalContentWithoutCloseIcon
          }
          className='px-[15] py-[16]'>
          <Box className="mb-[16] items-center">
            <Box className="mb-[16] items-center flex-row justify-center">
              {close && title ? (
                <Box style={containerTitleWithIcon}>
                  <Box style={containerTitle}>
                    <Text style={styleModalTitle}>{title}</Text>
                  </Box>
                  <Box style={containerClose}>
                    <IconButton
                      icon={<CloseIcon />}
                      onPress={onClose}
                      style={closeIcon}
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Text style={styleModalTitle}>{title}</Text>
                </Box>
              )}
            </Box>
            <Box
              className={
                displayList
                  ? 'flex justify-center items-center px-[13]'
                  : 'flex justify-center items-center px-8'
              }>
              {bodyText && (
                <Text numberOfLines={2} style={bodyStyle}>
                  {bodyText}
                </Text>
              )}
              {displayList && <ListIformationsModal />}
            </Box>
          </Box>
          <Box className="flex flex-row space-x-10">
            {closeButton && (
              <Button
                title={titleCloseButton}
                style={styleCloseButton}
                textStyle={styleTextCloseButton}
                onPress={onClose}
              />
            )}
            {confirmButton && (
              <Button
                title={titleConfirmButton}
                textStyle={styleTitleButtonConfirm}
                onPress={onConfirm}
                style={styleContainerConfirmButton}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
