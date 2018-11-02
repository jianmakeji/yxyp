package com.jianma.yxyp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jianma.yxyp.dao.ProductionDao;
import com.jianma.yxyp.dao.ReviewDao;
import com.jianma.yxyp.model.Judge;
import com.jianma.yxyp.model.PagingModel;
import com.jianma.yxyp.model.Production;
import com.jianma.yxyp.model.ScoreBean;
import com.jianma.yxyp.service.ProductionService;
import com.jianma.yxyp.util.AliOssUtil;
import com.jianma.yxyp.util.ConfigInfo;

@Service
@Component
@Qualifier(value = "productionServiceImpl")
@Transactional
public class ProductionServiceImpl implements ProductionService {

	@Autowired
	@Qualifier(value = "productionDaoImpl")
	private ProductionDao productionDaoImpl;
	
	@Autowired
	@Qualifier(value = "reviewDaoImpl")
	private ReviewDao reviewDaoImpl;
	
	@Override
	public void createProduction(Production production) {
		productionDaoImpl.createProduction(production);
	}

	@Override
	public void updateProduction(Production production) {
		productionDaoImpl.updateProduction(production);
	}

	@Override
	public void deleteProduction(int id) {
		productionDaoImpl.deleteProduction(id);
	}
	

	@Override
	public PagingModel getListProductionByPage(int offset, int limit, int groupNum,int subGroupNum,int round,int status) {
		List<Production> list = productionDaoImpl.getListProductionByPage(offset, limit, groupNum,subGroupNum,round,status);
		int count = productionDaoImpl.getCountProduction(groupNum,subGroupNum,round,status);
		PagingModel pagingModel = new PagingModel();
		
		pagingModel.setList(list);
		pagingModel.setCount(count);
		return  pagingModel;
	}

	@Override
	public PagingModel getListOnlyProductionInfoByPage(int offset, int limit, int groupNum,int subGroupNum,int userId) {
		
		List<Production> list = productionDaoImpl.getListProductionByPageAndUserId(offset, limit, groupNum,subGroupNum,userId);
		int count = productionDaoImpl.getCountProductionByUserId(groupNum,subGroupNum,userId);
		PagingModel pagingModel = new PagingModel();
		pagingModel.setList(list);
		pagingModel.setCount(count);
		return  pagingModel;
	}

	@Override
	public Optional<Production> getProductionDetailById(int id) {
		Optional<Production> production = productionDaoImpl.getProductionDetailById(id);
		return production;
	}

	@Override
	public void updateProductionScore(int round) {
		List<ScoreBean> list = reviewDaoImpl.getAllReviewResult(round);
		
		for (ScoreBean scoreBean : list){
			productionDaoImpl.updateProductionScore(scoreBean.getProductionId(), scoreBean.getAverageScore(),round);
		}
	}

	@Override
	public PagingModel getProductionPageByCondition(int groupNum,int subGroupNum, int status, int userId, int round, int limit,
			int offset) {
		
		List<Production> list = productionDaoImpl.getProductionByCondition(groupNum,subGroupNum, status,userId, round, limit, offset);
		int count = productionDaoImpl.getProductionCountByCondition(groupNum,subGroupNum, status, userId,round);
		PagingModel pagingModel = new PagingModel();
		pagingModel.setList(list);
		pagingModel.setCount(count);
		return  pagingModel;
	}

	@Override
	public void updateProductionStatus(int id, int status) {
		productionDaoImpl.updateProductionStatus(id, status);
	}

}
