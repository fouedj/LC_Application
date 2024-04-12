import React, {useEffect, useState} from 'react';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {CheckedIcon, WarningIcon} from '../Icon';
import mainStyles from '../../styles/styles';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Box from '../Box';
import Text from '../Text';
import {NetworkState} from '../../recoil';

interface ConnectionStatusProps {
  children: React.ReactNode;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const setNetworkState = NetworkState?.useSetNetworkState();
  const networkState = NetworkState?.useGetNetworkState();
  const renderCustomContent = () => {
    const icon = isConnected ? <CheckedIcon /> : <WarningIcon />;
    const text = isConnected
      ? 'Votre connexion est rétablie'
      : 'Aucune connexion Internet';
    return (
      <Box style={mainStyles.toastSuccess}>
        <Box className="mr-[8]">{icon}</Box>
        <Box className="flex-row ">
          <Text style={mainStyles.toastText}>{text}</Text>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected || false);
      setNetworkState(state.isConnected || false);
    });

    return () => {
      unsubscribe();
    };
  }, [networkState]);

  useEffect(() => {
      if (!isFirstRender) {
        showMessage({
          renderCustomContent,
          message: '',
          backgroundColor: 'transparent',
          position: 'bottom',
          hideOnPress: false,
          autoHide: isConnected,
          duration: 3000,
        });
      } else {
        setIsFirstRender(false);
      }
  }, [isConnected]);

  return <Box className="flex-1">{children}</Box>;
};

export default ConnectionStatus;
