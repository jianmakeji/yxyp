<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<%@ include file="../head.jsp"%>

<link href="resources/backend/css/lib/swiper.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Home.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
</head>

<body>

	<%@ include file="header.jsp"%>
		<div class="index" v-cloak>
			<row type="flex" justify="center">
		        <i-col :lg="18" :md="18" :sm="24" :xs="24">
				     <img src="resources/frontend/images/app/topShow.jpg" style="margin-top:160px;">
				     <img src="resources/frontend/images/app/schedule_later.jpg">
					 <div style="width: 100%; background-color: #f7f7f7">
				        <section class="newSection">NEWS | 新闻动态</section>
				     	<ul class="JMList">
					         <li class="JMItem" v-for="item in dataList">
					         	<a class="JMLink" :href="'news/newsDetail/' + item.id" target="_blank"> 
					         		 <img class="JMThumb" :src="item.thumb">
				                     <h3 class="JMTitle">{{item.title}}</h3> 
				                     <span class="JMDate">{{item.publishTime}}</span>
				                 </a>
					         </li>
				     	</ul>
				
					     <div id="JMTCenter">
							<a id="JMBtn" href="news/news/1">查看更多</a>
						</div>
				   	</div>
		        </i-col>
		    </row>
	    </div>
	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "index";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/swiper.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/index.js"></script>

</body>
</html>
