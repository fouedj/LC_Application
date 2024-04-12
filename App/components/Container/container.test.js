import React from 'react';
import {render} from '@testing-library/react-native';
import Container from '.';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('App container', () => {
  test('render App container', () => {
    const screen = render(<Container />);
    expect(screen).toBeDefined();
  });
});
