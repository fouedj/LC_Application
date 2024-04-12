import {Platform, PlatformAndroidStatic, PlatformIOSStatic} from 'react-native';
import DeviceInfo, {isTablet} from 'react-native-device-info';

export default function generateUserAgent() {
  let os = Platform.OS;
  let device = '';
  if (os === 'ios') {
    os += ' ';
    device = 'iPhone';
    if (isTablet()) {
      device = 'iPad';
    }
  } else {
    device = 'Android';
    if (isTablet()) {
      device = 'AndroidTab';
    }
  }
  if (os === 'android') {
    os += (Platform as PlatformAndroidStatic).constants.Release;
  } else {
    os += (Platform as PlatformIOSStatic).constants.osVersion;
  }

  const appVersion = DeviceInfo.getVersion();
  return `${device};${os};${appVersion}`;
}
