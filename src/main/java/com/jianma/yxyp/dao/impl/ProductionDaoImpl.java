package com.jianma.yxyp.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.jianma.yxyp.dao.ProductionDao;
import com.jianma.yxyp.model.ProductUserModel;
import com.jianma.yxyp.model.Production;
import com.jianma.yxyp.model.ScoreBean;
import com.jianma.yxyp.model.User;

@Repository
@Component
@Qualifier(value = "productionDaoImpl")
public class ProductionDaoImpl implements ProductionDao {

	@Autowired
	@Qualifier("sessionFactory")
	private SessionFactory sessionFactory;
	
	@Override
	public void createProduction(Production production) {
		sessionFactory.getCurrentSession().save(production);
	}

	@Override
	public void updateProduction(Production production) {
		sessionFactory.getCurrentSession().update(production);
	}

	@Override
	public void deleteProduction(int id) {
		Session session = sessionFactory.getCurrentSession();
		String hql = " delete from Production p  where p.id = ?";
		Query query = session.createQuery(hql);
		query.setParameter(0, id);
		query.executeUpdate();
	}

	@Override
	public List<Production> getListProductionByPage(int offset, int limit, int groupNum,int subGroupNum, int round, int status) {
		Session session = sessionFactory.getCurrentSession();
		StringBuilder sBuilder = new StringBuilder(" from Production p where 1=1 ");
		if (groupNum > 0){
			sBuilder.append(" and p.groupNum =:groupNum ");
		}
		
		if (subGroupNum > 0){
			sBuilder.append(" and p.subGroupNum =:subGroupNum ");
		}
		
		if (round > 0){
			sBuilder.append(" and p.round =:round ");
		}
		
		if (status > 0){
			sBuilder.append(" and p.status =:status ");
		}

		sBuilder.append(" order by p.id asc ");
		
		Query query = session.createQuery(sBuilder.toString());
		
		if (groupNum > 0){
			query.setParameter("groupNum", (byte)groupNum);
		}
		
		if (subGroupNum > 0){
			query.setParameter("subGroupNum", (byte)subGroupNum);
		}
		
		if (round > 0){
			query.setParameter("round", (byte)round);
		}
		
		if (status > 0){
			query.setParameter("status", (byte)status);
		}

		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	@Override
	public List<Production> getListProductionByPageAndUserId(int offset, int limit, int groupNum,int subGroupNum, int userId) {
		Session session = sessionFactory.getCurrentSession();
		String hql = "";
		Query query = null;
		if (groupNum == 0 && subGroupNum == 0){
			hql = " from Production  where userId = ? order by id asc";
			query = session.createQuery(hql);
			query.setParameter(0, userId);
		}
		else if (groupNum != 0 && subGroupNum == 0){
			hql = " from Production where  groupNum = ? and userId = ? order by id asc";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)groupNum);
			query.setParameter(1, userId);
		}
		else if (groupNum == 0 && subGroupNum != 0){
			hql = " from Production where subGroupNum = ? and userId = ? order by id asc";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)subGroupNum);
			query.setParameter(1, userId);
		}
		else{
			hql = " from Production where  groupNum = ? and subGroupNum = ? and userId = ? order by id asc";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)groupNum);
			query.setParameter(1, (byte)subGroupNum);
			query.setParameter(2, userId);
		}
		
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	@Override
	public Optional<Production> getProductionDetailById(int id) {
		Production production = (Production) sessionFactory.getCurrentSession().get(Production.class, id);
		return Optional.ofNullable(production);
	}

	@Override
	public void updateProductionScore(int productionId, float averageScore, int round) {
		
		Session session = sessionFactory.getCurrentSession();
		String hql = "update Production set score = ?, round = ? where id = ? ";
		Query query = session.createQuery(hql);
		query.setParameter(0, averageScore);
		query.setParameter(1, (byte)round);
		query.setParameter(2, productionId);
		query.executeUpdate();
		 
	}
	
	@Override
	public void batchUpdateProductionScore(List<ScoreBean> list){
		//打开Session  
        Session session = sessionFactory.getCurrentSession();  
        //开始事务  
        Transaction tx = session.beginTransaction();  
       
        int i = 0;
        for (ScoreBean scoreBean : list)  
        {  
        	i++;
        	String hql = "update from Production set score = ? where id = ? ";
        	Query query = session.createQuery(hql);
        	query.setParameter(0, scoreBean.getScoreSum());
        	query.setParameter(1, scoreBean.getProductionId());
    		query.executeUpdate();
            if (i % 20 == 0)  
            {  
                session.flush();  
                session.clear();  
            }  
        }  
        //提交事务  
        tx.commit();  
        //关闭事务  
        sessionFactory.close();
	}

	@Override
	public int getCountProduction(int groupNum,int subGroupNum, int round, int status) {
		Session session = sessionFactory.getCurrentSession();
		StringBuilder sBuilder = new StringBuilder(" select count(p) from Production p where 1=1 ");
		if (groupNum > 0){
			sBuilder.append(" and p.groupNum =:groupNum ");
		}
		if (subGroupNum > 0){
			sBuilder.append(" and p.subGroupNum =:subGroupNum ");
		}
		if (round > 0){
			sBuilder.append(" and p.round =:round ");
		}
		if (status > 0){
			sBuilder.append(" and p.status =:status ");
		}
		
		Query query = session.createQuery(sBuilder.toString());
		
		if (groupNum > 0){
			query.setParameter("groupNum", (byte)groupNum);
		}
		
		if (subGroupNum > 0){
			query.setParameter("subGroupNum", (byte)subGroupNum);
		}
		
		if (round > 0){
			query.setParameter("round", (byte)round);
		}
		
		if (status > 0){
			query.setParameter("status", (byte)status);
		}
		
        return (int)((Long)query.uniqueResult()).longValue();
	}

	@Override
	public int getCountProductionByUserId(int groupNum,int subGroupNum, int userId) {
		Session session = sessionFactory.getCurrentSession();
		String hql = "";
		Query query = null;
		if (groupNum == 0 && subGroupNum == 0){
			hql = " select count(p) from Production p where userId = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, userId);
		}
		else if (groupNum != 0 && subGroupNum == 0){
			hql = " select count(p) from Production p where userId = ? and groupNum = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, userId);
			query.setParameter(1, groupNum);
		}
		else if (groupNum == 0 && subGroupNum != 0){
			hql = " select count(p) from Production p where userId = ? and subGroupNum = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, userId);
			query.setParameter(1, subGroupNum);
		}
		else{
			hql = " select count(p) from Production p where groupNum = ? and subGroupNum = ? and userId = ?";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)groupNum);
			query.setParameter(1, (byte)subGroupNum);
			query.setParameter(2, userId);
		} 
        return (int)((Long)query.uniqueResult()).longValue();
	}

	@Override
	public List<ProductUserModel> getListProductionByPageRelationRegisterUser(int offset, int limit, int groupNum,int subGroupNum) {
		Session session = sessionFactory.getCurrentSession();
		String hql = "";
		if (groupNum == 0 && subGroupNum == 0){
			hql = " select p.id, p.title, p.thumb, p.groupNum, u.realname,u.mobile,u.address,p.title_en, p.content_en,p.subGroupNum,p.adviser from Production p, User u where p.userId = u.id order by p.id asc";
		}
		else if(groupNum != 0 && subGroupNum == 0){
			hql = " select p.title, p.thumb, u.realname , u.mobile, u.address,p.title_en, p.content_en,p.subGroupNum,p.adviser  from Production p, "
					+ "User u Production where p.groupNum = ? and p.userId = u.id order by p.id asc";
		}
		else if (groupNum == 0 && subGroupNum != 0){
			hql = " select p.title, p.thumb, u.realname , u.mobile, u.address,p.title_en, p.content_en,p.subGroupNum,p.adviser  from Production p, "
					+ "User u Production where p.subGroupNum = ? and p.userId = u.id order by p.id asc";
		}
		else{
			hql = " select p.title, p.thumb, u.realname , u.mobile, u.address,p.title_en, p.content_en,p.subGroupNum,p.adviser  from Production p, "
					+ "User u Production where p.groupNum = ? and  p.subGroupNum = ? and p.userId = u.id order by p.id asc";
		}
		Query query = session.createQuery(hql);
		
		if (groupNum != 0 && subGroupNum == 0){
			query.setParameter(0, groupNum);
		}
		else if (groupNum == 0 && subGroupNum != 0){
			query.setParameter(0, subGroupNum);
		}
		else if (groupNum != 0 && subGroupNum != 0){
			query.setParameter(0, groupNum);
			query.setParameter(1, subGroupNum);
		}
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		List list = query.list();
		
		List<ProductUserModel> puList = new ArrayList<ProductUserModel>(10);
		ProductUserModel productUserModel = null;
        for(int i=0;i<list.size();i++)
        {
        	productUserModel = new ProductUserModel();
            Object []o = (Object[])list.get(i);
            int pId = ((Number)o[0]).intValue();
            String title = (String)o[1];
            String thumb = (String)o[2];
            byte gId = (Byte)o[3];
            String realname = (String)o[4];
            String mobile = (String)o[5];
            String address = ((String)o[6]);
            String title_en = ((String)o[7]);
            String content_en = ((String)o[8]);
            byte subgNum = (Byte)o[9];
            String adviser = (String)o[10];
            
            productUserModel.setpId(pId);
            productUserModel.setGroupNum(gId);
            productUserModel.setThumb(thumb);
            productUserModel.setTitle(title);
            productUserModel.setRealname(realname);
            productUserModel.setMobile(mobile);
            productUserModel.setAddress(address);
            productUserModel.setSubGroupNum(subgNum);
            productUserModel.setTitle_en(title_en);
            productUserModel.setContent_en(content_en);
            productUserModel.setAdviser(adviser);
            puList.add(productUserModel);
        }
        return puList;
	}

	@Override
	public int getCountProductionRelationRegisterUser(int groupNum, int subGroupNum) {
		Session session = sessionFactory.getCurrentSession();
		String hql = "";
		Query query = null;
		if (groupNum == 0 && subGroupNum == 0){
			hql = " select count(p) from Production p";
			query = session.createQuery(hql);
		}
		else if(groupNum != 0 && subGroupNum == 0){
			hql = " select count(p) from Production p where groupNum = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)groupNum);
		}
		else if(groupNum == 0 && subGroupNum != 0){
			hql = " select count(p) from Production p where subGroupNum = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)subGroupNum);
		}
		else{
			hql = " select count(p) from Production p where groupNum = ? and subGroupNum = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, (byte)groupNum);
			query.setParameter(1, (byte)subGroupNum);
		} 
		
        return (int)((Long)query.uniqueResult()).longValue();
	}

	@Override
	public List<Production> getProductionByCondition(int groupNum, int subGroupNum, int status, int userId, int round, int limit,
			int offset) {
		Session session = sessionFactory.getCurrentSession();
		StringBuilder hqlBuilder = new StringBuilder(" from Production  where 1 = 1  ");
		
		if (groupNum > 0){
			hqlBuilder.append(" and groupNum =:groupNum ");
		}
			
		if (subGroupNum > 0){
			hqlBuilder.append(" and subGroupNum =:subGroupNum ");
		}
		
		if (status > 0){
			hqlBuilder.append(" and status =:status ");
		}
		
		if (userId > 0){
			hqlBuilder.append(" and userId =:userId ");
		}
		
		if (round > 0){
			hqlBuilder.append(" and round =:round ");
		}
		
		
		hqlBuilder.append(" order by id asc");

		Query query = session.createQuery(hqlBuilder.toString());
		
		if (groupNum > 0){
			query.setParameter("groupNum", (byte)groupNum);
		}
		
		if (subGroupNum > 0){
			query.setParameter("subGroupNum", (byte)subGroupNum);
		}
		
		if (status > 0){
			query.setParameter("status", (byte)status);
		}
		
		if (userId > 0){
			query.setParameter("userId", userId);
		}
		
		if (round > 0){
			query.setParameter("round", round);
		}
		
		query.setFirstResult(offset);
		query.setMaxResults(limit);
		return query.list();
	}

	@Override
	public int getProductionCountByCondition(int groupNum, int subGroupNum, int status, int userId,int round) {
		Session session = sessionFactory.getCurrentSession();
		StringBuilder hqlBuilder = new StringBuilder("select count(p) from Production p  where 1=1  ");
		
		if (groupNum > 0){
			hqlBuilder.append(" and groupNum =:groupNum ");
		}
		
		if (subGroupNum > 0){
			hqlBuilder.append(" and subGroupNum =:subGroupNum ");
		}
		
		if (status > 0){
			hqlBuilder.append(" and status =:status ");
		}
		
		if (userId > 0){
			hqlBuilder.append(" and userId =:userId ");
		}
		
		if (round > 0){
			hqlBuilder.append(" and round =:round ");
		}
		
		
		Query query = session.createQuery(hqlBuilder.toString());
		if (groupNum > 0){
			query.setParameter("groupNum", (byte)groupNum);
		}
		
		if (subGroupNum > 0){
			query.setParameter("subGroupNum", (byte)subGroupNum);
		}
		
		if (status > 0){
			query.setParameter("status", (byte)status);
		}
		
		if (userId > 0){
			query.setParameter("userId", userId);
		}
		
		if (round > 0){
			query.setParameter("round", round);
		}
		
		return (int)((Long)query.uniqueResult()).longValue();
	}

	@Override
	public void updateProductionStatus(int id, int status) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "update production set status = ? where Id = ? ";
		Query query = session.createSQLQuery(sql);
		query.setParameter(0, (byte)status);
		query.setParameter(1, id);
		query.executeUpdate();
	}

	@Override
	public void updateRoundById(int productionId, int round) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "update production set round = ? where Id = ? ";
		Query query = session.createSQLQuery(sql);
		query.setParameter(0, (byte)round);
		query.setParameter(1, productionId);
		query.executeUpdate();
	}

	@Override
	public int getProductionStatus(int id) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "select status from production where Id = ? ";
		Query query = session.createSQLQuery(sql);
		query.setParameter(0, id);
		int result = (Byte)query.uniqueResult()&0xff;
		return result;
	}

	@Override
	public List<Integer> getProductIdsByRound(int roundId) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "select Id from production where round = ? ";
		Query query = session.createSQLQuery(sql);
		query.setParameter(0, roundId);
		List list = query.list();
		List<Integer> intList = new ArrayList<>();
        for(int i=0;i<list.size();i++)
        {
            intList.add(((Number)list.get(i)).intValue());
        }
        
        return intList;
	}

}
