// Adaptive Digital Technologies HDAEC Sample File JNI

#include <stdlib.h>
#include <sys/types.h>

#include <sys/socket.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <netinet/in.h>
#include <pthread.h>
#include <jni.h>
#include <android/log.h>

//#define DISABLE_VE_CALLS

#include <errno.h>
#include <stdarg.h>
#include <malloc.h>
#include <stdio.h>

#include <common/xdm_packages/ti/xdais/std.h>
#include <common/xdm_packages/ti/xdais/xdas.h>

#include <common/include/adt_typedef_user.h>
#include <aecg4/include/iaecg4.h>
#include <string.h>


#define FRAME_SIZE 80
#define SAMPLING_RATE 8000
#define FIXEDBULK 0
#define TAIL_LENGTH 64
#define TXNLP 6
#define MAXTXLOSSST 20
#define MAXTXLOSSDT 6

IAECG4_Handle hAEC = 0;
ADT_Int32 SamplingRate =  SAMPLING_RATE;
ADT_Int16 FrameSize =  FRAME_SIZE;
ADT_Int16 FixedBulkDelayMSec = FIXEDBULK;
ADT_Int16 ActiveTailLengthMSec =  TAIL_LENGTH;
ADT_Int16 TxNLPAggressiveness = TXNLP;
ADT_Int16 MaxTxLossSTdB=MAXTXLOSSST;
ADT_Int16 MaxTxLossDTdB=MAXTXLOSSDT;

IAECG4_Params DefaultAECParams = 
{
	// Base Parameters
	sizeof(IAECG4_Params),
	0,				//LockCallback_t
	FRAME_SIZE,		//Frame Size Samples 
	0,		// Antihowling
	SAMPLING_RATE,	// ADT_Int32 SamplingRate;
	SAMPLING_RATE/2,	//maxAudioFreq
	0*FRAME_SIZE,		// Bulk Delay Samples 1*FRAME_SIZE,//1*FRAME_SIZE for simulated echo, 2*FRAME_SIZE for typical realtime environment
					// Seems to be 3*FRAME_SIZE for C6747 EVM demo when using EVM RxOut as RxIn.
					//             4*FRAME_SIZE for C6747 EVM demo when using EVM RxIn as RxIn.
	0,	//TailSearchSamples
	0,	//InitialBulkDelay
	64,			// ADT_Int16 ActiveTailLengthMSec
	64,	//ADT_Int16 TotalTailLengthMSec
	6,	//ADT_Int16 txNLPAggressiveness
	20, //ADT_Int16 MaxTxLossSTdB;
	10, //ADT_Int16 MaxTxLossDTdB;
	0,	// 12, //ADT_Int16 MaxRxLossdB;
	0,	//InitialRxOutAttendB
	-85,	// ADT_Int16 TargetResidualLeveldBm;
	-90,	//-60,	// ADT_Int16 MaxRxNoiseLeveldBm;
	-18,		// ADT_Int16 worstExpectedERLdB
	3,		//RxSaturateLeveldBm
	1,		// ADT_Int16 NoiseReduction1Setting
	0,		// ADT_Int16 NoiseReduction2Setting
	1,		//CNGEnable
	0,		//fixedGaindB10
// TxAGC Parameters
	0,		// ADT_Int8 AGCEnable;
	10,		// ADT_Int8 AGCMaxGaindB; 
	-6,		//ADT_Int8 AGCMaxLossdB; 
	-10,	// ADT_Int8 AGCTargetLeveldBm;
	-36,	//ADT_Int8 AGCLowSigThreshdBm;
// RxAGC Parameters
	0,		// ADT_Int8 AGCEnable;
	10,		// ADT_Int8 AGCMaxGaindB; 
	10,		//ADT_Int8 AGCMaxLossdB; 
	-10,	// ADT_Int8 AGCTargetLeveldBm;
	-40,	//ADT_Int8 AGCLowSigThreshdBm;
	1,		//RxBypass
	0000,	//ADT_Int16 maxTrainingTimeMSec,
	0,		//ADT_Int16 TrainingRxNoiseLeveldBm
	0,	//ADT_Int8 *pTxEqualizerdB10; 
	0,	//MIPSMemReductionSetting
	0,	//MIPSReductionSetting2
	0	//txrxMode
};


