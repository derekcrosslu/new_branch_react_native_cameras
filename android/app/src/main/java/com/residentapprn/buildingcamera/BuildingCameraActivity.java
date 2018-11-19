package com.residentapprn.buildingcamera;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.DisplayMetrics;
import android.view.GestureDetector;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.hikvision.netsdk.ExceptionCallBack;
import com.hikvision.netsdk.HCNetSDK;
import com.hikvision.netsdk.NET_DVR_DEVICEINFO_V30;
import com.hikvision.netsdk.NET_DVR_PREVIEWINFO;
import com.hikvision.netsdk.RealPlayCallBack;
import com.residentapprn.BuildConfig;
import com.residentapprn.R;
import com.residentapprn.buildingcamera.helpers.Constants;
import com.residentapprn.buildingcamera.helpers.TimerHandler;
import com.residentapprn.buildingcamera.helpers.VolleyRequests;

import org.MediaPlayer.PlayM4.Player;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BuildingCameraActivity extends Activity implements SurfaceHolder.Callback,
        GestureDetector.OnDoubleTapListener, VolleyRequests.GenericRequestInterface, TimerHandler.TimerInterface {
    SharedPreferences loginpref;
    public static final String LOGINPREF = "LoginPrefs";
    String DVR_IP;
    int DVR_PORT;
    String DVR_Username;
    String DVR_Paswd;
    private NET_DVR_DEVICEINFO_V30 m_oNetDvrDeviceInfoV30 = null;
    private int m_iLogID = -1;
    private int m_iStartChan = 0;                // start channel no
    private int m_iChanNum = 0;                //channel number
    private static StreamView[] playView;// = new PlaySurfaceView[4];
    private int m_iPlayID = -1;                // return by NET_DVR_RealPlay_V30
    private int m_iPort = -1;                // play port
    private boolean m_bNeedDecode = true;
    private SurfaceView m_osurfaceView = null;
    private int m_iPlaybackID = -1;                // return by NET_DVR_PlayBackByTime
    String camera_name[];
    String camera_channel[];
    int camera_stream_mode[];
    int totalPages = 0;
    int totalNoOfCameras = 0;
    int currentPage = 1;
    int pageSize = 1;
    int spinnerFinishTime = 0;
    private int numberOfRows;// = 4;
    Button screenshot, viewmore, next, previous, back;
    LinearLayout linearLayout;
    String mLoginGuid, Person_id;
    File imageFile;
    public static final String PREFERENCES = "videoView";
    SharedPreferences videoView_sharedpreferences;

    private ProgressBar spinner;
    private ProgressDialog progress;

    Handler handler = new Handler();
    private TimerHandler screenSaverTimer;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_building_camera);

        setLoginGuid();

        m_osurfaceView = findViewById(R.id.Sur_Player);
        videoView_sharedpreferences = getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        numberOfRows = (videoView_sharedpreferences.getInt("NumberOfCameras", 0));
        if (numberOfRows == 0) {
            numberOfRows = 1;
        }


        linearLayout = findViewById(R.id.linearLayout);

        RelativeLayout backbutton = findViewById(R.id.backbutton);
        backbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        viewmore = findViewById(R.id.viewmore);
        progress = new ProgressDialog(this);
        progress.setIndeterminate(false);
        progress.setCancelable(false);
        spinner = findViewById(R.id.progressBar2);
        spinner.setVisibility(View.GONE);

        viewmore.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                reset(TimerHandler.Identifier.screenSaver);
                progress.setMessage("Please wait...");
                progress.show();

                if (totalNoOfCameras > 1) {
                    viewmore.setVisibility(View.GONE);
                    linearLayout.setVisibility(View.VISIBLE);
                    ((ViewGroup) playView[0].getParent()).removeView(playView[0]);
                    stopMultiPreview();
                    if (getTotalRAM() > 1.5) {
                        spinnerFinishTime = 5000;
                        pageSize = 4;
                        if (screenshot.getVisibility() == View.VISIBLE) {
                            screenshot.setVisibility(View.INVISIBLE);
                        }
                        startMultiPreview(0, pageSize, 0);

                    } else {
                        spinnerFinishTime = 2000;
                        if (screenshot.getVisibility() == View.VISIBLE) {
                            screenshot.setVisibility(View.INVISIBLE);
                        }
                        startMultiPreview(0, pageSize, 1);
                        currentPage++;
                    }
                    totalPages = (int) Math.ceil(totalNoOfCameras / pageSize);
                } else {
                    showToast("No more cameras are available at the moment");
                }
            }
        });


        next = findViewById(R.id.next);
        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                reset(TimerHandler.Identifier.screenSaver);
                progress.setMessage("Please wait...");
                progress.show();
                if (currentPage != totalPages) {
                    stopMultiPreview();

                    for (StreamView aPlayView : playView) {
                        ((ViewGroup) aPlayView.getParent()).removeView(aPlayView);
                    }
                    startMultiPreview(0, pageSize, pageSize * (currentPage));
                    previous.setEnabled(true);
                    currentPage++;

                } else {
                    currentPage = 0;
                    stopMultiPreview();

                    for (StreamView aPlayView : playView) {
                        ((ViewGroup) aPlayView.getParent()).removeView(aPlayView);
                    }
                    startMultiPreview(0, pageSize, pageSize * (currentPage));
                    currentPage++;
                }

            }
        });

        previous = findViewById(R.id.previous);
        previous.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                reset(TimerHandler.Identifier.screenSaver);
                progress.setMessage("Please wait...");
                progress.show();
                if (currentPage > 1) {
                    stopMultiPreview();

                    for (StreamView aPlayView : playView) {
                        ((ViewGroup) aPlayView.getParent()).removeView(aPlayView);
                    }
                    startMultiPreview(0, pageSize, pageSize * (currentPage - 1) - pageSize);
                    next.setEnabled(true);
                    currentPage--;
                } else {
                    stopMultiPreview();

                    for (StreamView aPlayView : playView) {
                        ((ViewGroup) aPlayView.getParent()).removeView(aPlayView);
                    }

                    startMultiPreview(0, pageSize, pageSize * (totalPages - 1));
                    currentPage = totalPages;
                }
            }
        });

        screenshot = findViewById(R.id.screenshot);
        screenshot.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                reset(TimerHandler.Identifier.screenSaver);
                takeScreenshot();
            }
        });

        back = findViewById(R.id.back);
        back.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                reset(TimerHandler.Identifier.screenSaver);
                pageSize = 4;
                if (BuildConfig.FLAVOR.equals("welcomehome")) {
                    back.setVisibility(View.GONE);
                } else {
                    back.setVisibility(View.GONE);
                }
                screenshot.setVisibility(View.GONE);
                linearLayout.setVisibility(View.VISIBLE);
                stopMultiPreview();

                for (StreamView aPlayView : playView) {
                    ((ViewGroup) aPlayView.getParent()).removeView(aPlayView);
                }
                currentPage = currentPage - 1;
                startMultiPreview(0, pageSize, pageSize * (currentPage));
                currentPage++;

            }
        });
        m_osurfaceView.getHolder().addCallback(this);
        if (!initeSdk()) {
            this.finish();
            return;
        }

        getCameraList();
    }

    private void setLoginGuid() {
        loginpref = getSharedPreferences(LOGINPREF, Context.MODE_PRIVATE);
        mLoginGuid = "ca4db7699fbf662badda4856f236cdf3"; //loginpref.getString(Constants.LOGIN_GUID, "");
        Person_id = "1665"; //loginpref.getString("resident_id", "");
    }

    private void getCameraList() {
        progress.setMessage("Please wait...");
        progress.show();

        String url = "https://resident.virtualdoorman.com/apis/resident-api/index.php/buildingCameras/ca4db7699fbf662badda4856f236cdf3";
        //String url = configs.getUrl(Constants.buildingCameras) + mLoginGuid;
        VolleyRequests volleyRequests = VolleyRequests.getInstance(this);
        volleyRequests.genericGetRequest(this, url, this);
    }


    public double getTotalRAM() {
        RandomAccessFile reader = null;
        String load = null;
        double totRam = 0;
        double gb = 0;
        try {
            reader = new RandomAccessFile("/proc/meminfo", "r");
            load = reader.readLine();

            // Get the Number value from the string
            Pattern p = Pattern.compile("(\\d+)");
            Matcher m = p.matcher(load);
            String value = "";
            while (m.find()) {
                value = m.group(1);
            }
            reader.close();

            totRam = Double.parseDouble(value);
            // totRam = totRam / 1024;

            gb = totRam / 1048576.0;
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return gb;
    }

    private RealPlayCallBack getRealPlayerCbf() {
        RealPlayCallBack cbf = new RealPlayCallBack() {
            public void fRealDataCallBack(int iRealHandle, int iDataType, byte[] pDataBuffer, int iDataSize) {
                BuildingCameraActivity.this.processRealData(1, iDataType, pDataBuffer, iDataSize, Player.STREAM_REALTIME);
            }
        };
        return cbf;
    }

    private void startSinglePreview(int chan) {
        if (m_iPlaybackID >= 0) {
            return;
        }
        RealPlayCallBack fRealDataCallBack = getRealPlayerCbf();
        if (fRealDataCallBack == null) {
            return;
        }

        NET_DVR_PREVIEWINFO previewInfo = new NET_DVR_PREVIEWINFO();
        previewInfo.lChannel = m_iStartChan;
        previewInfo.dwStreamType = 1; //substream
        previewInfo.bBlocked = 1;
        // HCNetSDK start preview
        m_iPlayID = HCNetSDK.getInstance().NET_DVR_RealPlay_V40(m_iLogID, previewInfo, fRealDataCallBack);
        if (m_iPlayID < 0) {
            return;
        }
    }

    private void stopSinglePreview() {
        if (m_iPlayID < 0) {
            return;
        }

        //  net sdk stop preview
        if (!HCNetSDK.getInstance().NET_DVR_StopRealPlay(m_iPlayID)) {
            return;
        }

        m_iPlayID = -1;
        stopSinglePlayer();
    }

    private void stopSinglePlayer() {
        Player.getInstance().stopSound();
        // player stop play
        if (!Player.getInstance().stop(m_iPort)) {
            return;
        }

        if (!Player.getInstance().closeStream(m_iPort)) {
            return;
        }
        if (!Player.getInstance().freePort(m_iPort)) {
            return;
        }
        m_iPort = -1;
    }

    public void processRealData(int iPlayViewNo, int iDataType, byte[] pDataBuffer, int iDataSize, int iStreamMode) {
        if (!m_bNeedDecode) {
            //   Log.i(TAG, "iPlayViewNo:" + iPlayViewNo + ",iDataType:" + iDataType + ",iDataSize:" + iDataSize);
        } else {
            if (HCNetSDK.NET_DVR_SYSHEAD == iDataType) {
                if (m_iPort >= 0) {
                    return;
                }
                m_iPort = Player.getInstance().getPort();
                if (m_iPort == -1) {
                    return;
                }
                if (iDataSize > 0) {
                    if (!Player.getInstance().setStreamOpenMode(m_iPort, iStreamMode))  //set stream mode
                    {
                        return;
                    }
                    if (!Player.getInstance().openStream(m_iPort, pDataBuffer, iDataSize, 2 * 1024 * 1024)) //open stream
                    {
                        return;
                    }
                    if (!Player.getInstance().play(m_iPort, m_osurfaceView.getHolder())) {
                        return;
                    }
                    if (!Player.getInstance().playSound(m_iPort)) {
                        return;
                    }
                }
            } else {
                if (!Player.getInstance().inputData(m_iPort, pDataBuffer, iDataSize)) {
                    for (int i = 0; i < 4000 && m_iPlaybackID >= 0; i++) {
                        if (!Player.getInstance().inputData(m_iPort, pDataBuffer, iDataSize)) {
                        } else {
                            break;
                        }
                        try {
                            Thread.sleep(10);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (camera_channel != null) {
            stopMultiPreview();

            if (!HCNetSDK.getInstance().NET_DVR_Logout_V30(m_iLogID)) {
                return;
            }
            m_iLogID = -1;
        }
        videoView_sharedpreferences = getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = videoView_sharedpreferences.edit();

        editor.putInt("NumberOfCameras", numberOfRows);
        editor.commit();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
//        finish();
    }

    @Override
    protected void onUserLeaveHint() {
        super.onUserLeaveHint();
//        finish();
    }

    //@Override
    public void surfaceCreated(SurfaceHolder holder) {
        m_osurfaceView.getHolder().setFormat(PixelFormat.TRANSLUCENT);
        if (-1 == m_iPort) {
            return;
        }
        Surface surface = holder.getSurface();
        if (true == surface.isValid()) {
            if (false == Player.getInstance().setVideoWindow(m_iPort, 0, holder)) {
                // Log.e(TAG, "Player setVideoWindow failed!");
            }
        }
    }

    //@Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
    }

    //@Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        if (-1 == m_iPort) {
            return;
        }
        if (true == holder.getSurface().isValid()) {
            if (false == Player.getInstance().setVideoWindow(m_iPort, 0, null)) {
                //Log.e(TAG, "Player setVideoWindow failed!");
            }
        }
    }


    // init sdk
    private boolean initeSdk() {
        //init net sdk
        if (!HCNetSDK.getInstance().NET_DVR_Init()) {
            return false;
        }
        HCNetSDK.getInstance().NET_DVR_SetLogToFile(3, "/mnt/sdcard/sdklog/", true);
        return true;

    }

    private int loginDevice(int check) {
        // get instance
        m_oNetDvrDeviceInfoV30 = new NET_DVR_DEVICEINFO_V30();
        if (null == m_oNetDvrDeviceInfoV30) {
            return -1;
        }
        int iLogID;
        iLogID = HCNetSDK.getInstance().NET_DVR_Login_V30(DVR_IP, DVR_PORT, DVR_Username, DVR_Paswd, m_oNetDvrDeviceInfoV30);

        if (iLogID < 0) {
            return -1;
        }
        if (m_oNetDvrDeviceInfoV30.byIPChanNum > 0) {
            m_iStartChan = m_oNetDvrDeviceInfoV30.byStartDChan;
            m_iChanNum = m_oNetDvrDeviceInfoV30.byIPChanNum + m_oNetDvrDeviceInfoV30.byHighDChanNum * 256;
        }
        return iLogID;
    }


    private ExceptionCallBack getExceptiongCbf() {
        ExceptionCallBack oExceptionCbf = new ExceptionCallBack() {
            public void fExceptionCallBack(int iType, int iUserID, int iHandle) {
                System.out.println("recv exception, type:" + iType);
            }
        };
        return oExceptionCbf;
    }

    private void startMultiPreview(int c, int v, int startIndex) {
        if (c == 0) {
            DisplayMetrics metric = new DisplayMetrics();
            getWindowManager().getDefaultDisplay().getMetrics(metric);
            int i;
            playView = new StreamView[pageSize];
            int leftIndex = 0;
            int camera_count = 0;
            for (i = 0; i < camera_channel.length && camera_count < pageSize; i++) {
                if (playView[i] == null) {
                    playView[i] = new StreamView(this);
                    playView[i].setParam(m_osurfaceView.getWidth(), m_osurfaceView.getHeight(), pageSize == 4 ? 2 : 1);
                    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                            FrameLayout.LayoutParams.MATCH_PARENT,
                            FrameLayout.LayoutParams.MATCH_PARENT
                    );
                    final RelativeLayout header = findViewById(R.id.header);
                    params.topMargin = (int) (Math.floor((double) (i / (pageSize == 4 ? 2 : 1))) * (playView[i].getCurHeight())) + header.getHeight();//;

                    params.leftMargin = leftIndex * playView[i].getCurWidth();

                    leftIndex++;

                    if (leftIndex % 2 == 0)
                        leftIndex = 0;
                    params.gravity = Gravity.START | Gravity.LEFT;
                    addContentView(playView[i], params);
                    playView[i].setBackgroundResource(R.drawable.framelayout_border);
                    playView[i].getBackground().setAlpha(40);
                    playView[i].setPadding(5, 5, 5, 5);
                    playView[i].setZOrderOnTop(true);
                    playView[i].setClickable(true);
                    playView[i].setFocusable(false);

                    playView[i].startPreview(m_iLogID, Integer.parseInt(camera_channel[i + startIndex]), camera_stream_mode[i + startIndex]);

                    camera_count++;
                    final int j = i + startIndex;
                    if (pageSize > 1) {
                        playView[i].setZoomFalse();
                        playView[i].setOnClickListener(new View.OnClickListener() {
                            public void onClick(View v) {
                                reset(TimerHandler.Identifier.screenSaver);
                                int k = j;
                                stopMultiPreview();

                                for (int i = 0; i < playView.length; i++) {
                                    ((ViewGroup) playView[i].getParent()).removeView(playView[i]);
                                }

                                linearLayout.setVisibility(View.GONE);
                                pageSize = 1;
                                startMultiPreview(0, k, k);
                                if (screenshot.getVisibility() == View.INVISIBLE || screenshot.getVisibility() == View.GONE) {
                                    screenshot.setVisibility(View.VISIBLE);
                                    back.setVisibility(View.VISIBLE);
                                }
                            }
                        });
                    }
                }
            }
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    progress.dismiss();
                }
            }, spinnerFinishTime);
            m_iPlayID = playView[0].getiPreviewHandle();
        }
    }

    private void takeScreenshot() {

        m_iPort = playView[0].getCurrentPort();
        try {
            if (m_iPort < 0) {
                return;
            }
            Player.MPInteger stWidth = new Player.MPInteger();
            Player.MPInteger stHeight = new Player.MPInteger();
            if (!Player.getInstance().getPictureSize(m_iPort, stWidth, stHeight)) {
                return;
            }
            int nSize = stWidth.value * stHeight.value * 3 / 2;
            byte[] picBuf = new byte[nSize * 2];
            Player.MPInteger stSize = new Player.MPInteger();
            if (!Player.getInstance().getJPEG(m_iPort, picBuf, nSize * 2, stSize)) {
                //  return;
            }

            String mPath = Environment.getExternalStorageDirectory().toString() + "/" + System.currentTimeMillis() + ".jpeg";

            FileOutputStream file = new FileOutputStream(mPath);
            file.write(picBuf, 0, stSize.value);
            file.close();
            imageFile = new File(mPath);


            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                Intent mediaScanIntent = new Intent(
                        Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
                Uri contentUri = Uri.fromFile(imageFile); //out is your output file
                mediaScanIntent.setData(contentUri);
                this.sendBroadcast(mediaScanIntent);
            } else {
                sendBroadcast(new Intent(
                        Intent.ACTION_MEDIA_MOUNTED,
                        Uri.parse("file://"
                                + Environment.getExternalStorageDirectory())));
            }
            showToast("Snapshot has been saved in the gallery");
        } catch (Exception err) {
        }
    }

    void showToast(String message){
        Toast.makeText(getApplicationContext(), message,Toast.LENGTH_LONG).show();
    }

    private void openScreenshot(File imageFile) {
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        Uri uri = Uri.fromFile(imageFile);
        intent.setDataAndType(uri, "image/*");
        startActivity(intent);
    }

    private void stopMultiPreview() {
        if (playView != null) {
            for (int i = 0; i < playView.length; i++) {
                playView[i].stopPreview();
            }
        }
    }

    private void Preview() {
        try {
            ((InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE)).
                    hideSoftInputFromWindow(BuildingCameraActivity.this.getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
            if (m_iLogID < 0) {
                return;
            }
            if (m_bNeedDecode) {
                if (m_iChanNum > 1)//preview more than a channel
                {
                    for (int i = 0; i < camera_channel.length; i++) {
                        //Log.d(TAG + "--", camera_channel[i]);
                    }
                    startMultiPreview(0, pageSize, 0);
                } else    //preivew a channel
                {
                    if (m_iPlayID < 0) {
                        startSinglePreview(1);
                    } else {
                        stopSinglePreview();
                    }
                }
            }
        } catch (Exception err) {
        }
    }

    @Override
    public boolean onSingleTapConfirmed(MotionEvent e) {
        return false;
    }

    @Override
    public boolean onDoubleTap(MotionEvent e) {
        return false;
    }

    @Override
    public boolean onDoubleTapEvent(MotionEvent e) {
        return false;
    }


    @Override
    public void onSuccessResponse(String json) {
        try {
            JSONArray jaDvrs = new JSONArray(json);
            if (jaDvrs.length() > 0) {
                JSONObject joDvr = jaDvrs.getJSONObject(0);
                DVR_IP = joDvr.getString(Constants.JSON_PARAM_IP);
                DVR_PORT = joDvr.getInt(Constants.JSON_PARAM_PORT);
                DVR_Username = joDvr.getString(Constants.JSON_PARAM_USER);
                DVR_Paswd = joDvr.getString(Constants.JSON_PARAM_PASSWORD);

                JSONArray jaCameras = joDvr.getJSONArray(Constants.JSON_PARAM_CAMERA);
                camera_name = new String[jaCameras.length()];
                camera_channel = new String[jaCameras.length()];
                camera_stream_mode = new int[jaCameras.length()];
                totalNoOfCameras = camera_channel.length;
                for (int i = 0; i < jaCameras.length(); i++) {
                    JSONObject joCamera = jaCameras.getJSONObject(i);
                    camera_name[i] = joCamera.getString(Constants.JSON_PARAM_NAME);
                    camera_channel[i] = joCamera.getString(Constants.JSON_PARAM_INDEX);
                    camera_stream_mode[i] = joCamera.getInt(Constants.JSON_PARAM_MODE);
                }

                if (m_iLogID < 0) {
                    // login on the device
                    m_iLogID = loginDevice(1);
                    if (m_iLogID < 0) {
                        showToast("No video is available at the moment.");
                        finish();
                        return;
                    }
                    // get instance of exception callback and set
                    ExceptionCallBack oexceptionCbf = getExceptiongCbf();
                    if (oexceptionCbf == null) {
                        return;
                    }

                    if (!HCNetSDK.getInstance().NET_DVR_SetExceptionCallBack(oexceptionCbf)) {
                        return;
                    }
                    Preview();
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
            onErrorResponse("Camera error");
        }

        if (progress != null && progress.isShowing()) {
            progress.dismiss();
        }
    }


    @Override
    public void onErrorResponse(String message) {
        if (progress != null && progress.isShowing()) {
            progress.dismiss();
        }
        if (message != null) {
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
        }
        finish();
    }

    public void Cleanup() {
        Player.getInstance().freePort(m_iPort);
        m_iPort = -1;

        // release net SDK resource
        HCNetSDK.getInstance().NET_DVR_Cleanup();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_BACK:
                finish();
                break;
            case KeyEvent.KEYCODE_HOME:
                stopSinglePlayer();
                Cleanup();
                android.os.Process.killProcess(android.os.Process.myPid());
                break;
            default:
                break;
        }

        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (BuildConfig.FLAVOR.equals(Constants.FLAVOR_WH)) {
            screenSaverTimer = new TimerHandler(Constants.SCREEN_SAVER_TIMEOUT, Constants.DEFAULT_TIMER_TICK_INTERVAL, TimerHandler.Identifier.screenSaver, this);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (BuildConfig.FLAVOR.equals(Constants.FLAVOR_WH)) {
            if (screenSaverTimer != null) {
                screenSaverTimer.cancelTimer();
            }
        }
    }

    @Override
    public void timeOut(TimerHandler.Identifier identifier) {
    }

    @Override
    public void reset(TimerHandler.Identifier identifier) {
        if (identifier == TimerHandler.Identifier.screenSaver) {
            if (screenSaverTimer != null) {
                screenSaverTimer.resetTimer();
            }
        }
    }
}