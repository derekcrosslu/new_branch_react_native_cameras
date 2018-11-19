package com.residentapprn.buildingcamera;

import android.content.Context;
import android.graphics.PixelFormat;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;

import com.hikvision.netsdk.HCNetSDK;
import com.hikvision.netsdk.NET_DVR_PREVIEWINFO;
import com.hikvision.netsdk.RealPlayCallBack;

import org.MediaPlayer.PlayM4.Player;
import org.MediaPlayer.PlayM4.Player.MPRect;
import org.MediaPlayer.PlayM4.PlayerCallBack;


public class StreamView extends SurfaceView implements SurfaceHolder.Callback, PlayerCallBack.PlayerDisplayCB, View.OnTouchListener, GestureDetector.OnGestureListener{

    public static final String TAG = StreamView.class.getSimpleName();

    SurfaceHolder surfaceHolder;
    private boolean isSurfaceCreated = false;
    private int surfaceWidth =0;
    private int surfaceHeight =0;
    private int streamWidth = 0;
    private int streamHeight = 0;

    private int port = -1;
    private int iPreviewHandle = 0;

    Player player;
    HCNetSDK hcNetSDK;

    private boolean bPlay = false;
    private boolean bDisplayCB = false;
    private boolean bSetWH = false;
    private boolean bZoom = false;

    private MPRect mpRect;
    private float centerPointX;
    private float centerPointY;
    private float lastFingerDis;
    public static final int STATUS_INIT = 1;
    public static final int STATUS_ZOOM_OUT = 2;
    public static final int STATUS_ZOOM_IN = 3;
    public static final int STATUS_MOVE = 4;
    private int currentStatus;
    private float totalRatio = 1.0f;
    private float scaledRatio;
    private float initRatio = 1.0f;
    private SRCRect srcRect = null;
    private final int maxZoomRatio = 8;
    private float lastXMove = -1;
    private float lastYMove = -1;
    private float movedDistanceX;
    private float movedDistanceY;

    private GestureDetector detector = null;

    private boolean isZoom = true;

    public StreamView(Context context) {
        super(context);
        surfaceHolder = getHolder();
        surfaceHolder.addCallback(this);

        this.player = Player.getInstance();
        this.hcNetSDK = HCNetSDK.getInstance();

        setOnTouchListener(this);

        mpRect = new MPRect();
        currentStatus = STATUS_INIT;
        srcRect = new SRCRect();
        detector = new GestureDetector(getContext(),this);
    }

    @Override
    public void surfaceCreated(SurfaceHolder surfaceHolder) {
        System.out.println("surfaceCreated");
        isSurfaceCreated = true;
        setZOrderOnTop(true);
        getHolder().setFormat(PixelFormat.TRANSLUCENT);
        if (-1 == port) {
            return;
        }
        Surface surface = surfaceHolder.getSurface();
        if (true == surface.isValid()) {
            if (false == player.setVideoWindow(port, 0, surfaceHolder)) {
                Log.e(TAG, "Player setVideoWindow failed!");
            }
            else{
                Log.e(TAG, "Player setVideoWindow success!");
            }
        }
    }

