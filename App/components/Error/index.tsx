import React from 'react';
import {Image} from 'react-native';
import {titleButtons} from '../../config/constantString';

import styles from '../../styles/styles';
import Box from '../Box';
import Button from '../Button';
import {ErrorText, ErrorTitle} from '../Icon';
import {errorIcon} from '../images';
import {reloadPageError} from '../../utils/tagCommander';

type Props = {key?: number; reload?: any};
const ErrorScreen: React.FC<Props> = props => {
  return (
    <Box
      className="bg-white align-center justify-center items-center flex-auto  "
      testID="errorContainerId">
      <Box className="items-center content-between justify-items-stretch flex-col">
        <Image source={errorIcon} />
        <ErrorTitle />
        <Box className="m-3 flex items-center">
          <ErrorText />
          <Button
            style={styles?.refreshButton}
            title={titleButtons?.refresh}
            textStyle={styles?.textRefreshButton}
            onPress={() => {
              reloadPageError();
              props?.reload();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ErrorScreen;
