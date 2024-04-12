/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Notifications, Notification, Registered, NotificationBackgroundFetchResult} from 'react-native-notifications';
import {DeviceEventEmitter} from 'react-native';
import { Platform } from 'react-native';

Notifications.registerRemoteNotifications();
Notifications.ios.setBadgeCount(0);

async function getTokenInBackgroundMode() {
    try {
      const notification = await Notifications.getInitialNotification();
      if (notification.payload) {
        setTimeout(() => {
            DeviceEventEmitter.emit('NotificationReceived', notification.payload);
            globalThis.getInitialNotification = false;
        }, 2500);    
      }
    } catch (error) {
      
    }
  }
  getTokenInBackgroundMode();

Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
  console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
  completion({alert: true, sound: true, badge: true});
});

Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
  console.log(`Notification opened: ${notification.payload}`);
  globalThis.getInitialNotification = true;
  DeviceEventEmitter.emit('NotificationReceived', notification.payload);
  setTimeout(() => {
    globalThis.getInitialNotification = false;
}, 2500);    
  completion();
});

Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
  // TODO: Send the token to my server so it could send back push notifications...
  console.log("Notification Device Token Received", Platform.OS, event.deviceToken);
  globalThis.notificationDeviceToken = event.deviceToken;
});

Notifications.events().registerNotificationReceivedBackground(
  (notification, completion) => {
    console.log('Notification Received - Background', notification.payload)
    // export declare enum NotificationBackgroundFetchResult {
    //   NEW_DATA = 'newData',
    //   NO_DATA = 'noData',
    //   FAILED = 'failed',
    // }
    let result = NotificationBackgroundFetchResult.NEW_DATA
    completion(result)
  },
)

Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
  // TODO: Send the token to my server so it could send back push notifications...
  console.log("Notification foreground", notification);
});


AppRegistry.registerComponent(appName, () => App);
