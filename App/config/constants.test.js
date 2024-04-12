import React from 'react';
import {render} from '@testing-library/react-native';
import {WebViewUrlsHelpers} from './constants';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('constants', () => {
  test('test detailAnnonce helpers ', () => {
    expect(WebViewUrlsHelpers.detailsAnounce('123')).toEqual(
      `dev.lacentrale.fr/app-classified?id=123`,
    );
  });
});
