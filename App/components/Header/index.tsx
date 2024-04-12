import React from 'react';
import Box from '../Box';
import Text from '../Text';
import classNames from 'classnames';
import mainStyles from '../../styles/styles';
import {GoBackIcon} from '../Icon';
import {Image, Platform} from 'react-native';
import { LC_fullLogo } from '../images';

const Header = (isHeaderHidden: boolean, title: string, canGoBack = true,image:boolean) => {
  return (
    <>
      <Box
        className={classNames({
          hidden: isHeaderHidden && Platform.OS === 'android',
          'h-[50]':
            (isHeaderHidden && Platform.OS === 'ios') ||
            Platform.OS === 'android',
          'h-[100]': !isHeaderHidden && Platform.OS === 'ios',
          'flex-row bg-white px-3': true,
        })}>
        {canGoBack && !isHeaderHidden ? (
          <Box
            className={classNames({
              'mt-[50]': Platform.OS === 'ios',
              'flex-auto self-center w-1 android:shadow-{8}': true,
            })}>
            <GoBackIcon />
          </Box>
        ) : (
          ''
        )}
        <Box
          className={classNames({
            'mt-[50] ': Platform.OS === 'ios',
            'flex-auto flex items-center justify-center android:shadow-{8}': true,
          })}>
                 {image && (
            <Box className="items-center justify-center bg-white flex-1 flex">
              <Image source={LC_fullLogo} style={mainStyles?.headerImage} />
            </Box>
          )}
          <Text style={mainStyles.title20} className="text-center">
            {title}
          </Text>
        </Box>
        {canGoBack && !isHeaderHidden ? (
          <Box className="flex-auto android:shadow-{8}" />
        ) : (
          ''
        )}
      </Box>
      {isHeaderHidden ? '' : <Box style={mainStyles?.shadowAndroid} />}
    </>
  );
};
export default Header;
