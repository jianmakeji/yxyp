package com.jianma.yxyp.dao;

import java.util.Optional;

import com.jianma.yxyp.model.SmsMessage;

public interface SmsMessageDao {

	public void createSmsMessage(SmsMessage smsMessage);
	
	public Optional<SmsMessage> findSmsMessageByCondition(String mobile, String remoteAddress, String remoteHost);
	
	public Optional<SmsMessage> vertifyCodeByCondition(String code, String mobile, String remoteAddress, String remoteHost);
	
	//统计24小时内指定号码和主机发送的短信数
	public int countSendMessageOneDay(String remoteAddress, String remoteHost);
	
}
