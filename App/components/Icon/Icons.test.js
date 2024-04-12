import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import FavoriteIcons from './Favorite';
import GoBackIcon from './GoBack';
import HomeIcon from './Home';
import MyAccountIcons from './MyAccount';
import SearchIcons from './Search';

// Note: test renderer must be required after react-native.

//Initial Test App Rendering
describe('App Icons', () => {
  test('render Favorite Icon', () => {
    const {getByTestId} = render(<FavoriteIcons focused={true} />);
    const favoriteIconsClicked = getByTestId('favorite-icons-clicked');
    expect(favoriteIconsClicked).toBeTruthy();
  });
  test('render Favorite Icon not Clicked', () => {
    const {getByTestId} = render(<FavoriteIcons focused={false} />);
    const favoriteIconsNotClicked = getByTestId('favorite-icons-not-clicked');
    expect(favoriteIconsNotClicked).toBeTruthy();
  });
  test('render Home Icon', () => {
    const {getByTestId} = render(<HomeIcon focused={true} />);
    const homeIconsClicked = getByTestId('home-icons-clicked');
    expect(homeIconsClicked).toBeTruthy();
  });
  test('render Home Icon Not Clicked', () => {
    const {getByTestId} = render(<HomeIcon focused={false} />);
    const homeIconsNotClicked = getByTestId('home-icons-not-clicked');
    expect(homeIconsNotClicked).toBeTruthy();
  });
  test('render MyAccounte Icon Clicked', () => {
    const {getByTestId} = render(<MyAccountIcons focused={true} />);
    const MyAccountIconsClicked = getByTestId('myAccount-icons-clicked');
    expect(MyAccountIconsClicked).toBeTruthy();
  });
  test('render search Icon Clicked', () => {
    const {getByTestId} = render(<SearchIcons focused={true} />);
    const SearchIconsClicked = getByTestId('search-icons-clicked');
    expect(SearchIconsClicked).toBeDefined();
  });
  test('render search Icon Not Clicked', () => {
    const {getByTestId} = render(<SearchIcons focused={false} />);
    const SearchIconsNotClicked = getByTestId('search-icons-NotClicked');
    expect(SearchIconsNotClicked).toBeDefined();
  });
  test('render myAccount Icon Not Clicked', () => {
    const {getByTestId} = render(<MyAccountIcons focused={false} />);
    const MayAccounteIconsNotClicked = getByTestId(
      'myAccount-icons-notClicked',
    );
    expect(MayAccounteIconsNotClicked).toBeTruthy();
  });
  test('render Go back Icon', () => {
    const navigationMock = {
      goBack: jest.fn(),
    };

    const {getByTestId} = render(
      <GoBackIcon showLeftTitle leftTitle="Back" />,
      {
        navigation: navigationMock,
      },
    );

    const iconElement = getByTestId('GoBack-icons');
    fireEvent.press(iconElement);

    expect(navigationMock.goBack).toHaveBeenCalledTimes(0);
  });
});
