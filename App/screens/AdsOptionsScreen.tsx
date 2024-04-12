import React, {useRef} from 'react';
import LCWebView from '../components/CustomWebView';
import {WebViewUrlsHelpers} from '../config/constants';
import {Box} from '../components';
import {GoBackIcon} from '../components/Icon';
import {Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function AdsOptionsScreen({navigation}: any) {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const urlWebView = route?.params?.url;

  setTimeout(() => {
    webViewRef?.current?.injectJavaScript(`
  // Injection de JavaScript pour empêcher le défilement horizontal
  var element = document.querySelector('.update-page'); 
  if (element) {
  element.style.overflowX = 'hidden'; 
  };
  `);
  }, 5500);

  React.useEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return Platform.OS === 'ios' ? (
          <GoBackIcon {...props} showLeftTitle />
        ) : null;
      },
    });
  }, [navigation]);
  return (
    <Box testID="AdsOptionsScreenId" className="flex-1  ">
      <LCWebView
        url={urlWebView}
        key={key}
        ref={webViewRef}
        screen="AdsOptionsScreen"
        onShouldStartLoadWithRequest={state => {
          const {url} = state;
          return true;
        }}
      />
    </Box>
  );
}
