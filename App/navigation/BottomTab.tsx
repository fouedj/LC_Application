import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  SearchIcon,
  FavoriteIcon,
  SellIcon,
  MyAccountIcon,
} from '../components/Icon';
import {Favorites, Login, Sell} from '../screens';
import {FiltersAndListing} from './FiltersAndListing';
import {MyAccountAndParameters} from './MyAccountAndParameters';
import {SellAndDepositAndQuotation} from './SellAndDepositAndQuotation';
import {FavoriteState} from '../recoil';
import {getIsConnected} from '../utils/getUserInformations';
import {getFavoriteNumber} from '../utils/getFavNumber';
import colors from '../styles/colors';
import {Box} from '../components';
import {sendTabBarActionClick} from '../utils/tagCommander';
import UserState from '../recoil/connectedUser';
import {Platform} from 'react-native';
import mainStyles from '../styles/styles';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const favoritesNotConnected = FavoriteState.useGet()?.favoriteNotConnected;
  const favoritesConnected = FavoriteState.useGet()?.favoriteConnected;
  const isConnected = getIsConnected();
  const activeAccountTab = UserState.useGetActiveAccountTabPage();
  const renderAccountPage = {
    LOGIN: {
      component: Login,
      headerTitleAlign: 'center',
      headerShown: true,
      title: 'Mon compte',
      headerTitle: isConnected ? 'Mon compte' : 'Connexion/Inscription',
    },
    ACCOUNT: {
      component: MyAccountAndParameters,
      headerTitleAlign: 'center',
      headerShown: false,
      title: 'Mon compte',
      headerTitle: isConnected ? 'Mon compte' : 'Connexion/Inscription',
    },
  };
  const activeAccountPage = React.useMemo(() => {
    return renderAccountPage[activeAccountTab] || renderAccountPage.ACCOUNT;
  }, [activeAccountTab, isConnected]);

  return (
    <Tab.Navigator
      initialRouteName="SearchAndListing"
      screenOptions={{headerShown: true}}>
      <Tab.Screen
        initialParams="Listing"
        name="SearchAndListing"
        component={FiltersAndListing}
        listeners={{
          tabPress: e => {
            sendTabBarActionClick(
              'rechercheAnnonces',
              'recherche_annonces.click',
              'annonce',
            );
          },
        }}
        options={{
          tabBarTestID: 'filtersScreen',
          headerShown: false,
          title: 'Recherche',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Box className=" p-1">
                <SearchIcon focused={focused} />
              </Box>
            );
          },
        }}
      />
      <Tab.Screen
        name="favorite"
        initialParams={'favorite'}
        component={Favorites}
        listeners={{
          tabPress: e => {
            sendTabBarActionClick('mesFavoris', 'click.navigation', 'compte');
          },
        }}
        options={{
          title: `Favoris ${getFavoriteNumber(
            favoritesNotConnected,
            favoritesConnected,
            isConnected,
          )}`,
          tabBarLabel: 'Favoris',
          tabBarTestID: 'favScreen',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Box className=" p-1">
                <FavoriteIcon focused={focused} />
              </Box>
            );
          },
          headerShadowVisible: true,
          headerBackgroundContainerStyle: {
            borderBottomWidth: Platform?.OS === 'android' ? 1.5 : 0.5,
            borderBottomColor:
              Platform?.OS === 'android' ? colors?.grey3 : null,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: Platform?.OS === 'android' ? 0.2 : 0,
            shadowRadius: Platform?.OS === 'android' ? 2 : 0,
            elevation: 3,
          },

          headerTitleAlign: 'center',
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
      <Tab.Screen
        name="SellMenu"
        component={SellAndDepositAndQuotation}
        listeners={{
          tabPress: e => {
            sendTabBarActionClick('vendre', 'intention_depot.click', 'depot');
          },
        }}
        options={{
          headerShadowVisible: true,
          headerBackgroundContainerStyle: {
            borderBottomWidth: Platform?.OS === 'android' ? 2 : 0.5,
            borderBottomColor:
              Platform?.OS === 'android' ? colors?.grey3 : null,
          },
          title: 'Vendre',
          tabBarLabel: 'Vendre',
          tabBarTestID: 'sellMenu',
          tabBarAccessibilityLabel: 'Sell',
          headerTitleAlign: activeAccountPage.headerTitleAlign,
          headerShown: activeAccountPage.headerShown,
          headerTitle: 'Vendre',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Box className=" p-1">
                <SellIcon focused={focused} />
              </Box>
            );
          },
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: Platform?.OS === 'android' && colors?.grey1,
          },
          headerTitleStyle: {...mainStyles.title20},
        }}
      />

      <Tab.Screen
        name="myAccount"
        component={
          activeAccountPage &&
          activeAccountPage.component &&
          activeAccountPage.component
        }
        listeners={{
          tabPress: e => {
            sendTabBarActionClick('monCompte', 'click.navigation', 'compte');
          },
        }}
        options={{
          headerTitleAlign: activeAccountPage.headerTitleAlign,
          headerShown: activeAccountPage.headerShown,
          title: activeAccountPage.title,
          headerTitle: activeAccountPage.headerTitle,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Box className=" p-1">
                <MyAccountIcon focused={focused} />
              </Box>
            );
          },
          headerTitleStyle: {...mainStyles.title20},
        }}
      />
    </Tab.Navigator>
  );
}
