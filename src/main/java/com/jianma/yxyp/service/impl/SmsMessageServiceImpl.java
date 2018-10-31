package com.jianma.yxyp.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import com.jianma.yxyp.dao.SmsMessageDao;
import com.jianma.yxyp.model.ResultModel;
import com.jianma.yxyp.model.SmsMessage;
import com.jianma.yxyp.service.SmsMessageService;
import com.jianma.yxyp.util.ConfigInfo;
import com.jianma.yxyp.util.DateUtil;

@Service
@Component
@Qualifier(value = "smsMessageServiceImpl")
@Transactional
public class SmsMessageServiceImpl implements SmsMessageService {

	@Autowired
	@Qualifier(value = "smsMessageDaoImpl")
	private SmsMessageDao smsMessageDaoImpl;
	
	@Autowired
	@Qualifier(value = "configInfo")
	private ConfigInfo configInfo;
	
	@Override
	public ResultModel createSmsMessage(SmsMessage smsMessage) {
		ResultModel resultModel = new ResultModel();
		int messageCount = smsMessageDaoImpl.countSendMessageOneDay(smsMessage.getRemoteAddress(), smsMessage.getRemoteHost());
		if (messageCount > 10){
			resultModel.setMessage("当天发送短信不能超过10条");
			resultModel.setSuccess(false);
		}
		else{
			
			HashMap<String, Object> result = null;
			CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
			restAPI.init("app.cloopen.com", "8883");
			restAPI.setAccount(configInfo.sms_account_sid, configInfo.sms_auth_token);
			restAPI.setAppId(configInfo.sms_app_id);
			
			int randomNum = (int)((Math.random() * 9 + 1) * 100000);
			result = restAPI.sendTemplateSMS(smsMessage.getMobile(), "54959", new String[]{String.valueOf(randomNum),"30"});
					
			if("000000".equals(result.get("statusCode"))){
				smsMessage.setRemoteAddress(smsMessage.getRemoteAddress().replaceAll("\\.", ""));
				smsMessage.setCode(String.valueOf(randomNum));
				smsMessageDaoImpl.createSmsMessage(smsMessage);
				resultModel.setMessage("发送成功");
				resultModel.setSuccess(true);
				
			}else{
				resultModel.setMessage("发送失败,"+result.get("statusMsg"));
				resultModel.setSuccess(false);
			}
			
			
		}
		return resultModel;
	}

	@Override
	public ResultModel vertifyCodeByCondition(String code, String mobile, String remoteAddress, String remoteHost) {
		remoteAddress = remoteAddress.replaceAll("\\.", "");
				
		Optional<SmsMessage> opt = smsMessageDaoImpl.vertifyCodeByCondition(code, mobile, remoteAddress, remoteHost);
		ResultModel resultModel = new ResultModel();
		if (opt.isPresent()){
			SmsMessage smsMessage = opt.get();
			Date createtime = smsMessage.getCreatetime();
			
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String createtimeStr = df.format(createtime);
			String dateNowStr = df.format(new Date());
			
			long timeDiff = Long.parseLong(DateUtil.getTimeStampByDateString(dateNowStr)) - Long.parseLong(DateUtil.getTimeStampByDateString(createtimeStr));
			if (timeDiff > 1800){
				resultModel.setMessage("验证码失效!");
				resultModel.setSuccess(false);
			}
			else{
				resultModel.setMessage("验证成功!");
				resultModel.setSuccess(true);
			}
		}
		else{
			resultModel.setMessage("无验证码记录!");
			resultModel.setSuccess(false);
		}
		return resultModel;
	}

}
