package com.jianma.yxyp.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jianma.yxyp.DcController;
import com.jianma.yxyp.model.ResultModel;
import com.jianma.yxyp.model.SmsMessage;
import com.jianma.yxyp.service.SmsMessageService;

@Controller
@RequestMapping(value = "/sms")
public class SmsController extends DcController {


	@Autowired
	@Qualifier(value = "smsMessageServiceImpl")
	private SmsMessageService smsMessageServiceImpl;
	
	@RequestMapping(value = "/sendMessage", method = RequestMethod.GET)
	public @ResponseBody  ResultModel sendMessage(HttpServletRequest request, HttpServletResponse response,Locale locale, Model model) {
		
		String sendMobile = request.getParameter("mobile");
		
		String remoteAddress = request.getRemoteAddr();
		String remoteHost = request.getRemoteHost();
		
		SmsMessage smsMessage = new SmsMessage();
		smsMessage.setMobile(sendMobile);
		smsMessage.setRemoteAddress(remoteAddress);
		smsMessage.setRemoteHost(remoteHost);
		ResultModel resultModel = smsMessageServiceImpl.createSmsMessage(smsMessage);
		return resultModel;
	}
	
	@RequestMapping(value = "/vertifyCode", method = RequestMethod.GET)
	public @ResponseBody  ResultModel vertifyCode(HttpServletRequest request, HttpServletResponse response,Locale locale, Model model) {
		
		String sendMobile = request.getParameter("mobile");
		String code = request.getParameter("code");
		
		String remoteAddress = request.getRemoteAddr();
		String remoteHost = request.getRemoteHost();
		
		ResultModel resultModel = smsMessageServiceImpl.vertifyCodeByCondition(code, sendMobile, remoteAddress, remoteHost);
		return resultModel;
	}
}
