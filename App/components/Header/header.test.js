import React from 'react';
import {render} from '@testing-library/react-native';
import Container from '.';
import Header from '.';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('Header Testing', () => {
  test('render Header', () => {
    const {getByTestId} = render(<Header />);
    const header = getByTestId('headerID');
    expect(header).toBeDefined();
  });
});
