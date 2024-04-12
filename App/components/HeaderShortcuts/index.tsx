import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import Text from '../Text';

interface HeaderShortcutsProps {
  text: string;
  style?: StyleProp<ViewStyle>; //si on va ajouter de style personnalisés
}

const HeaderShortcuts: React.FC<HeaderShortcutsProps> = ({text, style}) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.separator} />
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

export default HeaderShortcuts;
