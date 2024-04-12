import React from 'react';
import {Box, Text} from '../components';
import {GoBackIcon} from '../components/Icon';
import mainStyles from '../styles/styles';
import {useIsFocused} from '@react-navigation/native';
import {sendPageNotification} from '../utils/tagCommander';

interface TSavedSearched {
  navigation: any;
}
const NotificationScreen: React.FC<TSavedSearched> = ({navigation}) => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      headerLeft: (props: any) => {
        return Platform.OS === 'ios' ? (
          <GoBackIcon {...props} showLeftTitle />
        ) : null;
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isFocused) {
      sendPageNotification();
    }
  }, [isFocused, navigation]);

  return (
    <Box style={mainStyles.containerEmptyResult}>
      <Box className="flex-1 items-center w-[340] h-[40] justify-center">
        {/* <Text> Aucune recherche enregistrée trouvée</Text> */}
      </Box>
    </Box>
  );
};

export default NotificationScreen;
