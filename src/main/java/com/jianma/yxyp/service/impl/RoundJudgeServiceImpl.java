package com.jianma.yxyp.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jianma.yxyp.dao.JudgeDao;
import com.jianma.yxyp.dao.ProductionDao;
import com.jianma.yxyp.dao.ReviewDao;
import com.jianma.yxyp.dao.impl.RoundJudgeDaoImpl;
import com.jianma.yxyp.model.Judge;
import com.jianma.yxyp.model.Review;
import com.jianma.yxyp.model.RoundJudge;
import com.jianma.yxyp.model.RoundJudgeListModel;
import com.jianma.yxyp.service.RoundJudgeService;

@Service
@Component
@Qualifier(value = "roundJudgeServiceImpl")
@Transactional
public class RoundJudgeServiceImpl implements RoundJudgeService {

	@Autowired
	@Qualifier(value = "roundJudgeDaoImpl")
	private RoundJudgeDaoImpl roundJudgeDaoImpl;
	
	@Autowired
	@Qualifier(value = "judgeDaoImpl")
	private JudgeDao judgeDaoImpl;
	
	@Autowired
	@Qualifier(value = "reviewDaoImpl")
	private ReviewDao reviewDaoImpl;
	
	@Autowired
	@Qualifier(value = "productionDaoImpl")
	private ProductionDao productionDaoImpl;
	
	@Override
	public void createRoundJudge(RoundJudge roundJudge) {
		roundJudgeDaoImpl.createRoundJudge(roundJudge);
	}

	@Override
	public void updateRoundJudge(RoundJudge roundJudge) {
		roundJudgeDaoImpl.updateRoundJudge(roundJudge);
	}

	@Override
	public void deleteRoundJudge(int id) {
		roundJudgeDaoImpl.deleteRoundJudge(id);
		reviewDaoImpl.deleteReviewByRoundId(id);
	}

	@Override
	public RoundJudgeListModel getRoundJudgeByPage(int offset, int limit) {
		List<RoundJudge> rjList = roundJudgeDaoImpl.getRoundJudgeByPage(offset, limit);
		List<Judge> jList = judgeDaoImpl.getAllJudge();
		RoundJudgeListModel roundJudgeListModel = new RoundJudgeListModel();
		roundJudgeListModel.setjList(jList);
		roundJudgeListModel.setRjList(rjList);
		return roundJudgeListModel;
	}

	@Override
	public void bindingRoundJudge(int id, String judge) {
		roundJudgeDaoImpl.bindingRoundJudge(id, judge);
		
		List<Integer> productIds = productionDaoImpl.getProductIdsByRound(id);

		if (!judge.equals("") && productIds.size() > 0){
			
			List<Review> reviewList = reviewDaoImpl.getReviewByRoundId(id);
			Set<Integer> productIdsSet = new TreeSet<Integer>();
			
			for (Review review : reviewList){
				productIdsSet.add(review.getProductionId());
			}
			
			String[] judgesArray = judge.split(",");

			int[] array = Arrays.stream(judgesArray).mapToInt(s->Integer.parseInt(s)).toArray();
			List<Integer> judgeslist = Arrays.stream(array).boxed().collect(Collectors.toList());
			
			List<Review> insertList = new ArrayList<>(500);
			Review review = null;
			for (Integer productId : productIds){
				if (!productIdsSet.contains(productId)){
					for (Integer judgeId : judgeslist){
						review = new Review();
						review.setCreatetime(new Date());
						review.setProductionId(productId);
						review.setRound((byte)id);
						review.setUserId(judgeId);
						insertList.add(review);
					}
				}
			}
			reviewDaoImpl.batchInsertReview(insertList);
		}
	}

	@Override
	public RoundJudge getRoundJudgeById(int id) {
		// TODO Auto-generated method stub
		return roundJudgeDaoImpl.getRoundJudgeById(id);
	}

	@Override
	public void updateBindRoundJudge(int roundId, String judges, String deleteJudges, String addJudges) {
		roundJudgeDaoImpl.bindingRoundJudge(roundId, judges);
		
		if (!deleteJudges.equals("")){
			String[] deleteJudgesArray = deleteJudges.split(",");
			if (deleteJudgesArray.length > 0){
				int[] array = Arrays.stream(deleteJudgesArray).mapToInt(s->Integer.parseInt(s)).toArray();
				List<Integer> list = Arrays.stream(array).boxed().collect(Collectors.toList());
				reviewDaoImpl.deleteReviewByRoundAndUserId(roundId, list);
			}
		}
		
		List<Review> reviewList = reviewDaoImpl.getReviewByRoundId(roundId);
		Set<Integer> productIdsSet = new TreeSet<Integer>();
		Set<Integer> userIdsSet = new TreeSet<Integer>();
		for (Review review : reviewList){
			productIdsSet.add(review.getProductionId());
			userIdsSet.add(review.getUserId());
		}

		if (reviewList.size() > 0 && !addJudges.equals("")){
			
			String[] addJudgesArray = addJudges.split(",");
			System.out.println(addJudgesArray.length);
			if (addJudgesArray.length > 0){
				List<Review> insertList = new ArrayList<>(500);
				
				for (String judge : addJudgesArray){
					int judgeId = Integer.parseInt(judge);

					if (userIdsSet.contains(judgeId)){

						List<Review> tempReviewList = reviewDaoImpl.getReviewByRoundIdAndUserId(roundId, judgeId);
						Set<Integer> tempSet = new TreeSet<Integer>();
						
						for (Integer productId : productIdsSet){
							tempSet.add(productId);
						}
						
						for (Review review : tempReviewList)
						{
							tempSet.remove(review.getProductionId());
						}
						Review review = null;
						for (Integer productId : tempSet){
							review = new Review();
							review.setCreatetime(new Date());
							review.setProductionId(productId);
							review.setRound((byte)roundId);
							review.setUserId(judgeId);
							insertList.add(review);
						}
					}
					else{

						
						Review review = null;
						for (Integer productId : productIdsSet){
							review = new Review();
							review.setCreatetime(new Date());
							review.setProductionId(productId);
							review.setRound((byte)roundId);
							review.setUserId(judgeId);
							insertList.add(review);
						}
					}
				}

				if (insertList.size() > 0){
					reviewDaoImpl.batchInsertReview(insertList);
				}
			}
		}
		
	}
}
