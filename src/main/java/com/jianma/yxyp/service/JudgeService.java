package com.jianma.yxyp.service;

import java.util.List;
import java.util.Optional;

import com.jianma.yxyp.model.Judge;
import com.jianma.yxyp.model.PagingModel;

public interface JudgeService {

	public int createJudge(Judge judge);
	
	public void deleteJudge(int id);
	
	public void updateJudge(Judge judge);
	
	public Optional<Judge> findJudgeById(int id);
	
	public Integer findJudgeIdByEmail(String email);
	
	public List<Judge> getAllJudge();
	
	public PagingModel findJudgeByPage(int offset, int limit);
	
	public String findJudgePwdByEmail(String email,String validCode);
	
	public void updateJudgeValidCodeByEmail(String email, String validCode);
}
