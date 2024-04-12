import AsyncStorage from '@react-native-async-storage/async-storage';
import {addAppCmpMode} from './tagCommander';

export const updateAccessToken = async newAtPrivacy => {
  try {
    const atPrivacy = await AsyncStorage.getItem('atPrivacy');
    if (atPrivacy == null || atPrivacy != newAtPrivacy) {
      storeAtPrivacy(newAtPrivacy);
    }
  } catch (e) {
    // error reading value
  }
};

export const storeAtPrivacy = async (atPrivacy: string) => {
  try {
    await AsyncStorage.setItem('atPrivacy', atPrivacy);
    await addAppCmpMode(atPrivacy);
  } catch (e) {
    // saving error
  }
};
