<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:directive.page import="java.util.Hashtable" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<script>
	var productionId = '${production.id}';
</script>
</head>
<body>
	<%@ include file="header.jsp"%>

	<div class="zyWorkDetail zyMargin150" id="zyWorkDetail">
		<h3 class="zyTitle"><spring:message code="title"/>：${production.title}</h3>
		
		<p class="zyText"><spring:message code="introduction"/>：${production.content}</p>
		
		<c:if test="${!empty production.attachFile}">
			<div class="zy20C7BE">
				附件下载:&nbsp;&nbsp;<a class="zy20C7BE" href="file/downloadFile?filePath=${production.attachFile}" target="_blank">${production.attachFile}</a>
			</div>
			<br>
		</c:if>
		<%-- <c:if test="${!empty production.pimage}">
			<div class="zy20C7BE">
				<img src="${production.pimage}" style="margin:10px auto;">
			</div>
			<br>
		</c:if> --%>

		
	</div>

	<script>
		var pageName = "xxx";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/frontend/js/src/workDetail.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>