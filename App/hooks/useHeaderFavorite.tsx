import * as React from 'react';
import {Box, IconButton} from '../components';
import {SortIcon, TrashIcon} from '../components/Icon';
import colors from '../styles/colors';
import mainStyles from '../styles/styles';

export const useHeaderFavorite = (
  {onOpenActionSheet, showIcons, navigation, toggleDeleteModal},
  deps: any,
) => {
  React.useEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      headerTitleStyle: {...mainStyles.title20},
      headerBackTitle: 'ok',
      headerRight: () => {
        return showIcons ? (
          <Box className="mr-4 flex-row items-center justify-center">
            <Box className="android:mr-5  ios:mr-2">
              <IconButton
                style={{padding: 10}}
                icon={<SortIcon />}
                onPress={() => {
                  onOpenActionSheet();
                }}
              />
            </Box>
            <Box>
              <IconButton
                style={{padding: 10}}
                icon={<TrashIcon />}
                onPress={() => {
                  return toggleDeleteModal();
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box className="border-b-gray-400 border-b-0.5 mt-auto android:shadow-{8}" />
        );
      },
    });
  }, deps);
};
