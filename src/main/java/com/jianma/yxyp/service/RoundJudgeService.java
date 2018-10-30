package com.jianma.yxyp.service;

import com.jianma.yxyp.model.RoundJudge;
import com.jianma.yxyp.model.RoundJudgeListModel;

public interface RoundJudgeService {

	public void createRoundJudge(RoundJudge roundJudge);
	
	public void updateRoundJudge(RoundJudge roundJudge);
	
	public void updateBindRoundJudge(int roundId, String judges, String deleteJudges, String addJudges);
	
	public void deleteRoundJudge(int id);
	
	public RoundJudgeListModel getRoundJudgeByPage(int offset, int limit);
	
	public void bindingRoundJudge(int id, String judge);
	
	public RoundJudge getRoundJudgeById(int id);
}
