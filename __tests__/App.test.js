/**
 * @format
 */
import React from 'react';

import {render} from '@testing-library/react-native';
import {AppContainer} from '../App/navigation/NavigationStack';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('App container', () => {
  test('render App container', () => {
    const screen = render(<AppContainer />);
    expect(screen).toBeDefined();
  });
});
