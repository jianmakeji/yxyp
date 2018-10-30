package com.jianma.yxyp.dao;

import java.util.List;

import com.jianma.yxyp.model.Production;
import com.jianma.yxyp.model.Review;
import com.jianma.yxyp.model.RoundScoreBean;
import com.jianma.yxyp.model.ScoreBean;

public interface ReviewDao {

	public void createReview(Review review);
	
	public void updateReview(Review review);
	
	public void deleteReview(int id);
	
	public void deleteReviewByRoundId(int roundId);
	
	public List<Review> getReviewListByProductionId(int productionId);
	
	public List<Production> getReviewListByUserId(int userId, int scoreSign, int round, int offset, int limit);
	
	public int getCountReviewByUserId(int userId, int scoreSign, int round);
	/**
	 * 根据投稿ID，获取其打分情况
	 * @param productionId
	 * @return
	 */
	public ScoreBean getScoreByProductionId(int productionId);
	
	/**
	 * 获取所有作品的打分情况
	 * @return
	 */
	public List<ScoreBean> getAllReviewResult(int round);
	
	public void updateReviewScore(int id, int score);
	
	public List<String> getSendEmailByRound(int round);
	
	public void updateReviewScoreByCondition(int productionId,int userId, int round, int score);
	
	public int getScoreByCondition(int productionId,int userId, int round);
	
	public List<RoundScoreBean> getRoundScoreBean(int productionId);
	
	public void deleteReviewByRoundAndUserId(int roundId, List<Integer> userIds);
	
	public List<Review> getReviewByRoundId(int roundId);
	
	public List<Review> getReviewByRoundIdAndUserId(int roundId, int userId);
	
	public List<Review> getReviewByProductIdAndRound(int productionId, int round);
	
	public void batchInsertReview(List<Review> list);
}
