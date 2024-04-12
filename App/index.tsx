import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {RecoilRoot} from 'recoil';
import {AppContainer} from './navigation/AppNavigation';

const App = () => {
  return (
    <RecoilRoot>
      <AppContainer />
      <FlashMessage position="bottom" />
    </RecoilRoot>
  );
};
export default App;
