<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">

</head>
<body>
	<%@ include file="header.jsp"%>

	<div class="zyPostDetail zyMargin150">
		<h3 class="zyTitle">${news.title}</h3>
		<p class="zyDate">${fn:substring(news.publishTime, 0, 10)}</p>
		<div class="zyContent">${news.content.replace('../../','')}</div>
	</div>


	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "news";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	
	<script type="text/javascript">
		 $(document).ready(function(){
			 var documentHeight = $(document.body).height(),
				 zyPostDetailHeight = $(".zyPostDetail").height(),
				 zyFooterHeight = $(".JMFooter").height(),
				 addHeight = documentHeight - 2*zyFooterHeight;
			 if(zyPostDetailHeight+zyFooterHeight < documentHeight){
				 $(".zyPostDetail").css({ "min-height": addHeight +"px" });
			 }
		 })
	</script>
</body>
</html>