#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNNotifications.h"
#import "RNSplashScreen.h"
#import <Firebase.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"lcApplication";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [RNNotifications startMonitorNotifications];
  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (ret == YES) { [RNSplashScreen show];  }
  
  [self setupFirebase];
  
  return ret;
}

- (void)setupFirebase {
      NSString *filePath;
    #ifdef LACENTRALE_DEV
      NSLog(@"[FIREBASE] Development mode.");
      filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info-dev" ofType:@"plist"];
    #endif
  
    #ifdef LACENTRALE_STAGE
      NSLog(@"[FIREBASE] Development mode.");
      filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info-stage" ofType:@"plist"];
    #endif
  
    #ifdef LACENTRALE_PROD
      NSLog(@"[FIREBASE] Production mode.");
      filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];
    #endif

      FIROptions *options = [[FIROptions alloc] initWithContentsOfFile:filePath];
      [FIRApp configureWithOptions:options];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [RNNotifications didReceiveBackgroundNotification:userInfo withCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
