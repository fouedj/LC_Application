import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
type Props = {
  onPress?(): void;
  icon?: React.ReactElement;
  style?: any;
  disabled?: boolean;
};
const IconButton = ({onPress, icon, style, disabled}: Props) => {
  return (
    <TouchableOpacity
      style={style ? style : styles?.shareButtonStyles}
      onPress={onPress}
      hitSlop={{top: 15, bottom: 15, right: 15, left: 5}}
      disabled={disabled}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButtonStyles: {
    margin: Platform?.OS === 'android' ? 4 : 10,
  },
});
export default IconButton;
