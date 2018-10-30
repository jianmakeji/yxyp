package com.jianma.yxyp.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jianma.yxyp.dao.NewsDao;
import com.jianma.yxyp.model.News;
import com.jianma.yxyp.model.PagingModel;
import com.jianma.yxyp.service.NewsService;

@Service
@Component
@Qualifier(value = "newsServiceImpl")
@Transactional
public class NewsServiceImpl implements NewsService {

	@Autowired
	@Qualifier(value = "newsDaoImpl")
	private NewsDao newsDaoImpl;
	
	@Override
	public void createNews(News news) {
		newsDaoImpl.createNews(news);
	}

	@Override
	public void deleteNews(int id) {
		newsDaoImpl.deleteNews(id);
	}

	@Override
	public void updateNews(News news) {
		newsDaoImpl.updateNews(news);
	}

	@Override
	public Optional<News> findNewsById(int id) {
		
		return newsDaoImpl.findNewsById(id);
	}

	@Override
	public PagingModel findNewsByPage(int offset, int limit) {
		PagingModel pagingModel = new PagingModel();
		pagingModel.setList(newsDaoImpl.findNewsByPage(offset, limit));
		pagingModel.setCount(newsDaoImpl.getCountNews());
		return pagingModel;
	}

	@Override
	public List<News> getTopNews(int top) {
		// TODO Auto-generated method stub
		return newsDaoImpl.getTopNews(top);
	}

	@Override
	public PagingModel findManageNewsByPage(int offset, int limit) {
		PagingModel pagingModel = new PagingModel();
		pagingModel.setList(newsDaoImpl.findNewsByPage(offset, limit));
		pagingModel.setCount(newsDaoImpl.getCountNews());
		return pagingModel;
	}

	

}
