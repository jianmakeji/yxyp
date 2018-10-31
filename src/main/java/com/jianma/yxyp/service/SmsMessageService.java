package com.jianma.yxyp.service;

import com.jianma.yxyp.model.ResultModel;
import com.jianma.yxyp.model.SmsMessage;

public interface SmsMessageService {
	
	public ResultModel createSmsMessage(SmsMessage smsMessage);
		
	public ResultModel vertifyCodeByCondition(String code, String mobile, String remoteAddress, String remoteHost);
}
