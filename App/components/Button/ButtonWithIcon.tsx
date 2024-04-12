import {TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import * as React from 'react';
import Text from '../Text';
import Box from '../Box';
import {Animated} from 'react-native';

type Props = {
  title?: string;
  onPress?: any;
  isLoading?: boolean;
  style?: object;
  textStyle?: object;
  onLongPress?: any;
  leftIcon?: React.ReactNode;
  showTitle?: boolean;
};
export default function ButtonWithIcon(props: Props) {
  const {onPress, onLongPress, isLoading, title, style, textStyle, ...rest} =
    props;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      {...rest}
      activeOpacity={Platform.OS === 'android' ? 0.8 : 0}>
      <Animated.View style={style}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Box className="flex flex-row items-center">
            {props.leftIcon}
            {props.showTitle ? <Text style={textStyle}>{title}</Text> : null}
          </Box>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
