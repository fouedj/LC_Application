import * as React from 'react';
import Box from '../Box';
import Button from '../Button';
import Text from '../Text';
import styles from '../../styles/styles';
import ToggleSwitch from 'toggle-switch-react-native';
import colors from '../../styles/colors';
import {Alert, Linking, Platform} from 'react-native';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Notifications} from 'react-native-notifications';
import {sendClickOnSavedSearchModal} from '../../utils/tagCommander';
import mainStyles from '../../styles/styles';
import { ScrollView } from 'react-native';

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

const Badge = ({title}: any) => {
  return (
    <Box className="bg-bgBadge py-[4] px-[8] mr-[8] rounded-lg flex-row">
      <Text className="text-[#5057F4] text-center font-semibold">{title}</Text>
    </Box>
  );
};

export default function SearchParamsModalContent({
  onSaveParams,
  searchParam,
}: any) {
  const [isToogleOn, setIsToogleOn] = React.useState(false);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      checkNotifications().then(({status, settings}) => {
        if (status === 'granted') {
          setIsToogleOn(true);
        }
      });
    } else {
      Notifications.ios.checkPermissions().then(currentPermissions => {
        if (currentPermissions.notificationCenter) {
          setIsToogleOn(true);
        }
      });
    }
  }, []);

  return (
    <Box className="items-center h-[177] justify-start w-full">
      <Box className="flex items-start justify-start flex-1 w-full">
        <Text className="mb-[8] justify-start items-start" style={mainStyles.text16}>
          Vos critères sélectionnés :
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row ">
          {searchParam &&
            searchParam.map((item: any) => {
              return <Badge title={item} />;
            })}
        </ScrollView>
      </Box>
      <Box className="w-full border-b border-[#D9D9D9] my-[16]" />
      <Box className="flex h-[88] w-full">
        <Box className="flex flex-row justify-between w-full">
          <Text className="text-black text-base font-bold">
            Activer les notifications push
          </Text>
          {/**@ts-ignore */}
          <Box>
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
                    } else {
                      requestNotifications(['alert', 'sound']).then(
                        ({status, settings}) => {
                          if (status === 'blocked') {
                            showParamsAlert();
                          } else {
                            setIsToogleOn(isOn);
                          }
                        },
                      );
                    }
                  });
                } else {
                  // if iOS
                  Notifications.registerRemoteNotifications();
                  Notifications.ios
                    .checkPermissions()
                    .then(currentPermissions => {
                      if (currentPermissions.notificationCenter) {
                        setIsToogleOn(isOn);
                      } else {
                        showParamsAlert();
                      }
                    });
                }
              }}
            />
          </Box>
        </Box>
        <Box className="items-center">
          <Button
            style={styles?.saveSearch}
            title="Enregistrer"
            textStyle={styles?.textRefreshButton}
            onPress={isOn => {
              onSaveParams(isToogleOn);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
