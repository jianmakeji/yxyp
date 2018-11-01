<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>

<link href="resources/frontend/css/src/login.css" type="text/css" rel="stylesheet">
</head>
<body>
<div><a class="close" href=""><spring:message code="close"/></a></div>

	<form class="pCenter" id="myForm" method="post" action="dologin">
		<div class="logo">
			<span class="glyphicon glyphicon-user"></span>
		</div>
		<h1 class="appTitle"><spring:message code="system_login"/></h1>
		<div class="row">
			<input class="ctrlInput icon1" type="text" name="username" placeholder="邮箱" style="margin-top: 36px;">
		</div>
		<div class="row">
			<input id="password" class="ctrlInput icon2" type="password" name="password" placeholder="密码"  style="margin-bottom: 20px;margin-top:-10px; ">
		</div>

		<div class="row submit">
			<input type="submit" class="ctrlBtn" value="登录" style="margin-top: -10px;"> <label class="error tCenter">${error}</label>
		</div>
		<div class="row">
			<a href="user/register" style="float: left;margin-top: -8px;">注册</a> <a href="user/forgetPwd" style="float: right;margin-top: -8px;">忘记密码</a>
		</div>
		<div class="logoBottom">
			<span class="glyphicon glyphicon-user"></span>
		</div>

	</form>

	<script>
		var pageName = "login";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.validate.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/login.js"></script>

</body>
</html>
