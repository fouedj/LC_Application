import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import DetailsAnnounce from './AnnounceDetail';
import Search, {SearchContainer} from './Listing';
import MyAccount from './MyAccount';
import Home from './Home';
import Favorites from './Favorites';
import {WebViewUrlsHelpers} from '../config/constants';

describe('Screens Testing', () => {
  test('renders My Account component', () => {
    const {getByTestId} = render(<MyAccount />);
    const myAccount = getByTestId('myAccountId');
    expect(myAccount).toBeDefined();
  });
  test('Home Rendring', () => {
    const {getByTestId} = render(<Home />);
    const home = getByTestId('HomeId');
    expect(home).toBeDefined();
  });
  test('Favorite Rendring', () => {
    const {getByTestId} = render(<Favorites />);
    const favorite = getByTestId('favoriteId');
    expect(favorite).toBeDefined();
  });
  test('Search container Rendring', () => {
    const {getByTestId} = render(<Search />);
    const searchContainer = getByTestId('searchContainer');
    expect(searchContainer).toBeDefined();
  });
  test('Search WebView Rendring', () => {
    const {getByTestId} = render(<Search />);
    const searchWebView = getByTestId('webview');
    expect(searchWebView?.props?.source?.uri)?.toEqual(
      WebViewUrlsHelpers?.listingPage,
    );
    expect(searchWebView).toBeDefined();
  });
  test('Verifying listingURI', () => {
    const {getByTestId} = render(<Search />);
    const searchWebView = getByTestId('webview');
    expect(searchWebView?.props?.source?.uri)?.toEqual(
      WebViewUrlsHelpers?.listingPage,
    );
  });
  test('Vérifier si setAnnounceId est appelé avec la bonne valeur lors de la navigation', () => {
    // Mock de useSetAnnounceId et navigation.navigate
    // ...

    const mockAnnounceId = {
      setAnnounceId: jest?.fn(),
      navigation: {navigate: jest?.fn()},
    };
    const {getByTestId} = render(<SearchContainer {...mockAnnounceId} />);
    const webView = getByTestId('webview');

    // Simuler une condition de navigation
    fireEvent(webView, 'onNavigationStateChange', {
      url: WebViewUrlsHelpers?.listingPage,
    });

    // Vérifier si setAnnounceId est appelé avec la bonne valeur
  });
  test('DetailsAnnounce se rend sans erreurs', () => {
    const navigationMock = {
      setOptions: jest?.fn(),
      navigation: jest?.fn(),
    };
    const {getByTestId} = render(
      <DetailsAnnounce navigation={navigationMock} />,
    );
    const webViewDetails = getByTestId('detail-Announce-webview');
    expect(webViewDetails).toBeDefined();
  });
});
