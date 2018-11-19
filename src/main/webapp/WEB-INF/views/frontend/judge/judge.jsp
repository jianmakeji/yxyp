<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>评审</title>
<link href="resources/frontend/css/src/style.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/iview.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/lib/animation.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/lib/swiper.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/judge/judge.css" type="text/css" rel="stylesheet">


<script>
	var judgeId = "${param.judgeId}";
	var round = "${param.round}";
	var attachFile = "${param.attachFile}";
	var pageName = "judge";
	var sliderFinalWidth = 400,
	maxQuickWidth = 1200;
</script>
</head>
<body>
	<%@ include file="../header.jsp"%>
	<div id="productList" :style="productListStyle" v-cloak>
		<row type="flex" justify="center">
			<i-col span="20">
				<div style="text-align: center">
					<i-menu mode="horizontal" :theme="theme1" active-name="1" @on-select="menuSelect" style="width:100%;margin-top:10px;z-index:0"> <menu-item name="1">
					<icon type="settings"></icon> <spring:message code="all_productions"/> </menu-item> <menu-item name="2"> <icon type="settings"></icon> <spring:message code="graded_productions"/> </menu-item> <menu-item name="3"> <icon type="settings"></icon>
					<spring:message code="non_rated_productions"/> </menu-item> </i-menu>
				</div>
		
		
				<ul class="cd-items cd-container">
					<li v-for="item in list" class="cd-item">
						<p class="cd-score">{{item.score}}<spring:message code="fraction"/></p>
						<img :src="item.pimage" :id="item.id"
						v-on:click="openDetail" style="cursor: pointer;">
						<p class="cd-trigger">{{item.title}}</p>
					</li>
				</ul>
				<div style="text-align: center; margin-bottom: 30px;">
					<page :total="total" :page-size="pageSize" @on-change="loadData"></page>
				</div>
		
		
				<div class="cd-quick-view">
					<div class="cd-slider-wrapper">
						<ul class="cd-slider">
							<li class="selected">
								<div class="swiper-container" >
								    <div class="swiper-wrapper">
								    </div>
								    <div class="swiper-pagination"></div>
								    <div class="swiper-button-prev"></div>
		    						<div class="swiper-button-next"></div>
								</div>
							</li>
						</ul>
					</div>
		
					<div class="cd-item-info">
						<h3 style="padding:5px 5px;"><spring:message code="title"/>：{{title}}</h3>
						<p style="padding:5px 5px;"><spring:message code="introduction"/>：{{content}}</p>
						<a v-if="attachFileShow" :href="attachFile">点击进行附件下载</a>
						<div style="padding:5px 5px;">
							<ul class="cd-item-action">
								<i-col style="color:red;">请输入分数0-100的整数</i-col>
								<li><input type="text" v-model="score" style="line-height: 1.5em; color: #ff0000; font-size: 32px; text-align: center; display: block; width: 96px; margin-top: 5px;float:left;" />
									<i-button type="error" v-on:click="scoreBtnClick" style="margin-left:10px;height: 52px;width: 100px; margin-top: 5px;font-size: 24px;"><spring:message code="score"/></i-button>
								</li>
							</ul>
						</div>
					</div>
		
					<a href="#0" class="cd-close" v-on:click="closeQuickView">Close</a>
				</div>
				 <modal v-model="previewModal" title="图片预览 (按Esc可返回)" width="auto" cancel-text="" ok-text="">
			        <img style="width:70%;heigth:auto;margin:0 auto;" :src="modelImg" />
			    </modal>
				
			</i-col>
		</row>
		
	</div>
	
	<%@ include file="../footer.jsp"%>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/vue.min.js"></script>
	<script src="resources/js/lib/velocity.min.js"></script>
	<script src="resources/backend/js/lib/swiper.js"></script>
	<script src="resources/js/lib/iview.min.js"></script>
	<script src="resources/js/lib/promise.js"></script>
	<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/judge/judge.js"></script>

</body>
</html>