import React from 'react';
import Text from '../Text';
import Box from '../Box';
import mainStyles from '../../styles/styles';
import {SavedSearch} from '../../storage/savedSearch';

type Props = {
  item: SavedSearch;
  hash: string;
};

function renderCriterias(
  criteriaList: string[][],
  maxCriteria: number = 3,
  maxCharLength: number = 40,
): string {
  // Vérifier si la liste des critères est vide ou nulle
  if (!criteriaList || criteriaList.length === 0) {
    return '';
  }

  // Aplatir la liste des critères pour faciliter le traitement
  const flattenedCriteria = criteriaList.flatMap(criterion => criterion);

  // Join les critères avec une virgule pour obtenir une chaîne formatée
  let formattedCriteria = flattenedCriteria.join(', ');

  // Vérifier si la longueur de la chaîne résultante dépasse la limite spécifiée
  for (let i = maxCriteria; formattedCriteria.length > maxCharLength; i--) {
    // Réduire le nombre maximum de critères à afficher
    maxCriteria = i;
    formattedCriteria = flattenedCriteria.slice(0, i).join(', ');
  }

  // Si le nombre total de critères dépasse le nombre maximum affiché
  if (flattenedCriteria.length > maxCriteria) {
    const remainingCount = flattenedCriteria.length - maxCriteria;
    const remainingText = ` + ${remainingCount} filtre${
      remainingCount === 1 ? '' : 's'
    }`;
    // Ajouter le texte des filtres restants à la chaîne formatée
    return formattedCriteria + remainingText;
  }

  // Retourner la chaîne formatée des critères
  return formattedCriteria;
}

export default function SavedSearchItemLanding({item}: Props) {
  const {categories, makesModelsCommercialNames, ...others} = item;

  if (others.families) {
    delete others.families;
  }

  const title = () => {
    if (categories || makesModelsCommercialNames) {
      const filters = [];
      if (categories) {
        filters.push(categories);
      }
      if (makesModelsCommercialNames) {
        filters.push(makesModelsCommercialNames);
      }

      return renderCriterias(filters);
    } else {
      return '';
    }
  };

  const subtitle = () => {
    const filters = Object.values(others);
    return renderCriterias(filters);
  };
  return (
    <Box className="grow shrink">
      {/* bg-white à conserver -> il permet l'affichage de la shadow */}
      <Box
        className="mx-[10] my-[10] bg-white"
        style={mainStyles.cardShadowSavedSearchHome}>
        <Box className="p-[10]" style={{borderRadius: 8}}>
          <Box>
            <Box className="flex-row justify-between">
              <Box>
                {/*//Title*/}
                {title() && <Text style={mainStyles.title20}>{title()}</Text>}
                {/*//Subtitle*/}
                {subtitle() && (
                  <Text style={mainStyles.text14}>{subtitle()}</Text>
                )}
              </Box>
              {/* A inclure plus tard: pastille signalant de nouvelles annonces correspondant à la RE */}
              {/* <Box className="rounded-full bg-blue-500 h-2 w-2 mt-2" /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
