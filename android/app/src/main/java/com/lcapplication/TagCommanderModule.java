package com.lcapplication;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.content.Context;
import com.tagcommander.lib.core.TCDebug;
import com.tagcommander.lib.serverside.TCServerSide;
import com.tagcommander.lib.serverside.events.*;
import com.tagcommander.lib.serverside.schemas.TCItem;
import com.tagcommander.lib.serverside.schemas.TCProduct;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import android.util.Log;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import java.util.Arrays;
import java.util.ArrayList;

public class TagCommanderModule extends ReactContextBaseJavaModule {
    TCServerSide tc;
    Integer siteID = 6505;

    ReactApplicationContext appContext;

    TagCommanderModule(ReactApplicationContext context) {
        super(context);
        this.appContext = context;
    }

    //getName est obligatoire
    @Override
    public String getName() {
        return "TagCommanderModule";
    }

    @ReactMethod
    public void initTCServerSide(String sourceKey, Boolean isTablet, String osVersion, String osVersionLight) {
        try {
            tc = new TCServerSide(siteID, sourceKey, appContext);
            tc.addPermanentData("site_group", "application");
            tc.addPermanentData("os_group", "Android");
            tc.addPermanentData("os", osVersion);
            tc.addPermanentData("os_version", osVersionLight);
        } catch(Exception e){
            //ERROR
        }
    }

    @ReactMethod
    public void generateAppVisitorId(Promise promise) {
        try {
            String app_visitor_id = UUID.randomUUID().toString();
            promise.resolve(app_visitor_id);
        } catch(Exception e){
            promise.reject("error while initiating TC ServerSide", e);
        }
    }

    @ReactMethod
    public void addAppVisitorId(String app_visitor_id) {
        try {
            tc.addPermanentData("app_visitor_id", app_visitor_id);
        } catch(Exception e){
            //ERROR
        }
    }

    @ReactMethod
    public void addUserCategory(String userCategory) {
        try {
            tc.addPermanentData("user_category", userCategory);
        } catch(Exception e){
            //ERROR
        }
    }

    @ReactMethod
    public void removeUserCategory() {
        try {
            tc.removePermanentData("user_category");
        } catch(Exception e){
            //ERROR
        }
    }

    @ReactMethod
    public void addAppCmpMode(String app_cmp_mode, String visitor_consent) {
        try {
            tc.addPermanentData("visitor_privacy_mode", app_cmp_mode);
            tc.addPermanentData("visitor_privacy_consent", visitor_consent);
        } catch(Exception e){
            //ERROR
        }
    }

    @ReactMethod
    public void sendTagCommanderTracking(String eventName, ReadableMap basicTrackingData, ReadableMap tcVars)
    {
        TCCustomEvent event = new TCCustomEvent(eventName);
        if (basicTrackingData != null && !basicTrackingData.toHashMap().isEmpty()) {
            event = this.addVarsToEvent(event, basicTrackingData);
        }
        event = this.addVarsToEvent(event, tcVars);
        tc.execute(event);
    }

    private TCCustomEvent addVarsToEvent(TCCustomEvent event, ReadableMap vars) {
        if(vars != null && getNumKeys(vars) > 0) {
            ReadableMapKeySetIterator keyIterator = vars.keySetIterator();
            while (keyIterator.hasNextKey()) {
                String key = keyIterator.nextKey();
                ReadableType type = vars.getType(key);

                switch(type) {
                    case Boolean:
                        event.addAdditionalProperty(key, vars.getBoolean(key));
                        break;
                    case Number:
                        event.addAdditionalProperty(key, vars.getInt(key));
                        break;
                    case String:
                        event.addAdditionalProperty(key, vars.getString(key));
                        break;
                    case Array:
                        event.addAdditionalProperty(key, vars.getArray(key).toArrayList());
                        break;
                }
            }
        }
        return event;
    }

    private int getNumKeys(ReadableMap RM) {
        int numKeys = 0;
        if (RM != null) {
            ReadableMapKeySetIterator keyIterator = RM.keySetIterator();
            while (keyIterator.hasNextKey()) {
                numKeys++;
                keyIterator.nextKey();
            }
        }
        return numKeys;
    }


}
