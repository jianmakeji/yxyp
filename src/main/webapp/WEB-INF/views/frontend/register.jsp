<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/register.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>

</head>

<body  style="max-width:none;">

	<%@ include file="header.jsp"%>
	<div class="register" :style="registerStyle" v-cloak>
		<i-form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
			<form-item label="注册方式">
		        <radio-group v-model="formItem.mobileOrEmail" type="button" @on-change="radioChange">
			        <radio label="1" value="1">短信验证</radio>
			        <radio label="0" value="0">邮箱验证</radio>
			    </radio-group>
	        </form-item>
	        <form-item label="邮箱" prop="email">
	            <i-input type="email" v-model="formItem.email" placeholder="请输入邮箱"></i-input>
	        </form-item>
	        <form-item label="姓名" prop="realname">
	            <i-input type="text" v-model="formItem.realname" placeholder="请输入参赛者姓名"></i-input>
	        </form-item>
	        <form-item label="手机号码" prop="mobile">
	            <i-input type="text" v-model="formItem.mobile" placeholder="请输入手机号码"></i-input>
	        </form-item>
	        <form-item label="短信验证码" v-if="showMobileCode"  prop="mobileCode">
	            <i-input type="text" v-model="formItem.mobileCode" @on-blur="checkMobileCode" style="width:200px;" placeholder="验证码"></i-input>
	        	<i-button type="default" :disabled="disableBtn" @click="sendAcodeStg">{{mobileCodeText}}</i-button>
	        </form-item>
	        <form-item label="地址">
	            <i-input type="text" v-model="formItem.address" placeholder="请输入地址"></i-input>
	        </form-item>
	        <form-item label="密码" prop="password">
	            <i-input type="password" v-model="formItem.password" placeholder="请输入密码"></i-input>
	        </form-item>
	        <form-item label="确认密码" prop="confirmPassword">
	            <i-input type="password" v-model="formItem.confirmPassword" @on-blur="conPwdBlur" placeholder="请重新输入密码"></i-input>
	        </form-item>
	        <form-item label="图片验证码" prop="activecode">
	            <i-input type="text" v-model="formItem.activecode" style="width:200px;" placeholder="请重新图片验证码"></i-input>
	            <img :src="imgSrc" class="zyActiveCode" @click="tapClick">
	        </form-item>
	        <form-item>
	            <i-button type="primary" long :disabled="disableSbt" @click="submit('formItem')">提交</i-button>
	        </form-item>
	    </i-form>
	</div> 
	
	<%@ include file="footer.jsp"%>

	<script>
		var pageName = "register";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/frontend/js/src/register.js"></script>
</body>
</html>