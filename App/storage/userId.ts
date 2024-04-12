import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserId = async () => {
  try {
    const app_visitor_id = await AsyncStorage.getItem('app_visitor_id');
    return app_visitor_id && app_visitor_id;
  } catch (e) {
    // error reading value
  }
};

const createUserId = async (app_visitor_id: string) => {
  try {
    await AsyncStorage.setItem('app_visitor_id', app_visitor_id);
  } catch (e) {
    // saving error
  }
};

export default {getUserId, createUserId};
