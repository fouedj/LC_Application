import React, {ReactNode} from 'react';
import {View, ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import colors from '../../styles/colors';

interface LoaderProps {
  size?: 'small' | 'large' | number;
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = colors?.lc_blue,
  backgroundColor = colors?.white,
  style,
  children,
}) => {
  return (
    <View
      testID="activityIndicatorContainer"
      className="backgroundOpacity"
      style={{
        backgroundColor: backgroundColor
      }}
      >
      <ActivityIndicator
        className="activityIndicator"
        size={size}
        color={color}
        testID="activityIndicator"
      />
      {children}
    </View>
  );
};

export default Loader;
