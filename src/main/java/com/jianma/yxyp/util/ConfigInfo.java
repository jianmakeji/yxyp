package com.jianma.yxyp.util;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@Qualifier(value = "configInfo")
@PropertySource(value="classpath:config.properties")
public class ConfigInfo {

	@Value("${email_active_url}")
	public String email_active_url;
	
	@Value("${email_active_from}")
	public String email_active_from;
	
	@Value("${email_active_from_name}")
	public String email_active_from_name;
	
	@Value("${email_active_subject}")
	public String email_active_subject;
	
	@Value("${contribute_end_time}")
	public String contribute_end_time;
	
	@Value("${email_review_subject}")
	public String email_review_subject;
	
	@Value("${endpoint}")
	public String endpoint;
	
	@Value("${accessId}")
	public String accessId;
	
	@Value("${accessKey}")
	public String accessKey;
	
	@Value("${bucket}")
	public String bucket;
	
	@Value("${sms_account_sid}")
	public String sms_account_sid;
	
	@Value("${sms_auth_token}")
	public String sms_auth_token;
	
	@Value("${sms_app_id}")
	public String sms_app_id;
}
