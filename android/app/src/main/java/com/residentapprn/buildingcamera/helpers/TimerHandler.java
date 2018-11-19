package com.residentapprn.buildingcamera.helpers;

import android.os.CountDownTimer;
import android.util.Log;


public class TimerHandler {
    public static final String TAG = TimerHandler.class.getSimpleName();

    public enum Identifier {
        screenSaver,call
    }

    private Identifier identifier;
    private CountDownTimer mTimer;
    private int timerDuration;
    private int timerInterval;


    private TimerInterface delegate;

    public TimerHandler(int timerDuration, int timerInterval, Identifier identifier, TimerInterface delegate){
        this.identifier = identifier;
        this.timerDuration = timerDuration;
        this.timerInterval = timerInterval;
        this.delegate = delegate;
        setTimer(timerDuration, timerInterval);
    }

    private void setTimer(int duration, int interval){
        mTimer = new CountDownTimer(duration, interval) {
            @Override
            public void onTick(long l) {
            }

            @Override
            public void onFinish() {
                Log.e(TAG, identifier + " onFinish()");
                delegate.timeOut(identifier);
            }
        }.start();
    }

    public void resetTimer(){
        Log.e(TAG, identifier + " resetTimer()");
        if(mTimer != null) {
            mTimer.cancel();
            mTimer = null;
            setTimer(timerDuration, timerInterval);
        }
    }

    public void cancelTimer(){
        Log.e(TAG, identifier + " cancelTimer()");
        if (mTimer != null){
            mTimer.cancel();
            mTimer = null;
        }
    }

    public interface TimerInterface{
        void timeOut(Identifier identifier);
        void reset(Identifier identifier);
    }
}
