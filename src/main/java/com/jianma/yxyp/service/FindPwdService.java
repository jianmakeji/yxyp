package com.jianma.yxyp.service;


import com.jianma.yxyp.model.FindPwd;

public interface FindPwdService {

	public int createFindPwd(FindPwd findPwd);
	
	public int getFindPwdByCondition(String email, String validCode, int id);
}
