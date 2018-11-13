<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../head.jsp"%>
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/judgeDetail.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="https://www.promisejs.org/polyfills/promise-6.1.0.js"></script>
<script type="text/javascript" src="http://gosspublic.alicdn.com/aliyun-oss-sdk.min.js"></script>
<script>
	var img = "${judge.headicon}";

</script>

</head>
<body>

	<%@ include file="header.jsp"%>
	<div class="judgeDetail" :style="judgeDetailStyle" v-cloak>
		<row type="flex" justify="center">
	        <i-col span="3">
				<img class="zyThumb" :src="judgeHeadicon">
			</i-col>
			<i-col span="7">
				<label class="zyTip">${judge.name}</label>
				<div class="description">${judge.description.replace('../../','')}</div>
			</i-col>
	    </row>
	</div>

	<%@ include file="footer.jsp"%>


	<script>
		var pageName = "judge";
	</script>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	
	<script>
		'use strict';
		
		var appServer = 'http://localhost:8080/design/sigUploadKey/1';
		var bucket = 'dc-yxyp';
		var region = 'oss-cn-hangzhou';
	
		var urllib = OSS.urllib;
		var Buffer = OSS.Buffer;
		var OSS = OSS.Wrapper;
		var STS = OSS.STS;
		var judgeDetail = new Vue({
			el:".judgeDetail",
			data:function(){
				return{
					judgeDetailStyle:{
						minHeight:"",
					  	marginTop: config.cssHeight.headHeight + "px",
					  	paddingTop:"60px"
					},
					judgeHeadicon:""
				}
			},
			created:function(){
				var that = this;
				this.judgeDetailStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
				//对图片进行签名获取
        		urllib.request(appServer, {
              		method: 'GET'
            	}).then(function (result) {
            	  	var creds = JSON.parse(result.data);
            	  	if(creds.success == "true"){
            	  		var client = initClient(creds);
                	  	 that.judgeHeadicon = client.signatureUrl("judges/"+img, {expires: 3600,process : 'style/thumb-200-200'});	
            	  	}
                });
			}
		})
		function initClient(creds){
			var client = new OSS({
				region: region,
		  		accessKeyId: creds.accessKeyId,
		  		accessKeySecret: creds.accessKeySecret,
		  		stsToken: creds.securityToken,
		  		bucket: bucket
			});
			return client;
		}
	</script>
	
</body>
</html>