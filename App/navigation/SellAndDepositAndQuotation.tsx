import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sell from '../screens/Sell';
import DepositScreen from '../screens/DepositScreen';
import colors from '../styles/colors';
import {DepositConfirm} from '../screens';
import QuotationScreen from '../screens/QuotationLanding';
import QuotationListing from '../screens/QuotationListing';
import RachatExpress from '../screens/RachatExpress';
import mainStyles from '../styles/styles';

const SellAndDepositAndQuotationStackNav = createNativeStackNavigator();

export const SellAndDepositAndQuotation = () => {
  return (
    <SellAndDepositAndQuotationStackNav.Navigator initialRouteName="Filters">
      <SellAndDepositAndQuotationStackNav.Screen
        name="Sell"
        component={Sell}
        options={{
          headerBackTitle: 'retour',
          headerLeft: () => null,
          title: 'Vendre',
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <SellAndDepositAndQuotationStackNav.Screen
        name="RachatExpress"
        component={RachatExpress}
        options={{
          title: 'Rachat Express',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <SellAndDepositAndQuotationStackNav.Screen
        name="DepositScreen"
        component={DepositScreen}
        options={{
          title: 'Déposer une annonce',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <SellAndDepositAndQuotationStackNav.Screen
        name="DepositConfirmation"
        component={DepositConfirm}
        options={{
          title: 'Déposer une annonce',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <SellAndDepositAndQuotationStackNav.Screen
        name="QuotationLanding"
        component={QuotationScreen}
        options={{
          title: 'Cote La Centrale',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <SellAndDepositAndQuotationStackNav.Screen
        name="QuotationListing"
        component={QuotationListing}
        options={{
          title: 'Cote La Centrale',
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
    </SellAndDepositAndQuotationStackNav.Navigator>
  );
};
