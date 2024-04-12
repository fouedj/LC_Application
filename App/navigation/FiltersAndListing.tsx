import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Filters from '../screens/Filters';
import Listing from '../screens/Listing';
import mainStyles from '../styles/styles';

const Search = createNativeStackNavigator();

export const FiltersAndListing = () => {
  return (
    <Search.Navigator initialRouteName="Filters">
      <Search.Screen
        name="Filters"
        component={Filters}
        options={{
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
          title: 'Recherche',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <Search.Screen
        name="Listing"
        component={Listing}
        options={{
          headerBackTitle: 'retour',
          headerLeft: () => null,
          headerTitleAlign: 'center',
        }}
      />
    </Search.Navigator>
  );
};
