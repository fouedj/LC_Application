import React from 'react';
import Text from '../Text';
import Box from '../Box';
import mainStyles from '../../styles/styles';
import {textBody} from '../../config/constantString';
import ToggleSwitch from 'toggle-switch-react-native';

import {SavedSearch} from '../../storage/savedSearch';
import {Platform, TouchableOpacity, Alert, Linking} from 'react-native';
import colors from '../../styles/colors';
import classNames from 'classnames';
import {filter} from 'lodash';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Notifications} from 'react-native-notifications';

type Props = {
  item: SavedSearch;
  onPress: (item: SavedSearch, index: number) => void;
  index: number;
  hash: string;
  onToggle: (isOn: boolean, hash: string) => void;
  notificationDeviceToken: () => string | undefined;
};

function renderCriterias(criteriaList: string[][], maxCriteria: number = 3, maxCharLength: number = 40): string {
  // Vérifier si la liste des critères est vide ou nulle
  if (!criteriaList || criteriaList.length === 0) {
    return "";
  }

  // Aplatir la liste des critères pour faciliter le traitement
  const flattenedCriteria = criteriaList.flatMap(criterion => criterion);

  // Join les critères avec une virgule pour obtenir une chaîne formatée
  let formattedCriteria = flattenedCriteria.join(", ");

  // Vérifier si la longueur de la chaîne résultante dépasse la limite spécifiée
  for (let i = maxCriteria; formattedCriteria.length > maxCharLength; i--) {
    // Réduire le nombre maximum de critères à afficher
    maxCriteria = i;
    formattedCriteria = flattenedCriteria.slice(0, i).join(", ");
  }

  // Si le nombre total de critères dépasse le nombre maximum affiché
  if (flattenedCriteria.length > maxCriteria) {
    const remainingCount = flattenedCriteria.length - maxCriteria;
    const remainingText = ` + ${remainingCount} filtre${remainingCount === 1 ? "" : "s"}`;
    // Ajouter le texte des filtres restants à la chaîne formatée
    return formattedCriteria + remainingText;
  }

  // Retourner la chaîne formatée des critères
  return formattedCriteria;
}


// Fonction pour ouvrir les paramètres
const openSettings = () => {
  Linking.openSettings();
};

const showParamsAlert = () => {
  Alert.alert(
    'Activer les notifications',
    'Voulez-vous ouvrir les paramètres pour activer les notifications?',
    [
      {
        text: 'Non',
        style: 'cancel',
      },
      {text: 'Oui', onPress: () => openSettings()},
    ],
  );
};

export default function SavedSearchItem({
  item,
  onPress,
  index,
  hash,
  onToggle,
  notificationDeviceToken,
}: Props) {
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

    return renderCriterias(removeUndefinedOrNull(filters));
  };

  const removeUndefinedOrNull = array => {
    return array.reduce((acc, item) => {
      if (Array.isArray(item)) {
        const tab = item.filter(Boolean);
        if (tab.length > 0) {
          acc.push(tab);
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const [isToogleOn, setIsToogleOn] = React.useState(
    globalThis.notificationDeviceToken &&
      notificationDeviceToken() &&
      globalThis.notificationDeviceToken === notificationDeviceToken(),
  );

  return (
    <Box className="grow shrink">
      {/* bg-white à conserver -> il permet l'affichage de la shadow */}
      <Box
        className="mx-[20] my-[10] bg-white"
        style={mainStyles.cardShadow}>
        <Box className="p-[10]" style={{borderRadius: 8}}>
          <TouchableOpacity onPress={() => onPress(item, index)}>
            <Box className="flex-row justify-between">
              <Box>
                {/*//Title*/}
                {title() && (
                  <Text
                    style={mainStyles.title20}
                    className={classNames({
                      'font-semibold': Platform.OS === 'ios',
                      'font-bold': Platform.OS === 'android',
                      'mb-2 text-left': true,
                    })}>
                    {title()}
                  </Text>
                )}
                {/*//Subtitle*/}
                {subtitle() && (
                  <Text style={mainStyles.text14}>{subtitle()}</Text>
                )}
              </Box>
              {/* A inclure plus tard: pastille signalant de nouvelles annonces correspondant à la RE */}
              {/* <Box className="rounded-full bg-blue-500 h-2 w-2 mt-2" /> */}
            </Box>
            <Box className="border-b-[#D9D9D9] border-b my-3" />
            <Box className="flex flex-row justify-between">
              <Text style={mainStyles.text14}>
                {textBody.notificationsPush}
              </Text>
              <ToggleSwitch
                isOn={isToogleOn}
                onColor={colors.lc_button_blue}
                offColor={colors.grey_light}
                size="medium"
                onToggle={(isOn: any) => {
                  if (Platform.OS === 'android') {
                    checkNotifications().then(({status, settings}) => {
                      if (status === 'granted') {
                        setIsToogleOn(isOn);
                        onToggle(isOn, hash);
                      } else {
                        requestNotifications(['alert', 'sound']).then(
                          ({status, settings}) => {
                            if (status === 'blocked') {
                              showParamsAlert();
                            } else {
                              setIsToogleOn(isOn);
                              onToggle(isOn, hash);
                            }
                          },
                        );
                      }
                    });
                  } else {
                    // if iOS
                    Notifications.ios
                      .checkPermissions()
                      .then(currentPermissions => {
                        if (currentPermissions.notificationCenter) {
                          Notifications.registerRemoteNotifications();
                          setIsToogleOn(isOn);
                          onToggle(isOn, hash);
                        } else {
                          showParamsAlert();
                        }
                      });
                  }
                }}
              />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