    @Override
    public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
        System.out.println("surfaceChanged");
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
        System.out.println("surfaceDestroyed");
        isSurfaceCreated = false;
        if (-1 == port) {
            return;
        }
        if (true == surfaceHolder.getSurface().isValid()) {
            if (false == player.setVideoWindow(port, 0, null)) {
                Log.e(TAG, "Player setVideoWindow failed!");
            }
        }
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.setMeasuredDimension(surfaceWidth, surfaceHeight);
    }


    public void setParam(int nScreenSize, int heightPixels, int rows) {
        this.surfaceWidth = nScreenSize/rows;
        this.surfaceHeight = heightPixels/rows;
    }

    public int getCurWidth() {
        return surfaceWidth;
    }

    public int getCurHeight() {
        return surfaceHeight;
    }

    public int getCurrentPort(){
        return port;
    }

    public int getiPreviewHandle(){
        return iPreviewHandle;
    }

    public int startPreview(int iUserID, int iChan, int streamMode) {
        RealPlayCallBack fRealDataCallBack = getRealPlayerCbf();
        if (fRealDataCallBack == null) {
            Log.e(TAG, "fRealDataCallBack object is failed!");
            return iUserID;
        }
        Log.i(TAG, "preview channel:" + iChan);

        NET_DVR_PREVIEWINFO previewInfo = new NET_DVR_PREVIEWINFO();
        previewInfo.lChannel = iChan;
        previewInfo.dwStreamType = streamMode; //substream
        previewInfo.bBlocked = 1;
        // HCNetSDK start preview
        iPreviewHandle = hcNetSDK.NET_DVR_RealPlay_V40(iUserID, previewInfo, fRealDataCallBack);
        if (iPreviewHandle < 0) {

            Log.e(TAG, "NET_DVR_RealPlay is failed!Err:" + hcNetSDK.NET_DVR_GetLastError());
            return -1;
        }

        return 1;
    }

    private RealPlayCallBack getRealPlayerCbf() {
        RealPlayCallBack cbf = new RealPlayCallBack() {
            public void fRealDataCallBack(int iRealHandle, int iDataType, byte[] pDataBuffer, int iDataSize) {
                processRealData(1, iDataType, pDataBuffer, iDataSize, Player.STREAM_REALTIME);
            }
        };
        return cbf;
    }

    private void processRealData(int iPlayViewNo, int iDataType, byte[] pDataBuffer, int iDataSize, int iStreamMode) {
        if (HCNetSDK.NET_DVR_SYSHEAD == iDataType) {
            if (port >= 0) {
                return;
            }
            port = player.getPort();
            if (port == -1) {
                return;
            }
            if (iDataSize > 0) {
                if (!player.setStreamOpenMode(port, iStreamMode))  //set stream mode
                {
                    Log.e(TAG, "setStreamOpenMode failed");
                    return;
                }
                if (!player.openStream(port, pDataBuffer, iDataSize, 2 * 1024 * 1024)) //open stream
                {
                    Log.e(TAG, "openStream failed");
                    return;
                }
                while (!isSurfaceCreated) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                bDisplayCB = player.setDisplayCB(port, this);
                if(!bDisplayCB)
                {
                    Log.i(TAG,"setDisplayCB fail");
                    return;
                }

                if (!player.play(port, getHolder())) {
                    Log.e(TAG, "play failed,error:" + player.getLastError(port));
                    return;
                }
                if (!player.playSound(port)) {
                    Log.e(TAG, "playSound failed with error code:" + player.getLastError(port));
                }
            }
        } else {
            if (!player.inputData(port, pDataBuffer, iDataSize)) {
                Log.e(TAG, "inputData failed with: " + player.getLastError(port));
            }
        }
    }

    public void stopPreview() {
        hcNetSDK.NET_DVR_StopRealPlay(iPreviewHandle);
        stopPlayer();
    }

    private void stopPlayer() {
        player.stopSound();
        // player stop play
        if (!Player.getInstance().stop(port)) {
            Log.e(TAG, "stop is failed!");
            return;
        }

        if (!Player.getInstance().closeStream(port)) {
            Log.e(TAG, "closeStream is failed!");
            return;
        }
        if (!Player.getInstance().freePort(port)) {
            Log.e(TAG, "freePort is failed!" + port);
            return;
        }
        port = -1;
    }

    public void setZoomFalse(){
        isZoom = false;

        if(srcRect.srcLeft != 0 || srcRect.srcTop != 0 || srcRect.srcRight != streamWidth || srcRect.srcBottom != streamHeight)
        {
            Log.i(TAG,"left*top setDisplayRegion");
            player.setDisplayRegion(port, 0, null, getHolder(), 1);
        }
        Log.i(TAG,"left*top="+srcRect.srcLeft+"*"+srcRect.srcTop+",right*bottom="+srcRect.srcRight+"*"+srcRect.srcBottom);
    }

    private void zoomTest(int left, int top, int right,int bottom)
    {
        if(player==null && !bPlay)
        {
            Log.i(TAG,"zoomTest err");
            return;
        }

        mpRect.left = left;
        mpRect.top = top;
        mpRect.right = right;
        mpRect.bottom = bottom;

        bZoom = player.setDisplayRegion(port, 0, mpRect, getHolder(), 1);
        if(!bZoom)
        {
            Log.i(TAG,"zoomTest fail");
        }
    }

    @Override
    public void onDisplay(int arg0, byte[] arg1, int arg2, int arg3, int arg4,
                          int arg5, int arg6, int arg7) {
        if(!bSetWH)
        {
            //get video stream width&height
            streamWidth = arg3;
            streamHeight = arg4;
            srcRect.srcLeft = 0;
            srcRect.srcTop = 0;
            srcRect.srcRight = streamWidth;
            srcRect.srcBottom = streamHeight;
            bSetWH = true;
        }
    }

    @Override
    public boolean onTouch(View arg0, MotionEvent event) {
        // TODO Auto-generated method stub
        Log.i(TAG,"onTouch Test");

        if(isZoom) {
            switch (event.getAction() & MotionEvent.ACTION_MASK) {
                case MotionEvent.ACTION_UP:
                    lastXMove = -1;
                    lastYMove = -1;
                    break;
                case MotionEvent.ACTION_POINTER_UP:
                    lastXMove = -1;
                    lastYMove = -1;
                    break;
                case MotionEvent.ACTION_POINTER_DOWN:
                    if (event.getPointerCount() == 2)
                    {
                        centerPointBetweenFingers(event);
                        if (totalRatio > 1) {
                            centerPointX = (centerPointX / (float) surfaceWidth * (srcRect.getSrcRight() - srcRect.getSrcLeft()) + srcRect.getSrcLeft()) / streamWidth * surfaceWidth;
                            centerPointY = (centerPointY / (float) surfaceHeight * (srcRect.getSrcBottom() - srcRect.getSrcTop()) + srcRect.getSrcTop()) / streamHeight * surfaceHeight;
                        }
                        lastFingerDis = distanceBetweenFingers(event);
                    }
                    break;
                case MotionEvent.ACTION_MOVE:
                    if (event.getPointerCount() == 2)
                    {
                        float fingerDis = distanceBetweenFingers(event);
                        if (fingerDis > lastFingerDis) {
                            currentStatus = STATUS_ZOOM_OUT;
                        } else {
                            currentStatus = STATUS_ZOOM_IN;
                        }

                        if (totalRatio == 1)
                        {
                            SRCRect rect = new SRCRect();
                            rect.setSrcLeft(0);
                            rect.setSrcTop(0);
                            rect.setSrcRight(streamWidth);
                            rect.setSrcBottom(streamHeight);

                            srcRect = rect;
                        }

                        if (Math.abs(fingerDis - lastFingerDis) > 10) {
                            if ((currentStatus == STATUS_ZOOM_OUT && totalRatio < maxZoomRatio * initRatio)
                                    || (currentStatus == STATUS_ZOOM_IN && totalRatio > initRatio)) {
                                scaledRatio = (float) (fingerDis / lastFingerDis);
                                totalRatio = totalRatio * scaledRatio;
                                if (totalRatio > maxZoomRatio * initRatio) {
                                    totalRatio = maxZoomRatio * initRatio;
                                } else if (totalRatio < initRatio) {
                                    totalRatio = initRatio;
                                }
                                zoom(totalRatio);
                                lastFingerDis = fingerDis;
                            }
                        }

                    } else if (event.getPointerCount() == 1)
                    {
                        float xMove = event.getX();
                        float yMove = event.getY();
                        if (lastXMove == -1 && lastYMove == -1) {
                            lastXMove = xMove;
                            lastYMove = yMove;
                        }
                        currentStatus = STATUS_MOVE;
                        movedDistanceX = lastXMove - xMove;
                        movedDistanceY = lastYMove - yMove;
                        if (Math.abs(movedDistanceX) > 5 || Math.abs(movedDistanceY) > 5) {
                            if (totalRatio > 1) {
                                move();
                            }
                        }
                        lastXMove = xMove;
                        lastYMove = yMove;
                    }
                    break;
                default:
                    Log.i(TAG, "onTouch default");
                    break;
            }
        }
        else{
            if(event.getAction() == MotionEvent.ACTION_UP){
                callOnClick();
            }
        }
        return true;
    }

    private float distanceBetweenFingers(MotionEvent event) {
        float x = event.getX(0) - event.getX(1);
        float y = event.getY(0) - event.getY(1);
        return (float) Math.sqrt(x * x + y * y);
    }

    private void centerPointBetweenFingers(MotionEvent event) {
        float xPoint0 = event.getX(0);
        float yPoint0 = event.getY(0);
        float xPoint1 = event.getX(1);
        float yPoint1 = event.getY(1);
        centerPointX = (xPoint0 + xPoint1) / 2;
        centerPointY = (yPoint0 + yPoint1) / 2;
    }

    private void zoom(float ratio) {

        if(isZoom)
        {
            double left = centerPointX / (float) surfaceWidth * streamWidth
                    - streamWidth / ratio * 0.5;
            double top = centerPointY / (float) surfaceHeight * streamHeight
                    - streamHeight / ratio * 0.5;
            double right = centerPointX / (float) surfaceWidth * streamWidth
                    + streamWidth / ratio * 0.5;
            double bottom = centerPointY / (float) surfaceHeight * streamHeight
                    + streamHeight / ratio * 0.5;

            if (left <= 0) {
                left = 0;
            }

            if (top <= 0) {
                top = 0;
            }

            if (right >= streamWidth) {
                right = streamWidth;
            }

            if (bottom >= streamHeight) {
                bottom = streamHeight;
            }

            SRCRect rect = new SRCRect();
            rect.setSrcLeft((int) left);
            rect.setSrcTop((int) top);
            rect.setSrcRight((int) right);
            rect.setSrcBottom((int) bottom);

            zoomTest(rect.getSrcLeft(), rect.getSrcTop(), rect.getSrcRight(),
                    rect.getSrcBottom());

            srcRect = rect;
        }
    }

    private void move() {
        if(isZoom){
            double ra = (float) Math.sqrt(totalRatio);
            movedDistanceX = movedDistanceX / (float) ra;
            movedDistanceY = movedDistanceY / (float) ra;
            double a = streamWidth * (movedDistanceX / (float) surfaceWidth);
            double b = streamHeight * (movedDistanceY / (float) surfaceHeight);

            double left = srcRect.getSrcLeft() + a;
            double top = srcRect.getSrcTop() + b;
            double right = srcRect.getSrcRight() + a;
            double bottom = srcRect.getSrcBottom() + b;

            if (left >= 0 && top >= 0 && right >= 0 && right <= streamWidth
                    && bottom >= 0 && bottom <= streamHeight) {
                SRCRect rect = new SRCRect();
                rect.setSrcLeft((int) left);
                rect.setSrcTop((int) top);
                rect.setSrcRight((int) right);
                rect.setSrcBottom((int) bottom);

                zoomTest(rect.getSrcLeft(), rect.getSrcTop(), rect.getSrcRight(),
                        rect.getSrcBottom());

                srcRect = rect;}
        }
    }

    @Override
    public boolean onDown(MotionEvent motionEvent) {
        return false;
    }

    @Override
    public void onShowPress(MotionEvent motionEvent) {

    }

    @Override
    public boolean onSingleTapUp(MotionEvent motionEvent) {
        return false;
    }

    @Override
    public boolean onScroll(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
        return false;
    }

    @Override
    public void onLongPress(MotionEvent motionEvent) {

    }

    @Override
    public boolean onFling(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
        return false;
    }
}
