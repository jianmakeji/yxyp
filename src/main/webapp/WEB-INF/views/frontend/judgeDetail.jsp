<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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

	<div class="zyJudgeDetail">
		<div class="zyInfo">
			<img class="zyThumb" src="${judge.headicon}">
			<%-- <h2 class="zyTitle">姓名：${judge.name}</h2>
			<div class="zySubTitle">职位：${judge.subTitle}</div> --%>
		</div>
		<div class="zyDetail">
			<label class="zyTip">${judge.name}</label>
			<div class="description">${judge.description.replace('../../','')}</div>
		</div>
	</div>

	<%@ include file="footer.jsp"%>


	<script>
		var pageName = "judge";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	
	
	<script>
		$(document).ready(function(){
			var documentHeight = $(document.body).height(),
				zyJudgeDetailHeight = $("zyJudgeDetail").height(),
				zyFooterHeight = $(".JMFooter").height();
				
				var minHeightNumber = documentHeight - 2*zyFooterHeight - 40;
				var totalHeight = zyJudgeDetailHeight + zyFooterHeight ;
			
			 if(totalHeight < documentHeight){
				 $(".zyJudgeDetail").css({ "min-height": minHeightNumber +"px" });
			 }
		})
		
	</script>
	
</body>
</html>