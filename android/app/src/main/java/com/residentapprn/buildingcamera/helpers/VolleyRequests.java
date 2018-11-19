package com.residentapprn.buildingcamera.helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.util.Log;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;


public class VolleyRequests {
    public static final String TAG = VolleyRequests.class.getSimpleName();
    private final int volle_time_out=30000; //30 second
    public static final String REQUEST_STATUS = "status";
    public static final String REQUEST_MESSAGE = "message";
    public static String REQUEST_STATUS_SUCCESS = "success";
    public static final String REQUEST_DATA = "data";

    private  static VolleyRequests volleyRequestInstance;
    private RequestQueue requestQueue;
    private static Context context;

    private VolleyRequests(Context context){
        this.context = context;
        requestQueue = getRequestQueue();
    }

    public static synchronized VolleyRequests getInstance(Context context){
        if(volleyRequestInstance == null){
            volleyRequestInstance = new VolleyRequests(context);
        }
        return volleyRequestInstance;
    }

    public RequestQueue getRequestQueue() {
        if (requestQueue == null) {
            requestQueue = Volley.newRequestQueue(context.getApplicationContext());
        }
        return requestQueue;
    }

    public void genericGetRequest(
            Context context,
            String url,
            final GenericRequestInterface genericRequestInterface){
        if(genericRequestInterface == null){
            return;
        }

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.e(TAG, "onResponse()");
                        try{
                            JSONObject jsonResponse = new JSONObject(response);
                            String status = jsonResponse.getString(REQUEST_STATUS);
                            String message = jsonResponse.getString(REQUEST_MESSAGE);
                            JSONArray data = jsonResponse.getJSONArray(REQUEST_DATA);

                            if(status.equalsIgnoreCase(REQUEST_STATUS_SUCCESS)){
                                genericRequestInterface.onSuccessResponse(data.toString());
                            }else{
                                genericRequestInterface.onErrorResponse(message);
                            }
                        }catch(Exception e){
                            e.printStackTrace();
                            genericRequestInterface.onErrorResponse(null);
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                genericRequestInterface.onErrorResponse(null);
            }
        });

        stringRequest.setRetryPolicy(new DefaultRetryPolicy(
                volle_time_out,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        requestQueue = getRequestQueue();
        requestQueue.add(stringRequest);
    }


    public interface GenericRequestInterface{
        void onSuccessResponse(String json);
        void onErrorResponse(String message);
    }
}