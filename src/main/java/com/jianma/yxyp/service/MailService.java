package com.jianma.yxyp.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import com.jianma.yxyp.model.MailBean;

public interface MailService {

	public void sendMail(MailBean mailBean) throws MessagingException, UnsupportedEncodingException;
	 
}
