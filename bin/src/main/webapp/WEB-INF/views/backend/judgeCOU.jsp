<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/backend/css/lib/bootstrap.min.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/src/main.css" type="text/css" rel="stylesheet">
<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>

<script>
	var id = "${judge.id}";
</script>
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<section class="right">
		<article class="judgeCOU" v-cloak>			
			<i-col span="24">新建/修改评委</i-col>	<br/><br/>
			<div>
			    <i-form :model="dataSourse" :rules="ruleDataSourse" :label-width="180" style="width:80%;" v-cloak>
			     	<form-item label="头像*">
			     	 	<i-col span="24">请上传1:1的jpg，png</i-col>
		                <upload ref="upload" :action="host" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" 
		                	:data="{
		                  		'key': g_object_name,
		                  		'policy': policyBase64,
		                  		'OSSAccessKeyId': accessid,
		                  		'success_action_status': '200',
		                  		'callback': callbackbody,
		                  		'signature': signature,
		                  	}" :show-upload-list="false">
		                    <div style="width:100px;height:auto">
		                        <img :src="dataSourse.headicon" style="width: 100%" name="thumb">
		                    </div>
		                </upload>
			        </form-item>
			        
			        <form-item label="姓名*">
			            <i-input v-model="dataSourse.name" placeholder="请输入姓名"></i-input>
			        </form-item>
			        <form-item label="邮箱*"  prop="email">
			            <i-input v-model="dataSourse.email" placeholder="请输入邮箱"></i-input>
			        </form-item>
			        <form-item label="密码*" prop="password">
			            <i-input v-model="dataSourse.password" placeholder="请输入密码"></i-input>
			        </form-item>
			        <form-item label="职位*">
			            <i-input v-model="dataSourse.subTitle" placeholder="职位"></i-input>
			        </form-item>
			         <form-item label="描述*">
			            <textarea v-model="dataSourse.description" name="content" id="description"></textarea>
			        </form-item>
			        <form-item>
			        	<i-button type="primary" v-on:click="submit" long>确定</i-button>
			        </form-item>
			    </i-form>
			</div>
		</article>
	</section>

	<%@ include file="loading.jsp"%>


	<script>
		var pageName = "judge";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/plupload.full.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>
	<script src="resources/backend/js/lib/tinyMCE/tinymce.min.js"></script>
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/src/judgeCOU.js"></script>

</body>
</html>