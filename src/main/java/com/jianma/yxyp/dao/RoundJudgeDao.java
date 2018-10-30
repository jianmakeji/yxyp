package com.jianma.yxyp.dao;

import java.util.List;

import com.jianma.yxyp.model.RoundJudge;

public interface RoundJudgeDao {
	
	public void createRoundJudge(RoundJudge roundJudge);
	
	public void updateRoundJudge(RoundJudge roundJudge);
	
	public void deleteRoundJudge(int id);
	
	public List<RoundJudge> getRoundJudgeByPage(int offset, int limit);
	
	public void bindingRoundJudge(int id, String judge);
	
	public RoundJudge getRoundJudgeById(int id);
}
