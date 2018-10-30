<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<%@ include file="../head.jsp"%>
	<link href="resources/css/lib/iview.css" type="text/css" rel="stylesheet">
	<link href="resources/frontend/css/src/phone/NewsDetail.css" type="text/css" rel="stylesheet">
	<link href="resources/frontend/css/src/phone/header.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
    <script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
</head>

<body>
	<%@ include file="phoneHeader.jsp"%>
	<div id="phoneNewsDetail">
		<div class="zyPostDetail zyMargin150" >
			<h3 class="zyTitle">${news.title}</h3>
			<p class="zyDate">${fn:substring(news.publishTime, 0, 10)}</p>
			<div class="zyContent">${news.content.replace('../../','')}</div>
		</div>
	</div>
	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "news";
	</script>
	<script type="text/javascript" src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script type="text/javascript">
		var phoneNewsDetail = new Vue({
			el:"#phoneNewsDetail",
			data:function(){
				return{
					visible: false
				}
			}
		})
	</script>
</body>
</html>
