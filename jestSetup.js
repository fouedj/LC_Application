//import 'react-native-gesture-handler/jestSetup';
//import '@testing-library/jest-native/extend-expect';
//import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
beforeAll(() => {
  //@ts-ignore
  global.__reanimatedWorkletInit = jest.fn();
});

//jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// jest.mock('react-native-reanimated', () => {
// const Reanimated = require('react-native-reanimated/mock');

// Reanimated.default.call = () => {};

// Reanimated.useSharedValue = jest.fn;
//   Reanimated.useAnimatedStyle = jest.fn;
//   return Reanimated;
// });

//jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// jest.mock('react-native-gesture-handler', () =>
//   jest.requireActual('../node_modules/react-native-gesture-handler/jestSetup'),
// );

//jest.mock('react-native-intercom', () => {}, { virtual: true });

// jest.mock('@react-native-community/async-storage', () =>
//   require('@react-native-community/async-storage/jest/async-storage-mock'),
// );

// jest.mock('react-native-geolocation-service', () => ({
//   addListener: jest.fn(),
//   getCurrentPosition: jest.fn(),
//   removeListeners: jest.fn(),
//   requestAuthorization: jest.fn(),
//   setConfiguration: jest.fn(),
//   startObserving: jest.fn(),
//   stopObserving: jest.fn(),
// }));

export const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      publicToken: 'testToken',
    },
  }),
}));

jest.mock('react-native-config', () => ({
  Config: {
    URL_LISTING: '',
  },
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: jest.fn(),
    Screen: jest.fn(),
  }),
}));
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => ({
//     setOptions: jest.fn(),
//   }),
// }));
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: jest.fn(),
    Tab: jest.fn(),
    Screen: jest.fn(),
  }),
}));

// jest.mock('react-native-webview', () => {
//   return {__esModule: true, default: jest?.fn()?.mockReturnValue(null)};
// });

jest.mock('recoil', () => {
  return {
    atom: jest.fn(),
    useRecoilValue: jest.fn(),
    useSetRecoilState: jest.fn(),
    RecoilRoot: jest.fn(),
  };
});

// jest.mock('react-native', () => ({
//   NativeModules: () => ({
//     sendPageViewEvent: jest.fn().mockName('sendPageViewEvent'),
//     initTCServerSide: jest.fn().mockName('initTCServerSide'),
//   }),
// }));
// }));
// jest.mock('react-native-safe-area-context', () => {
//   const React = require('react');
//   class MockSafeAreaProvider extends React.Component {
//     render() {
//       const {children} = this.props;
//       return React.createElement('SafeAreaProvider', this.props, children);
//     }
//   }
//   return {
//     useSafeAreaInsets: () => ({top: 1, right: 2, bottom: 3, left: 4}),
//     SafeAreaProvider: MockSafeAreaProvider,
//   };
// });
