import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import mainStyles from '../../styles/styles';
import Text from '../Text';

interface RadioButtonProps {
  label: string;
  onSelect: () => void;
  icon: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({label, onSelect, icon}) => {
  return (
    <TouchableOpacity style={mainStyles.containertSortModal} onPress={onSelect}>
      <Text style={mainStyles.labelSortModalRadioButton}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );
};

export default RadioButton;
