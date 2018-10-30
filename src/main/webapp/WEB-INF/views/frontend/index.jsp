<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<%@ include file="../head.jsp"%>

<link href="resources/backend/css/lib/swiper.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/lib/kkpager_blue.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Home.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
</head>

<body>

	<%@ include file="header.jsp"%>
	<!-- <div class="zyTopShow">
         <div class="zyItem">
             <img src="resources/frontend/images/app/topShow.jpg">
             <div class="swiper-container">
				 <div class="swiper-wrapper">
				 	<div class="swiper-slide"><img src="resources/frontend/images/app/topShow.jpg"></div>
				 	<div class="swiper-slide"><img src="resources/frontend/images/app/topShow2_later.jpg"></div>
				 	<div class="swiper-slide"><img src="resources/frontend/images/app/topShow3_later.jpg"></div>
				 </div>
				 Add Pagination
			    <div class="swiper-pagination"></div>
			    Add Arrows
			    <div class="swiper-button-next"></div>
			    <div class="swiper-button-prev"></div>
			</div>
         </div>
     </div> -->
     <img src="resources/frontend/images/app/topShow.jpg">
     <img src="resources/frontend/images/app/schedule_later.jpg">
	<div style="width: 100%; background-color: #f7f7f7">
        <section style="color: #5c5c5c; font-size: 32pt; padding-top: 35px; margin-left: 50px">NEWS | 新闻动态</section>
     	<ul class="zyList">
                	<!-- <li class="zyItem">
			          <a class="zyLink">
			              <img class="zyThumb" src="resources/frontend/images/app/1.jpg">
			              <h3 class="zyTitle">湖南省老年服务产品设计大赛</h3>
			              <span class="zyDate">2019-09-09</span>
			          </a>
			      </li> -->

         <c:forEach items="${newsList}" var="item">
             <li class="zyItem">
                 <a class="zyLink" href="news/newsDetail/${item.id}" target="_blank"> <img class="zyThumb" src="${item.thumb}">
                     <h3 class="zyTitle">${item.title}</h3> <span class="zyDate">${fn:substring(item.publishTime, 0, 10)}</span>
                 </a>
             </li>
         </c:forEach>
     	</ul>

	     <div id="JMTCenter">
			<a id="JMBtn" style="margin-top: 86px;margin-bottom:48px;" href="news/news/1">查看更多</a>
		</div>
   	</div>
	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "index";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/lib/kkpager.min.js"></script>
	<script src="resources/backend/js/lib/swiper.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/js/lib/juicer-min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/index.js"></script>
	<script> 
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
			autoplay: {
				delay:5000
			},//可选选项，自动滑动
			pagination: {
		        el: '.swiper-pagination'
		    },
		    navigation: {
		        nextEl: '.swiper-button-next',
		        prevEl: '.swiper-button-prev',
		    },
		})
	</script>
</body>
</html>
