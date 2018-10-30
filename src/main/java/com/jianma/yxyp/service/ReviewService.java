package com.jianma.yxyp.service;

import java.util.List;

import com.jianma.yxyp.model.PagingModel;
import com.jianma.yxyp.model.Review;
import com.jianma.yxyp.model.RoundScoreBean;

public interface ReviewService {

	public void createReview(Review review);
	
	public void updateReview(Review review);
	
	public void deleteReview(int id);
	
	public List<Review> getReviewListByProductionId(int productionId);
	
	public PagingModel getReviewListByUserId(int userId, int scoreSign, int round, int offset, int limit);
	
	public void createReviews(int userId, String productIds,int round);
	
	public void updateReviewScore(int id, int score);
	
	public void updateReviewScoreByCondition(int productionId,int userId, int round, int score);
	
	public List<String> getSendEmailByRound(int round);
	
	public void sendReviewEmail(int round, String emailContent, String testEmail);
	
	public int bindProductAndRound(int productionId, int round);
	
	public int getScoreByCondition(int productionId,int userId, int round);
	
	public List<RoundScoreBean> getRoundScoreBean(int productionId);
}
