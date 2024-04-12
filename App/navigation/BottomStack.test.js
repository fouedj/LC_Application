import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {BottomTabStack} from './AppNavigation';
import {NavigationContainer} from '@react-navigation/native';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('Rendering Bottom Stack', () => {
  test('renders BottomTabStack with correct tabs', () => {
    const {getByTestId} = render(<BottomTabStack />);

    // Vérifiez que les onglets sont rendus avec les libellés corrects
    const navigatorTab = getByTestId('navigator-tab-id');

    expect(navigatorTab).toBeTruthy();
  });
  test('renders BottomTabStack with correct tabs', () => {
    const {getByLabelText} = render(
      <NavigationContainer>
        <BottomTabStack />
      </NavigationContainer>,
    );

    // Vérifiez que les onglets sont rendus avec les libellés corrects
    const homeTab = getByLabelText('Home');

    expect(homeTab).toBeTruthy();
  });
});
