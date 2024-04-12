//
//  TagCommanderModule.m
//  lcApplication
//
//  Created by Wassim Mani on 30/08/2023.
//

#import <Foundation/Foundation.h>
#import <TCCore/TCCore.h>
#import <TCServerSide/TCServerSide.h>
#import "TagCommanderModule.h"
#import <React/RCTBridgeModule.h>

@interface TagCommanderModule()

@property(nonatomic, strong) ServerSide *serverSide;

@end

@implementation TagCommanderModule

// To export a module named TCM
RCT_EXPORT_MODULE(TagCommanderModule);

#pragma mark - init

RCT_EXPORT_METHOD(initTCServerSide:(NSString *)sourceKey :(BOOL) isTablet :(NSString *)osVersion :(NSString *)osVersionLight) {
  [TCDebug setDebugLevel: TCLogLevel_Verbose];
  self.serverSide = [[ServerSide alloc] initWithSiteID: 6505 andSourceKey: sourceKey];
  [self.serverSide addPermanentData:@"site_group" withValue:@"application"];
  [self.serverSide addPermanentData: @"os_group" withValue: @"iOS"];
  [self.serverSide addPermanentData:@"os" withValue:osVersion];
  [self.serverSide addPermanentData:@"os_version" withValue:osVersionLight];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(generateAppVisitorId) {
  NSString *app_visitor_id = [[NSUUID UUID] UUIDString];
  return app_visitor_id;
}

RCT_EXPORT_METHOD(addAppVisitorId: (NSString *)appVisitorId) {
  [self.serverSide addPermanentData:@"app_visitor_id" withValue:appVisitorId];
}

RCT_EXPORT_METHOD(addUserCategory: (NSString *)userCategory) {
  [self.serverSide addPermanentData:@"user_category" withValue:userCategory];
}

RCT_EXPORT_METHOD(removeUserCategory) {
  [self.serverSide removePermanentData:@"user_category"];
}

#pragma mark - CMP Method

RCT_EXPORT_METHOD(addAppCmpMode: (NSString *)appCmpMode :(NSString *)visitorConsent) {
  [self.serverSide addPermanentData:@"visitor_privacy_mode" withValue:appCmpMode];
  [self.serverSide addPermanentData:@"visitor_privacy_consent" withValue:visitorConsent];
}

#pragma mark - send tracking Methods

RCT_EXPORT_METHOD(sendTagCommanderTracking :(NSString *)eventName :(NSDictionary *)basicTrackingData :(NSDictionary *)tcVars)
{
  TCCustomEvent *event = [[TCCustomEvent alloc] initWithName: eventName];
  if (basicTrackingData && basicTrackingData.allKeys && basicTrackingData.allKeys.count>0) {
    event = [self addVarsToEvent:event :basicTrackingData];
  }
  event = [self addVarsToEvent:event :tcVars];
  [self.serverSide execute: event];
}

#pragma mark - private Methods

- (TCCustomEvent *)addVarsToEvent:(TCCustomEvent *)event :(NSDictionary *)vars {
  if(vars && vars.allKeys && vars.allKeys.count > 0) {
    for (NSString *key in vars.allKeys) {
      if([[vars objectForKey:key] isKindOfClass:[NSString class]]) {
        [event addAdditionalProperty: key withStringValue: [vars objectForKey:key]];
      } else if([[vars objectForKey:key] isKindOfClass:[NSArray class]]) {
        [event addAdditionalProperty: key withArrayValue: [vars objectForKey:key]];
      } else if([[vars objectForKey:key] isKindOfClass:[NSNumber class]]) {
        [event addAdditionalProperty: key withNumberValue: [vars objectForKey:key]];
      }
    }
  }
  return event;
}


@end
