import React, {useRef, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import {
  AnnounceDetail,
  Login,
  Logout,
  Parameters,
  CmpScreen,
  NotificationScreen,
} from '../screens';
import BottomTab from './BottomTab';
import {useInitError} from '../recoil/error';
import colors from '../styles/colors';
import {Box, ConnectionStatus} from '../components';
import {Environment} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState, Platform, StatusBar, StyleSheet, View} from 'react-native';
import QuotationDetails from '../screens/QuotationDetails';
import {firebase} from '@react-native-firebase/analytics';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {NetworkState} from '../recoil';
import {get} from 'lodash';
import RNRestart from 'react-native-restart';
import mainStyles from '../styles/styles';

const App = createNativeStackNavigator();

export const AppContainer = ({navigation}: {navigation: any}) => {
  //init Sentry
  Sentry.init({
    dsn: 'https://ba5d9cc0c5a3305b95eb624a24d090e5@o86572.ingest.sentry.io/4505635106193408',
    tracesSampleRate: 1.0, //1.0 = 100% de monitoring -> on veut peut-être ajuster le chiffre une fois en prod
    environment: Environment.environment,
  });
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation(); // Construct a new instrumentation instance. This is needed to communicate between the integration and React

  const initError = useInitError();
  const navigationUseRef = React.useRef();
  var appBackgroundDate: Date | null = null; //we can not use state because it cause crashes in this usecase

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        //save the date when the app goes to background
        appBackgroundDate = new Date();
        // setAppBackgroundDate(new Date().toString());
      } else if (nextAppState === 'active') {
        //check if appBackgroundDate has not spent more than 30 minutes than new Date()
        if (!appBackgroundDate) {
          return;
        }
        const diff = Math.abs(new Date() - appBackgroundDate);
        const minutes = Math.floor(diff / 1000 / 60);
        if (minutes >= 30 && globalThis.getInitialNotification != true) {
          RNRestart.restart();
        }
      }
      return () => {
        subscription.remove();
      };
    });
  }, []);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  //init firebase
  const initFirebase = async () => {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  };
  initFirebase();

  const getTrackingStatusPrompt = async () => {
    await requestTrackingPermission();
  };
  getTrackingStatusPrompt();

  const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken !== null) {
        globalThis.accessToken = accessToken;
      }
    } catch (e) {
      // error reading value
    }
  };
  const getRefreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken !== null) {
        globalThis.refreshToken = refreshToken;
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    //get tokens from AsyncStorage
    getAccessToken();
    getRefreshToken();

    Platform.OS === 'ios'
      ? StatusBar.setBarStyle('dark-content')
      : StatusBar.setBarStyle('default');
  }, []);

  const styles = StyleSheet.create({
    disableScreen: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      flex: 1,
      opacity: 0.35,
      backgroundColor: colors.blackPro,
      zIndex: 3,
    },
  });

  const isConnected = NetworkState?.useGetNetworkState();

  return (
    <ConnectionStatus>
      <NavigationContainer
        onReady={() => {
          // Register the navigation container with the instrumentation
          routingInstrumentation.registerNavigationContainer(navigationUseRef);
        }}>
        <App.Navigator
          screenOptions={{headerShown: false}}
          screenListeners={{
            state: ({data}) => {
              initError();
            },
          }}>
          <App.Screen name="BottomTab" component={BottomTab} />

          <App.Screen
            name="AnnounceDetail"
            component={AnnounceDetail}
            options={{
              headerBackTitle: 'retour',
              headerShown: true,
              headerLeft: () => null,
              headerTitleStyle: {...mainStyles.title20},
              headerTitleAlign: 'center',
            }}
          />
          <App.Screen
            name="QuotationDetails"
            component={QuotationDetails}
            options={{
              title: 'Cote La Centrale',
              headerBackTitle: 'retour',
              headerLeft: () => null,
              headerTitleAlign: 'center',
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
          <App.Screen
            name="Login"
            component={Login}
            options={{
              headerBackTitle: 'retour',
              headerTitle: 'Connexion/Inscription',
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => <Box />,
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
          <App.Screen
            name="Logout"
            component={Logout}
            options={{
              headerBackTitle: 'retour',
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => null,
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
          <App.Screen
            name="Parameters"
            component={Parameters}
            options={{
              headerBackTitle: 'retour',
              headerShown: true,
              headerLeft: () => null,
              headerTitleAlign: 'center',
              title: 'Paramètres',
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
          <App.Screen
            name="CmpScreen"
            component={CmpScreen}
            options={{
              headerBackTitle: 'retour',
              headerShown: true,
              headerLeft: () => null,
              headerTitleAlign: 'center',
              title: 'Charte cookies',
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
          <App.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              headerBackTitle: 'retour',
              headerShown: true,
              headerLeft: () => null,
              headerTitleAlign: 'center',
              title: 'Notifications',
              headerTitleStyle: {...mainStyles.title20},
            }}
          />
        </App.Navigator>
        {isConnected ? '' : <View style={styles.disableScreen}></View>}
      </NavigationContainer>
    </ConnectionStatus>
  );
};
