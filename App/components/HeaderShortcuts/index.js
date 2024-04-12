import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import Text from '../Text';

const HeaderShortcuts = ({text, isLoading = false}) => {
  return (
    <View style={styles.header}>
      <View style={styles.separator} />
      <View style={styles.content}>
        <Text style={styles.headerText}>{text}</Text>
        {isLoading && <ActivityIndicator />}
      </View>
    </View>
  );
};

export default HeaderShortcuts;
