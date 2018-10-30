package com.jianma.yxyp;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.jianma.yxyp.model.Review;
import com.jianma.yxyp.service.ReviewService;
import com.jianma.yxyp.service.RoundJudgeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml","file:src/main/webapp/WEB-INF/spring/root-context.xml"})
public class UpdateRoundJudge {

	@Autowired
	@Qualifier(value = "roundJudgeServiceImpl")
	private RoundJudgeService roundJudgeServiceImpl;
	
	@Autowired
	@Qualifier(value = "reviewServiceImpl")
	private ReviewService reviewServiceImpl;
	
	//@Test
	public void add(){
		
		Review review = new Review();
		
		/*
		review.setUserId(25);
		review.setProductionId(111);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(25);
		review.setProductionId(112);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(25);
		review.setProductionId(113);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(25);
		review.setProductionId(114);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(25);
		review.setProductionId(115);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(26);
		review.setProductionId(114);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(26);
		review.setProductionId(115);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		
		review = new Review();
		review.setUserId(27);
		review.setProductionId(115);
		review.setRound((byte)7);
		review.setCreatetime(new Date());
		reviewServiceImpl.createReview(review);
		*/
		
	}
	
	@Test
	public void update(){
		roundJudgeServiceImpl.updateBindRoundJudge(7, "24,25,27", "26", "25,27");
	}
}
