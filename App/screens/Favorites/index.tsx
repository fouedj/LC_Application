import React, {useEffect} from 'react';
import {getIsConnected} from '../../utils/getUserInformations';
import {sendPageMesFavorisBI} from './tracking';
import FavoriteContainerUserLogged from './FavoriteContainerUserLogged';
import FavoriteContainerUserNotLogged from './FavoriteContainerUserNotLogged';

export default function Favorites({navigation}: any) {
  const isConnected = getIsConnected();
  useEffect(() => {
    sendPageMesFavorisBI();
  }, []);

  return isConnected ? (
    <FavoriteContainerUserLogged navigation={navigation} />
  ) : (
    <FavoriteContainerUserNotLogged navigation={navigation} />
  );
}
