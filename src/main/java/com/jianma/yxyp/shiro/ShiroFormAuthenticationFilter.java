package com.jianma.yxyp.shiro;

import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import net.sf.json.JSONObject;

public class ShiroFormAuthenticationFilter extends FormAuthenticationFilter {

	 @Override
	    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
	        if (isLoginRequest(request, response)) {
	            if (isLoginSubmission(request, response)) {
	               
	                return executeLogin(request, response);
	            } else {
	                
	                return true;
	            }
	        } else {
	            HttpServletRequest req = (HttpServletRequest)request;
	            HttpServletResponse resp = (HttpServletResponse) response;
	            
	            String requestType = req.getHeader("X-Requested-With");
	            if("XMLHttpRequest".equals(requestType)){
	            	 //前端Ajax请求，则不会重定向
		            resp.setHeader("Access-Control-Allow-Origin",  req.getHeader("Origin"));
		            resp.setHeader("Access-Control-Allow-Credentials", "true");
		            resp.setContentType("application/json; charset=utf-8");
		            resp.setCharacterEncoding("UTF-8");
		            
		            PrintWriter out = resp.getWriter();
		            JSONObject result = new JSONObject();
		            result.put("message", "请重新登录！");
		            result.put("statusCode", -500);
		            out.println(result);
		            out.flush();
		            out.close();
	            }else{
	            	resp.sendRedirect("/login");
	            }
	            
	            return false;
	        }
	    }

}
