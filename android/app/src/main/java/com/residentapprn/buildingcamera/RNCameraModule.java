package com.residentapprn.buildingcamera;


import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNCameraModule extends ReactContextBaseJavaModule {
    public RNCameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    //Mandatory function that specifies the module name
    @Override
    public String getName() {
        return "RNCameraModule";
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void showCamera() {
        Log.i("Hello","Hello");
        getCurrentActivity().startActivity(new Intent(getCurrentActivity(),BuildingCameraActivity.class));
    }
}