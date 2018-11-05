<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/frontend/css/lib/kkpager_blue.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/pageMenu.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/works.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script>
	var userId = "${sessionScope.userId}";
</script>
</head>
<body style="max-width:none;">

	<%@ include file="header.jsp"%>
	<%@ include file="pageMenu.jsp"%>
	<div class="works" v-cloak>
		<modal v-model="deleteModal" @on-ok="ok" title="警告！！！">
	        <p style="color:#ed3f14;text-align:center">
	            <Icon type="information-circled"></Icon>
	            <span style="font-size: 15px;">确定删除作品:{{productTitle}}？</span>
	        </p>
	    </modal>
		<i-table :columns="columns" :data="dataList"></i-table>
		<page class="page" :total="total" @on-change="pageChange"></page>
	</div>

    <%@ include file="footer.jsp"%>

	<script>
		var pageName = "works";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/works.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>