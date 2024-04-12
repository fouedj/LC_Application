import React from 'react';
import {View} from 'react-native';
import SearchShortcutsCell from './searchShortcutsCell';
import styles from './styles';
import {HeaderShortcuts} from '../../components';
import SHORTCUTS from './constants';

const SearchShortcuts = ({navigation}) => {
  const goToListing = url => {
    navigation.navigate('Filters', {hiddenLoader: true});
    navigation.navigate('Listing', {url: url});
  };
  return (
    <View>
      <HeaderShortcuts text="Trouvez votre occasion idéale" />
      <View style={styles.container}>
        {SHORTCUTS.map((shortcut, index) => (
          <SearchShortcutsCell
            key={index}
            item={shortcut}
            onPress={() => goToListing(shortcut.url)}
          />
        ))}
      </View>
    </View>
  );
};

export default SearchShortcuts;
