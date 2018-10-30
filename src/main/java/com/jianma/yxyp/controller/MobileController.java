package com.jianma.yxyp.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.jianma.yxyp.DcController;
import com.jianma.yxyp.exception.ServerException;
import com.jianma.yxyp.model.News;
import com.jianma.yxyp.model.PagingModel;
import com.jianma.yxyp.service.NewsService;

@Controller
@RequestMapping(value="/mobile")
public class MobileController extends DcController{

	@Autowired
	@Qualifier(value = "newsServiceImpl")
	private NewsService newsServiceImpl;
	
	@RequestMapping(value = "/index")
	public String index(HttpServletRequest request, Model model) {
		return "phone/index";
	}
	
	@RequestMapping(value = "/news/{page}")
	public ModelAndView news(HttpServletRequest request, Model model, @PathVariable int page) {
		try {
			
			PagingModel pagingModel = newsServiceImpl.findNewsByPage((page - 1) * 10, 10);
			pagingModel.setCurrentPage(page);
			ModelAndView modelView = new ModelAndView();
			modelView.setViewName("phone/news");
			modelView.addObject(pagingModel);
			return modelView;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServerException(400, "服务器内部出错了");
		}
	}
	
	@RequestMapping(value = "/newsDetail/{id}")
	public ModelAndView newsDetail(HttpServletRequest request, Model model, @PathVariable int id) {
		try {
			Optional<News> news = newsServiceImpl.findNewsById(id);
			ModelAndView modelView = new ModelAndView();
			modelView.setViewName("phone/newsDetail");
			modelView.addObject(news.get());
			return modelView;
		} catch (Exception e) {
			throw new ServerException(400, "服务器内部出错了");
		}

	}
	
	@RequestMapping(value = "/rule")
	public String rule(HttpServletRequest request, Model model) {
		return "phone/rule";
	}
}
