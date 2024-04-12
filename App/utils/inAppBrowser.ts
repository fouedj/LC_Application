import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';

export async function openInAppBrowser(url: string) {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'close',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'overFullScreen',
        modalEnabled: true,
        // Android Properties
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: true,
      });
    } else Linking.openURL(url);
  } catch (error) {
    console.log('inAppBrowser error', error);
  }
}
