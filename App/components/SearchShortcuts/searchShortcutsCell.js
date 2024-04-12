import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import styles from './styles';
import Text from '../Text';

const SearchShortcutsCell = ({item, onPress}) => {
  const numberOfColumns = getNumberOfColumns();
  const {name, image, originalImageWidth, originalImageHeight} = item;
  const cardWidth = calculateCardWidth(numberOfColumns);
  /* Hauteur de l'image = 50% de la hauteur de la cellule
  (hauteur de la cellule = 70% la largeur de la cellule )
  */
  const imageHeight = cardWidth * 0.7 * 0.4;
  const imageWidth = calculateImageWidth(
    imageHeight,
    originalImageWidth,
    originalImageHeight,
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, {width: cardWidth}]}>
        <Image
          source={image}
          style={[styles.image, {width: imageWidth, height: imageHeight}]}
        />
        <Text style={styles.cardText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getNumberOfColumns = () => {
  const screenWidth = Dimensions.get('window').width;
  if (screenWidth >= 900) {
    return 6; // Pour les grands tablettes, 6 colonnes
  } else if (screenWidth >= 600) {
    return 3; // Pour les tablettes normales, 3 colonnes
  }
  return 2; // Pour les téléphones, 2 colonnes
};

const calculateCardWidth = numberOfColumns => {
  const screenWidth = Dimensions.get('window').width;
  const marginLeftRight = 20 * 2;
  const gap = 16 * (numberOfColumns - 1);
  const availableWidth = screenWidth - marginLeftRight - gap;
  return availableWidth / numberOfColumns;
};

const calculateImageWidth = (
  cardWidth,
  originalImageWidth,
  originalImageHeight,
) => {
  // Calculer la largeur de l'image en fonction de sa taille originale
  return (cardWidth * originalImageWidth) / originalImageHeight;
};

export default SearchShortcutsCell;
