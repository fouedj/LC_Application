import React from 'react';
import {render} from '@testing-library/react-native';
import Footer from '.';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('Footer testing', () => {
  test('render footer', () => {
    const {getByTestId} = render(<Footer />);
    const FooterRender = getByTestId('footerId');
    expect(FooterRender).toBeDefined();
  });
});
