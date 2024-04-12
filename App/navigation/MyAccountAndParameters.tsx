import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyAccount from '../screens/MyAccount';
import Parameters from '../screens/Parameters';
import {
  SavedSearches,
  MessageScreen,
  MyProfile,
  MyAppointmentsScreen,
  AdsOptionsScreen,
} from '../screens';
import {myAccount} from '../config/constantString';
import {Text} from '../components';
import colors from '../styles/colors';
import AdsScreen from '../screens/AdsScreen';
import mainStyles from '../styles/styles';

const AccountAndParameters = createNativeStackNavigator();

export const MyAccountAndParameters = () => {
  return (
    <AccountAndParameters.Navigator initialRouteName="Filters">
      <AccountAndParameters.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerBackTitle: 'retour',
          headerLeft: () => null,
          title: 'Mon compte',
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="Parameters"
        component={Parameters}
        options={{
          title: 'Paramètres',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="MyAppointments"
        component={MyAppointmentsScreen}
        options={{
          title: 'Mes rendez-vous',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="SavedSearchs"
        component={SavedSearches}
        options={{
          headerBackTitle: 'retour',
          headerShown: true,
          headerLeft: () => null,
          headerTitleAlign: 'center',
          title: myAccount?.SavedSearchs,
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerBackTitle: 'retour',
          headerShown: true,
          headerLeft: () => null,
          headerTitleAlign: 'center',
          title: myAccount?.MessageScreen,
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: myAccount?.MyProfile,
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="AdsScreen"
        component={AdsScreen}
        options={{
          headerBackTitle: 'retour',
          headerShown: true,
          headerLeft: () => null,
          headerTitleAlign: 'center',
          title: myAccount?.AdsScreen,
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <AccountAndParameters.Screen
        name="AdsScreenOptions"
        component={AdsOptionsScreen}
        options={{
          headerBackTitle: 'retour',
          headerShown: true,
          headerLeft: () => null,
          headerTitleAlign: 'center',
          title: myAccount?.AdsScreen,
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
    </AccountAndParameters.Navigator>
  );
};
