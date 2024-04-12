import React, {useRef} from 'react';
import LCWebView from '../components/CustomWebView';
import {WebViewUrlsHelpers} from '../config/constants';
import {Box} from '../components';
import {GoBackIcon} from '../components/Icon';

export default function Logout({navigation}) {
  const [key, setKey] = React.useState(0);
  const webViewRef = useRef<WebView>(null);
  // For changing the key of webView
  React.useEffect(() => {
    setKey(prev => prev + 1);
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'ok',
      headerLeft: (props: any) => {
        return Platform.OS === 'ios' ? (
          <GoBackIcon {...props} showLeftTitle />
        ) : null;
      },
    });
  }, [navigation]);
  return (
    <Box testID="favoriteId" className="flex-1  ">
      <LCWebView
        url={WebViewUrlsHelpers?.baseUrl}
        key={key}
        ref={webViewRef}
        screen="logout"
        onMessage={message => console.log('LogoutScreen::onMessage', message)}
        onShouldStartLoadWithRequest={state => {
          return true;
        }}
      />
    </Box>
  );
}
