import React from 'react';
import {Box, Text} from '../components';
import {FlatList, TouchableOpacity} from 'react-native';
import mainStyles from '../styles/styles';
import {ChevronLeft, ChevronRight} from '../components/Icon';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {parameters} from '../config/constantString';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
import {
  sendPageParameters,
  sendClickOnParametersList,
} from '../utils/tagCommander';
import colors from '../styles/colors';

export default function Parameters({route, navigation}: any) {
  const isFocused = useIsFocused();
  const parametersList = Object.values(parameters).map(param => {
    return {label: param};
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => {
        return <ChevronLeft {...props} showLeftTitle />;
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isFocused) {
      sendPageParameters();
    }
  }, [isFocused, navigation]);

  const renderSeparator = () => (
    <Box className="border-b-backgroundLine border-b-0.5 mx-[20] my-[16] " />
  );

  return (
    <Box testID="parameterId" className="bg-white	flex-1">
      <Box className="mt-[17]">
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          data={parametersList}
          key={'parametersList'}
          renderItem={({item}) => (
            <Box>
              <TouchableOpacity
                onPress={async () => {
                  switch (item.label) {
                    case parameters?.myProfile:
                      sendClickOnParametersList('monProfil');
                      navigation.navigate('MyProfile');
                      break;
                    case parameters?.myAppointments:
                      sendClickOnParametersList('myAppointments');
                      navigation.navigate('MyAppointments');
                      break;
                    case parameters?.termsAndConditions:
                      sendClickOnParametersList('conditionsGenerales');
                      openInAppBrowser(
                        'https://www.lacentrale.fr/informations/conditions-generales',
                      );
                      break;
                    case parameters?.legaleNotice:
                      sendClickOnParametersList('mentionsLegales');
                      openInAppBrowser(
                        'https://www.lacentrale.fr/informations/mentions-legales',
                      );
                      break;
                    case parameters?.classementInformation:
                      sendClickOnParametersList('infosClassement');
                      openInAppBrowser(
                        'https://www.lacentrale.fr/informations/information-classement',
                      );
                      break;
                    case parameters?.cookiesPolicy:
                      sendClickOnParametersList('charteCookie');
                      navigation.navigate('CmpScreen');
                      break;
                    case parameters?.privacyPolicies:
                      sendClickOnParametersList('politiqueConfidentialite');
                      openInAppBrowser(
                        'https://www.lacentrale.fr/informations/politique-confidentialite',
                      );
                      break;
                  }
                }}>
                <Box>
                  <Box className="flex-row justify-between">
                    <Text style={mainStyles.cellSimpleTextStyle}>
                      {item.label}
                    </Text>
                    <ChevronRight
                      style={{marginRight: 20}}
                      color={colors?.grey1}
                    />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          )}
        />
        {renderSeparator()}
      </Box>
      <Text style={mainStyles.version}>Version {DeviceInfo.getVersion()}</Text>
    </Box>
  );
}
