import {TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import React from 'react';
import Text from '../Text';

type Props = {
  title?: string;
  onPress?: (event: Event) => void | Promise<void>;
  isLoading?: boolean;
  style?: object;
  textStyle?: object;
  onLongPress?: (event: Event) => void;
};
export default function Button(props: Props) {
  const {onPress, onLongPress, isLoading, title, style, textStyle} = props;

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={style}
        {...props}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  } else if (Platform.OS === 'android') {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...props}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
}
