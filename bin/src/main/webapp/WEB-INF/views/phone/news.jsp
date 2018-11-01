<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<%@ include file="../head.jsp"%>
	<link href="resources/css/lib/iview.css" type="text/css" rel="stylesheet">
	<link href="resources/frontend/css/src/phone/News.css" type="text/css" rel="stylesheet">
	<link href="resources/frontend/css/src/phone/header.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
    <script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
</head>

<body>
	<%@ include file="phoneHeader.jsp"%>
	<div id="phoneNews">
		<div class="JMNewsList">
	      	<ul class="JMNewsListUl">   
				<li class="JMNews1" v-for="newsItem in newsData">
					<img :src="newsItem.thumb">
					<a class="JMNewsTextBox" :href="newsItem.zyItemUrl">
						<span class="JMNewsText_date">{{newsItem.publishTime}}</span>
						<h3 class="JMNewsText_title">{{newsItem.title}}</h3>
					</a>
					<p class="JMNewsText_content">{{newsItem.newsAbstract}}</p>
					<hr>
				</li>
	      	</ul>
	    </div> 
	</div>
	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "news";
	</script>
	<script type="text/javascript" src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script type="text/javascript">
		var phoneNews = new Vue({
			el:"#phoneNews",
			data:function(){
				return{
					newsData:[]
				}
			},
			methods: {
			    
			},
			created:function(){
				var that = this;
	       		$.ajax({
		            "dataType":'json',
		            "type":"post",
		            "url":"news/findManageNewsByPage",
		            "data":{offset:0,limit:10000},
		            "success": function (response) {
		            	that.newsData = response.aaData;
		            	for(var i = 0;i<that.newsData.length;i++){
		            		that.newsData[i].zyItemUrl = "mobile/newsDetail/" + that.newsData[i].id;
		            	}
		            }
		        })
			}
		})
	</script>
</body>
</html>
