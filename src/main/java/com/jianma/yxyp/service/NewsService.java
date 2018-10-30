package com.jianma.yxyp.service;

import java.util.List;
import java.util.Optional;

import com.jianma.yxyp.model.News;
import com.jianma.yxyp.model.PagingModel;

public interface NewsService {
	
	public void createNews(News news);
	
	public void deleteNews(int id);
	
	public void updateNews(News news);
	
	public Optional<News> findNewsById(int id);
	
	public PagingModel findNewsByPage(int offset, int limit);
	
	public PagingModel findManageNewsByPage(int offset, int limit);
	
	public List<News> getTopNews(int top);
}
