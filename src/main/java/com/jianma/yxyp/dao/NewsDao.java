package com.jianma.yxyp.dao;

import java.util.List;
import java.util.Optional;

import com.jianma.yxyp.model.News;

public interface NewsDao {

	public void createNews(News news);
	
	public void deleteNews(int id);
	
	public void updateNews(News news);
	
	public Optional<News> findNewsById(int id);
	
	public List<News> findNewsByPage(int offset, int limit);
	
	public int getCountNews();
	
	public List<News> getTopNews(int top);
}
