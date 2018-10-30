<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>


<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
</head>
<body style="max-width:none;">

	<%@ include file="header.jsp"%>
	<%@ include file="pageMenu.jsp"%>

	<div class="zyPanel zyMargin60">
		<h3 class="zyPanelTitle"><spring:message code="essential_information"/></h3>
		<form id="myForm" class="zyForm" method="post" action="#">
			<div class="zyFormRow">
				<label class="zyFormLabel"><spring:message code="name"/>*</label>
				<div class="zyFormControl">
					<input type="text" class="zyInput" name="realname" value="${user.realname}">
				</div>
			</div>
			<div class="zyFormRow">
				<label class="zyFormLabel"><spring:message code="tel"/>*</label>
				<div class="zyFormControl">
					<input type="text" class="zyInput" name="mobile" value="${user.mobile}">
				</div>
			</div>
			<div class="zyFormRow">
				<label class="zyFormLabel"><spring:message code="address"/>*</label>
				<div class="zyFormControl">
					<input type="text" class="zyInput" name="address" value="${user.address}">
				</div>
			</div>
			<div class="zyFormRow">
				<div class="zyTCenter">
					<button type="submit" class="zyBtn" style="margin-top: 33px;"><spring:message code="preservation"/></button>
				</div>
			</div>
		</form>

		<br>
		<hr style="color: #6d6d6d;">
		<br>
		<h3 class="zyPanelTitle"><spring:message code="password"/></h3>
		<form id="myForm1" class="zyForm" method="post" action="#">
			<div class="zyFormRow">
				<label class="zyFormLabel"><spring:message code="new_password"/>*</label>
				<div class="zyFormControl">
					<input type="password" class="zyInput" name="newPwd" id="password">
				</div>
			</div>
			<div class="zyFormRow">
				<label class="zyFormLabel"><spring:message code="confirm_password"/>*</label>
				<div class="zyFormControl">
					<input type="password" class="zyInput" name="confirmPwd">
				</div>
			</div>
			<div class="zyFormRow">
				<div class="zyTCenter">
					<button type="submit" class="zyBtn" style="margin-top: 33px;"><spring:message code="preservation"/></button>
				</div>
			</div>
		</form>
	</div>


	<%@ include file="loading.jsp"%>

	<%@ include file="footer.jsp"%>
	<script>
		var pageName = "setting";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/js/lib/jquery.serialize-object.min.js"></script>
	<script src="resources/js/lib/jquery.form.js"></script>
	<script src="resources/js/lib/jquery.validate.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/js/src/ZYFormHandler.js"></script>
	<script src="resources/frontend/js/src/resetInfo.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>