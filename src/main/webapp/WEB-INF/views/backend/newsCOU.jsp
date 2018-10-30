<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>

<link href="resources/backend/css/lib/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="resources/css/lib/jquery.toastmessage.css" rel="stylesheet" type="text/css">
<link href="resources/backend/css/src/main.css" type="text/css" rel="stylesheet">
<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script>
	var id = "${news.id}";
</script>
</head>
<body>

	<%@ include file="header.jsp"%>

	<div class="left">
		<%@ include file="menu.jsp"%>
	</div>

	<section class="right">		
		<!-- 使用iview插件 -->
		<article class="newsCOU" v-cloak>
			<i-col span="24">新建/修改新闻</i-col>	<br/><br/>
			<div>
			    <i-form :model="dataSourse" :rules="ruleDataSourse" :label-width="180" style="width:80%;" id="myForm">
			        <form-item label="封面图*">
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
		                        <img :src="dataSourse.thumb" style="width: 100%" name="thumb">
		                    </div>
		                </upload>
			        </form-item>
			        
			        <form-item label="标题*" prop="title">
			            <i-input v-model="dataSourse.title" placeholder="请输入标题..." name="title">{{dataSourse.title}}</i-input>
			        </form-item>
			        <form-item label="摘要*" prop="newsAbstract">
			            <i-input v-model="dataSourse.newsAbstract" placeholder="请输入摘要..." name="newsAbstract">{{dataSourse.newsAbstract}}</i-input>
			        </form-item>
			         <form-item label="内容*" prop="content">
			            <textarea v-model="dataSourse.content" name="content" id="content">{{dataSourse.content}}</textarea>
			        </form-item>
			        <form-item>
			        	<i-button type="primary" v-on:click="submit"  long>确定</i-button>
			        </form-item>
			    </i-form>
			</div>
		</article>
	</section>

	<%@ include file="loading.jsp"%>


	<script>
		var pageName = "news";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/backend/js/lib/bootstrap.min.js"></script>	
	<script src="resources/js/lib/plupload.full.min.js"></script>
	<script src="resources/backend/js/lib/tinyMCE/tinymce.min.js"></script>		<!-- 富文本编辑插件 -->
	<script src="resources/backend/js/src/config.js"></script>
	<script src="resources/backend/js/src/newsCOU.js"></script>

</body>
</html>