void Java_com_residentapprn_buildingcamera_RNCameraModule_main(void)
{
	//IAECG4_Handle hAEC;
	IAECG4_Params MyParams;
	IAECG4_Status Status;
	long int TotalSampleCount =  0;
	FILE *RxInFile,*RxOutFile,*TxInFile,*TxOutFile;

	static short int RxIn[FRAME_SIZE],TxIn[FRAME_SIZE],RxOut[FRAME_SIZE],TxOut[FRAME_SIZE];
	ADT_Int16 BestShortTermERLEdB=0;

	RxInFile = fopen("/sdcard/rxin.pcm", "rb");
	TxInFile = fopen("/sdcard/txin.pcm", "rb");
	RxOutFile = fopen("/sdcard/rxout.pcm", "wb");
	TxOutFile = fopen("/sdcard/txout.pcm", "wb");

	int fileError = 0;
		if(RxInFile == 0){
			   __android_log_print(ANDROID_LOG_INFO,"AEC Activity","RxInFile not found\n");
			   fileError = 1;
		}
		if(TxInFile == 0){
				   __android_log_print(ANDROID_LOG_INFO,"AEC Activity","TxInFile not found\n");
				   fileError = 1;
			}
		if(RxOutFile == 0){
				   __android_log_print(ANDROID_LOG_INFO,"AEC Activity","RxOutFile not found\n");
				   fileError = 1;
			}
		if(TxOutFile == 0){
				   __android_log_print(ANDROID_LOG_INFO,"AEC Activity","TxOutFile not found\n");
				   fileError = 1;
			}

		if(fileError == 0){
			__android_log_print(ANDROID_LOG_INFO,"AEC Activity","File Open Success\n");
		}
		else if(fileError ==1){
			__android_log_print(ANDROID_LOG_INFO,"AEC Activity","File Open Error\n");
		}


	memcpy(&MyParams,&DefaultAECParams,sizeof(MyParams));
	MyParams.size = sizeof(IAECG4_Params);
	hAEC = (IAECG4_Handle) AECG4_ADT_create(0, &MyParams);
	if (hAEC == 0)
	{
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity", "AEC Allocation failed\n");
		exit(0);
	}
	while (!feof(RxInFile) && !feof(TxInFile))
	{
		if(fread(RxIn, sizeof(short int), FRAME_SIZE,RxInFile) != FRAME_SIZE)
		   break;
		if(fread(TxIn,sizeof(short int), FRAME_SIZE,TxInFile) != FRAME_SIZE)
		   break;
		if (feof(RxInFile) && feof(TxInFile))
			break;
#ifndef SPLIT_API
			AECG4_ADT_apply(hAEC,RxIn,RxOut,TxIn,TxOut);
#else
			AECG4_ADT_applyTx(hAEC, TxIn, TxOut);
			AECG4_ADT_applyRx(hAEC, RxIn, RxOut);
#endif
		fwrite(TxOut, sizeof(short int), FRAME_SIZE, TxOutFile);
		fwrite(RxOut, sizeof(short int), FRAME_SIZE, RxOutFile);

		AECG4_ADT_control(hAEC,IAECG4_GETSTATUS, &Status);
		if (Status.shortTermERLEdB10/10 > BestShortTermERLEdB)
			BestShortTermERLEdB = Status.shortTermERLEdB10/10;

		TotalSampleCount += FRAME_SIZE;
	}
	fclose(RxInFile);
	fclose(RxOutFile);
	fclose(TxInFile);
	fclose(TxOutFile);
	AECG4_ADT_control(hAEC,IAECG4_GETSTATUS,  &Status);

	AECG4_ADT_delete(hAEC);
	__android_log_print(ANDROID_LOG_INFO,"AEC Activity", "  Total samples processed = %ld\n",TotalSampleCount);
	__android_log_print(ANDROID_LOG_INFO,"AEC Activity", "  Best Short Term ERLE = %d\n", BestShortTermERLEdB);
}

jint Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecCreate(JNIEnv* env, jobject thiz,
		jlong samplingRate, jshort frameSize, jshort fixedBulkDelayMSec, jshort activeTailLengthMSec,
		jshort txNLPAggressiveness, jshort maxTxLossSTdB, jshort maxTxLossDTdB)
{
	IAECG4_Params MyParams;
	IAECG4_Status Status;


	memcpy(&MyParams,&DefaultAECParams,sizeof(MyParams));
	//memcpy(dest, src, strlen(src)+1);
	MyParams.size = sizeof(IAECG4_Params);

	SamplingRate = samplingRate;
	FrameSize = frameSize;
	FixedBulkDelayMSec = fixedBulkDelayMSec;
	ActiveTailLengthMSec = activeTailLengthMSec;
	TxNLPAggressiveness = txNLPAggressiveness;
	MaxTxLossSTdB=maxTxLossSTdB;
	MaxTxLossDTdB=maxTxLossDTdB;

	MyParams.samplingRate = SamplingRate;
	MyParams.maxAudioFreq = SamplingRate/2;
	MyParams.frameSize = FrameSize;
	MyParams.fixedBulkDelayMSec = FixedBulkDelayMSec;
	MyParams.activeTailLengthMSec = ActiveTailLengthMSec;
	MyParams.txNLPAggressiveness = TxNLPAggressiveness;
	MyParams.maxTxLossSTdB=MaxTxLossSTdB;
	MyParams.maxTxLossDTdB=MaxTxLossDTdB;

	hAEC = (IAECG4_Handle) AECG4_ADT_create(0, &MyParams);
	if (hAEC == 0)
	{
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity", "AEC Allocation failed\n");
		return -1;
		//exit(0); // users may add different control
	} else {
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity", "AEC Allocation completes\n");
		return 0;


	}
}

void Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecProcess(JNIEnv* env, jobject thiz,jshortArray RxIn, jshortArray RxOut, jshortArray TxIn, jshortArray TxOut)
{

	jshort *RxInArray;
	jshort *TxInArray;
	jshort *RxOutArray;
	jshort *TxOutArray;

	RxInArray     = (*env)->GetShortArrayElements(env, RxIn, 0); // check param 3
	TxInArray    = (*env)->GetShortArrayElements(env, TxIn, 0);
	RxOutArray     = (*env)->GetShortArrayElements(env, RxOut, 0); // check param 3
	TxOutArray    = (*env)->GetShortArrayElements(env, TxOut, 0);

	if (hAEC != 0)
	{
		AECG4_ADT_apply(hAEC,RxInArray,RxOutArray,TxInArray,TxOutArray);
	}

	(*env)->ReleaseShortArrayElements(env, RxIn, RxInArray, 0);
	(*env)->ReleaseShortArrayElements(env, TxIn, TxInArray, 0);
	(*env)->ReleaseShortArrayElements(env, RxOut, RxOutArray, 0);
	(*env)->ReleaseShortArrayElements(env, TxOut, TxOutArray, 0);
}

FILE *RxInFile =0,*RxOutFile=0, *TxInFile=0, *TxOutFile=0;

void Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecTestFileOpen(JNIEnv* env, jobject thiz)
{
	int fileError = 0;

	RxInFile = fopen("/sdcard/rxin.pcm", "rb");
	TxInFile = fopen("/sdcard/txin.pcm", "rb");
	RxOutFile = fopen("/sdcard/rxout.pcm", "wb");
	TxOutFile = fopen("/sdcard/txout.pcm", "wb");

	if(RxInFile == 0){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","TestFileOpen RxInFile not found\n");
		fileError = 1;
	}
	if(TxInFile == 0){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","TestFileOpen TxInFile not found\n");
		fileError = 1;
	}
	if(RxOutFile == 0){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","TestFileOpen RxOutFile not found\n");
		fileError = 1;
	}
	if(TxOutFile == 0){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","TestFileOpen TxOutFile not found\n");
		fileError = 1;
	}

	if(fileError == 0){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","hdaecTestFileOpen No Erorr\n");
	} else if(fileError ==1){
		__android_log_print(ANDROID_LOG_INFO,"AEC Activity","hdaecTestFileOpen Erorr Occured\n");
	}

	return;
}

void Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecTestFileClose(JNIEnv* env, jobject thiz)
{
	if(RxInFile != 0)
		fclose(RxInFile);
	if(RxOutFile != 0)
		fclose(RxOutFile);
	if(TxInFile != 0)
		fclose(TxInFile);
	if(TxOutFile != 0)
		fclose(TxOutFile);

	__android_log_print(ANDROID_LOG_INFO,"AEC Activity","hdaecTestFileClose done\n");

	return;
}

jint Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecTestFileRead(JNIEnv* env, jobject thiz, jshort frameSize, jshortArray RxIn, jshortArray TxIn)
{
	jshort *RxInArray;
	jshort *TxInArray;
	int ret_value = 0;

	RxInArray    = (*env)->GetShortArrayElements(env, RxIn, 0);
	TxInArray    = (*env)->GetShortArrayElements(env, TxIn, 0);

	if (RxInFile != 0)
	{
		if((ret_value = fread(RxInArray, sizeof(short int), frameSize, RxInFile)) != frameSize)
		   ret_value = 0;
	}

	if (TxInFile != 0)
	{
		if((ret_value = fread(TxInArray,sizeof(short int), frameSize, TxInFile)) != frameSize)
		   ret_value = 0;
	}

	(*env)->ReleaseShortArrayElements(env, RxIn, RxInArray, 0);
	(*env)->ReleaseShortArrayElements(env, TxIn, TxInArray, 0);

	if(ret_value == 0){
			__android_log_print(ANDROID_LOG_INFO,"AEC Activity","hdaecFileRead No Data Anymore\n");
		}

	return (ret_value);
}

jint Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecTestFileWrite(JNIEnv* env, jobject thiz, jshort frameSize, jshortArray RxOut, jshortArray TxOut)
{
	jshort *RxOutArray;
	jshort *TxOutArray;
	int ret_value = 0;

	RxOutArray    = (*env)->GetShortArrayElements(env, RxOut, 0);
	TxOutArray    = (*env)->GetShortArrayElements(env, TxOut, 0);

	if (RxOutFile != 0)
	{
		fwrite(RxOutArray, sizeof(short int), frameSize, RxOutFile);
		ret_value = frameSize;
	} else {
		ret_value = 0;
	}

	if (TxOutFile != 0)
	{
		fwrite(TxOutArray, sizeof(short int), frameSize, TxOutFile);
		ret_value = frameSize;
	} else {
		ret_value = 0;
	}

	(*env)->ReleaseShortArrayElements(env, RxOut, RxOutArray, 0);
	(*env)->ReleaseShortArrayElements(env, TxOut, TxOutArray, 0);

	return (ret_value);
}

void Java_com_residentapprn_buildingcamera_RNCameraModule_hdaecDelete(JNIEnv* env, jobject thiz)
{
	AECG4_ADT_delete(hAEC);
	__android_log_print(ANDROID_LOG_INFO,"AEC Activity","hdaecDelete done\n");
}
