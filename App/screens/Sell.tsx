import React, {useState} from 'react';
import {Box, BottomConnexionModal, Text, SellViewButton} from '../components';
import mainStyles from '../styles/styles';
import colors from '../styles/colors';
import ChevronRight from '../components/Icon/ChevronRight';
import {TouchableOpacity, ScrollView} from 'react-native';
import {getIsConnected} from '../utils/getUserInformations';
import useBottomConnexionModal from '../hooks/BottomConnexionModal';
import {textBody, titleButtons} from '../config/constantString';
import {useIsFocused} from '@react-navigation/native';
import {openInAppBrowser} from '../utils/inAppBrowser';
import {WebViewUrlsHelpers} from '../config/constants';
import {createUrlConnected} from '../utils/functionString';
import {
  sendPageVendre,
  sendClickGoToQuotePage,
  sendClickGoToIcoPage,
  sendClickGoToIcoPageConnectFirst,
  sendClickGoToDepotPage,
  sendClickGoToDepotPageConnectFirst,
  sendClickGoToLoginFromIcoDepot,
  sendGoBackActionClick,
} from '../utils/tagCommander';
import UserState from '../recoil/connectedUser';

export default function Sell({navigation}: any) {
  const isFocused = useIsFocused();
  const [caller, setCaller] = useState('');
  const {onOpenActionSheet, onCloseActionSheet, actionSheetRef} =
    useBottomConnexionModal();
  const setLoginPageState = UserState.useSetActiveAccountTabPage();
  React.useEffect(() => {
    if (isFocused) {
      sendPageVendre();
    }
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('vendreMenu', 'depot');
    });
  }, [isFocused, navigation]);

  React.useEffect(() => {
    if (globalThis.refreshToken) {
      if (caller === 'resell') {
        navigation.navigate('RachatExpress');
        // openInAppBrowser(
        //   createUrlConnected(WebViewUrlsHelpers.rachatExpressPage),
        // );
      } else if (caller === 'depot') {
        navigation.navigate('DepositScreen');
      }
      setCaller('');
    }
  }, [isFocused, globalThis.refreshToken]);

  function openResellDepotView() {
    sendClickGoToLoginFromIcoDepot(caller === 'depot');
    navigation?.navigate('Login', {lastScreen: 'Sell'});
  }

  function onOpenActionSheetWithCaller(callerAction: string) {
    setCaller(callerAction);
    callerAction === 'resell'
      ? sendClickGoToIcoPage()
      : sendClickGoToDepotPage();
    if (getIsConnected()) {
      if (callerAction === 'resell') {
        navigation.navigate('RachatExpress');
      } else if (callerAction === 'depot') {
        navigation.navigate('DepositScreen');
      }
      setCaller('');
    } else {
      callerAction === 'resell'
        ? sendClickGoToIcoPageConnectFirst()
        : sendClickGoToDepotPageConnectFirst();
      onOpenActionSheet();
    }
  }
  return (
    <ScrollView style={{backgroundColor: colors.white}} bounces={false}>
      <Box className="flex-1 bg-white mt-2">
        <Box>
          <SellViewButton
            onPress={() => onOpenActionSheetWithCaller('resell')}
            titleText={titleButtons.resellCar}
            text={textBody.offerPro}
            isSellIcon={true}
            backgroundColor={colors.lc_connect_blue}
          />
        </Box>
        <Box>
          <SellViewButton
            onPress={() => onOpenActionSheetWithCaller('depot')}
            titleText={titleButtons.newAnnounce}
            text={textBody.sellManagement}
            isSellIcon={false}
            backgroundColor={colors.light_Grey}
          />
        </Box>
        <Box className="ml-5 mt-8 mb-0">
          <Text style={[mainStyles.text16Semi, {color: colors.grey1}]}>
            {'Autre service'}
          </Text>
        </Box>
        <Box style={[mainStyles.roundedTranslucentViewStyle, {marginTop: 8}]}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 12,
            }}
            onPress={() => {
              navigation?.navigate('QuotationLanding');
              sendClickGoToQuotePage();
            }}>
            <Box>
                <Box className="">
                  <Text style={[mainStyles.textUnderline16Semi, {textAlign: 'left', marginBottom: 8}]}>
                    {titleButtons.quotation}
                  </Text>
                  <Text style={[mainStyles.text14, {textAlign: 'left'}]}>
                    {textBody.quotationDetail}
                  </Text>
                </Box>
            </Box>
            <Box
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 24,
                width: 24,
              }}>
              <ChevronRight color={colors.lc_blue} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
      <BottomConnexionModal
        actionSheetRef={actionSheetRef}
        onClose={onCloseActionSheet}
        onPress={openResellDepotView}
      />
    </ScrollView>
  );
}
