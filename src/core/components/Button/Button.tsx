import {TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import React from 'react';
import Text from '../Text/Text';

type Props = {
  title: string;
  onPress?: (event: Event) => void | Promise<void>;
  isLoading: boolean;
  onLongPress?: (event: Event) => void;
};
export default function Button(props: Props) {
  const {onPress, onLongPress, isLoading, title} = props;

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
  if (Platform.OS === 'android') {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...props}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
