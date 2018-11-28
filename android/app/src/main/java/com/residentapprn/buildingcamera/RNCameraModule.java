package com.residentapprn.buildingcamera;


import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.getkeepsafe.relinker.ReLinker;

public class RNCameraModule extends ReactContextBaseJavaModule {
    private static final String TAG = "RNCameraModule";
    private static boolean libraryLoaded = false;

    // AEC parameters
    private int samplingRate = 8000;
    private short frameSize = 64;
    private short fixedBulkDelayMSec = 0;
    private short activeTailLengthMSec = 64;
    private short txNLPAggressiveness = 6;
    private short maxTxLossSTdB = 20;
    private short maxTxLossDTdB = 6;


    private native int hdaecCreate(long samplingRate, short frameSize, short FixedBulkDelayMSec, short activeTailLengthMSec,
                                   short txNLPAggressiveness, short maxTxLossSTdB, short maxTxLossDTdB);
    private native void hdaecProcess(short RxIn[], short RxOut[], short TxIn[], short TxOut[]);
    private native void hdaecDelete();

    private native void hdaecTestFileOpen();
    private native void hdaecTestFileClose();
    private native int hdaecTestFileRead(short frameSize, short RxIn[], short TxIn[]);
    private native int hdaecTestFileWrite(short frameSize, short RxIn[], short TxIn[]);


    short[] RxInArray = new short[frameSize];
    short[] TxInArray = new short[frameSize];
    short[] RxOutArray = new short[frameSize];
    short[] TxOutArray = new short[frameSize];

    //Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecTestFileRead

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
        Log.i("showCamera","showCamera load hdaec.so");
        getCurrentActivity().startActivity(new Intent(getCurrentActivity(),BuildingCameraActivity.class));
    }

    @ReactMethod
    public void aecCreate(){
        hdaecCreate(samplingRate, frameSize, fixedBulkDelayMSec, activeTailLengthMSec,
                txNLPAggressiveness, maxTxLossSTdB, maxTxLossDTdB);
    }

    @ReactMethod
    public void aecProcess(){
        hdaecProcess(RxInArray, RxOutArray, TxInArray, TxOutArray);
    }

    @ReactMethod
    public void aecDelete(){
        hdaecDelete();
    }

    @ReactMethod
    public void pcmFileOpen(){
        hdaecTestFileOpen();
    }

    @ReactMethod
    public void pcmFileClose(){
        hdaecTestFileClose();
    }

    @ReactMethod
    public void pcmFileRead(){
        hdaecTestFileRead(frameSize, RxInArray, TxInArray);
    }

    @ReactMethod
    public void pcmFileWrite(){
        hdaecTestFileWrite(frameSize, RxOutArray, TxOutArray);
    }
}