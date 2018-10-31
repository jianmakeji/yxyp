package com.jianma.yxyp.dao.impl;

import java.util.List;
import java.util.Optional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.jianma.yxyp.dao.SmsMessageDao;
import com.jianma.yxyp.model.SmsMessage;
import com.jianma.yxyp.util.DateUtil;

@Repository
@Component
@Qualifier(value = "smsMessageDaoImpl")
public class SmsMessageDaoImpl implements SmsMessageDao {

	@Autowired
	@Qualifier("sessionFactory")
	private SessionFactory sessionFactory;
	
	@Override
	public void createSmsMessage(SmsMessage smsMessage) {
		sessionFactory.getCurrentSession().save(smsMessage);
	}

	@Override
	public Optional<SmsMessage> findSmsMessageByCondition(String mobile, String remoteAddress, String remoteHost) {
		Session session = sessionFactory.getCurrentSession();
		String hql = " from SmsMessage where mobile = ? and remoteAddress = ? and remoteHost = ?";
		Query query = session.createQuery(hql);
		query.setParameter(0, mobile);
		query.setParameter(1, remoteAddress);
		query.setParameter(2, remoteHost);
		List<SmsMessage> list = query.list();
		if (list.size() > 0) {
			Optional<SmsMessage> smsMessage = Optional.ofNullable(list.get(0));
			return smsMessage;
		} else {
			return Optional.empty();
		}
	}

	@Override
	public Optional<SmsMessage> vertifyCodeByCondition(String code,  String mobile, String remoteAddress, String remoteHost) {
		Session session = sessionFactory.getCurrentSession();
		String hql = " from SmsMessage where code = ? and mobile = ? and remoteAddress = ? and remoteHost = ? ";
		Query query = session.createQuery(hql);
		
		query.setParameter(0, code);
		query.setParameter(1, mobile);
		query.setParameter(2, remoteAddress);
		query.setParameter(3, remoteHost);
		
		List<SmsMessage> list = query.list();
		if (list.size() > 0) {
			Optional<SmsMessage> smsMessage = Optional.ofNullable(list.get(0));
			return smsMessage;
		} else {
			return Optional.empty();
		}
	}

	@Override
	public int countSendMessageOneDay(String remoteAddress, String remoteHost) {
		String date = DateUtil.beforeDaytime(1);
		Session session = sessionFactory.getCurrentSession();
		String hql = " select count(*) from SmsMessage where remoteAddress = ? and remoteHost = ? and createtime > ?";
		Query query = session.createQuery(hql);
		query.setParameter(0, remoteAddress);
		query.setParameter(1, remoteHost);
		query.setParameter(2, DateUtil.stringToDate(date));
		return (int)((Long)query.uniqueResult()).longValue();
	}

}
