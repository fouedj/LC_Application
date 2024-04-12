import React from 'react';
import {render} from '@testing-library/react-native';
import ErrorScreen from '.';

describe('Error Screen testing', () => {
  test('render ErrorScreen', () => {
    const {getByTestId} = render(<ErrorScreen />);
    const ErrorRender = getByTestId('errorContainerId');
    expect(ErrorRender).toBeTruthy();
  });
});
