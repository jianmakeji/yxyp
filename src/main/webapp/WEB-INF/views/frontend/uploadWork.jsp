<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="../head.jsp"%>

<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/pageMenu.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/uploadWork.css" type="text/css" rel="stylesheet">

<!-- vue和iview引用文件 -->
<link rel="stylesheet" type="text/css" href="resources/css/lib/iview.css">
<script type="text/javascript" src="resources/js/lib/vue.min.js"></script>
<script type="text/javascript" src="resources/js/lib/iview.min.js"></script>
<script src="resources/js/lib/promise.js"></script>
<script type="text/javascript" src="resources/js/lib/aliyun-oss-sdk.min.js"></script>
<script>
	var id = "${production.id}";
</script>
</head>
<body style="max-width:none;">
	<%@ include file="header.jsp"%>
	<%@ include file="pageMenu.jsp"%>
	
	<div class="uploadWork" :style="uploadWorkStyle" v-cloak> 
		<div v-show="step != '3'">
			<row type="flex" justify="center" align="top" >
		        <i-col class="rules" span="8">
		        	<h2 class="uploadRuleTitle">上传作品</h2>
		        	<div class="uploadRule_1" v-show="step === '1'">
		        		
		        	</div>
		        	<div class="uploadRule_2" v-show="step === '2'">
		        		<p class="uploadRuleText">
							<span style="color: #656464;">概念设计组：</span>主要评选出相关研究机构、高校、设计机构、自由设计师和相关爱好者的概念设计作品、服务设计或解决方案。<br>
							<span style="color: #656464;">产品创新组：</span>主要评选出相关企事业单位、研究机构、设计机构、自由设计师等制造生产、运营管理的已完成功能开发、销售或投入使用的设计产品、场所或综合服务系统。<br>
						</p>	
						<h5 class="uploadRuleSubTitle">作品提交及报名要求</h5>
						<p class="uploadRuleText">
							1.<font class="improtentText">作品要求</font>:所有参赛作品内容需要符合本次大赛的主题和征集方向，参赛者须保证对其参赛作品具有原创性，具有完整的知识产权，不存在知识产权侵权或任何其他侵权行为。产业创新组限销售或投入使用5年以内（2014年1月1日以后销售或投入使用）的服务或者产品设计报名参赛。<br>
							2.<font class="improtentText">作品提交要求</font>:已销售或投入使用的服务或者产品设计（含已取得专利的产品和服务）提交“产业创新组”参赛。所有未销售或投入使用的服务或者产品设计提交“概念设计组”参赛。
						</p>
						<h5 class="uploadRuleSubTitle">概念设计组作品提交要求</h5>
						<p class="uploadRuleText">
							（1）作品版面大小为<font class="zyFF0000">A1</font>（840mm×594mm）图幅，<font class="improtentText">竖构图</font>，jpg格式，精度350dpi；单张图片大小<font class="improtentText">不得超过5M</font>。<br>
							（2）每件参赛作品不超过3个版面，版面内容包含主题阐释、效果图、必要的结构图、基本外观尺寸图及设计说明（必须是中英双语）等。
						</p>
						<h5 class="uploadRuleSubTitle">产业创新组作品提交要求</h5>
						<p class="uploadRuleText">
							（1）提交3张高精度（350dpi以上）产品实物照片，单张图片大小<font class="improtentText">不得超过5M</font>。<br>
							（2）填写产品/服务设计说明（300字以内），并提交相应的辅助资料（如产品/服务网页链接等信息）。
						</p>
						<p class="uploadRuleText">
							另外，为保证本次大赛评选的公正性，参赛作品及版面上不得出现作者所在单位、姓名（包括英文或拼音缩写）或与作者身份有关的任何图标、图形等个人信息资料。
						</p>
		        	</div>
		        </i-col>
		        <!-- 右侧作品部分 -->
		        <i-col span="10">
		        	<!-- 步骤条 -->
					<Steps :current="current">
						<Step title="参赛者信息"></Step>
						<Step title="作品信息 "></Step>
						<Step title="预览提交"></Step>
					</Steps>
					<div class="userInfo">
						<i-form :label-width="130" ref="formItem" :model="formItem" :rules="ruleformItem">
							
							<!-- 第一部分：参赛者信息 -->
							<div v-show="step === '1'">
								<form-item label="参与者类型">
									<radio-group v-model="formItem.participantType" @on-change="userInfoChange">
								        <radio label="1" value="1">个人</radio>
								        <radio label="2" value="2">团队</radio>
								        <radio label="3" value="3">企业</radio>
								    </radio-group>
								</form-item>
								<form-item :label="participantNameLabel" prop="participantName">
									<i-input v-model="formItem.participantName" placeholder="请输入姓名"></i-input>
								</form-item>
								<form-item label="队员姓名" v-show="formItem.participantType == '2'">
									<i-input v-model="formItem.teamMember" placeholder="成员姓名用中文逗号连接"></i-input>
								</form-item>
								<form-item :label="participantIdNumberText" prop="participantIdNumber">
									<i-input v-model="formItem.participantIdNumber" :placeholder="idNamePlaceholder"></i-input>
								</form-item>
								<form-item label="所属单位" v-show="formItem.participantType != '3'">
									<i-input v-model="formItem.affiliatedUnit" placeholder="请输入所属单位"></i-input>
								</form-item>
								<form-item label="简介" prop="participantBrief">
									<i-input type="textarea" v-model="formItem.participantBrief" placeholder="请输入个人简介"></i-input>
								</form-item>
								<form-item>
									<i-button type="primary" @click="goStep2">下一步</i-button>
								</form-item>
							</div>
					
							
							<!-- 第一部分：参赛者信息 -->
							<div v-show="step === '2'">
								<form-item label="中文标题" prop="title">
									<i-input v-model="formItem.title" placeholder="请输入标题"></i-input>
								</form-item>
								<form-item label="English Title" prop="title_en">
									<i-input v-model="formItem.title_en" placeholder="请输入标题"></i-input>
								</form-item>
								<form-item label="中文简介" prop="content">
									<i-input type="textarea" v-model="formItem.content" placeholder="请输入个人简介"></i-input>
								</form-item>
								<form-item label="English Abstract" prop="content_en">
									<i-input type="textarea" v-model="formItem.content_en" placeholder="请输入个人简介"></i-input>
								</form-item>
								<form-item label="指导老师">
									<i-input v-model="formItem.adviser" placeholder="请输入指导老师"></i-input>
								</form-item>
								<form-item label="组别">
									<radio-group v-model="formItem.groupNum" @on-change="userInfoChange">
								        <radio label="1" value="1">概念设计组 </radio>
								        <radio label="2" value="2">产品创新组</radio>
								    </radio-group>
								</form-item>
								<form-item label="作品类型">
									<radio-group v-model="formItem.subGroupNum" @on-change="userInfoChange">
								        <radio label="1" value="1">精准农业类</radio>
								        <radio label="2" value="2">非遗文创类</radio>
								        <radio label="3" value="3">文旅休闲类 </radio>
								        <radio label="4" value="4">品牌农业类</radio>
								    </radio-group>
								</form-item>
								<form-item label="图幅一" prop="fileName_1">
									<img v-show="imgUrl_1.length" :src="imgUrl_1" style="width:120px;height:120px;"><br>
									<input type="file" @change="doUpload_1" ref="inputFile" accept="image/*"/></input>
									<i-progress :percent="progressPercent_1" />
								</form-item>
								<form-item label="图幅二">
									<img v-show="imgUrl_2.length" :src="imgUrl_2" style="width:120px;height:120px;"><br>
									<input type="file" @change="doUpload_2" ref="inputFile" accept="image/*"/></input>
									<i-progress :percent="progressPercent_2" />
								</form-item>
								<form-item label="图幅三">
									<img v-show="imgUrl_3.length" :src="imgUrl_3" style="width:120px;height:120px;"><br>
									<input type="file" @change="doUpload_3" ref="inputFile" accept="image/*"/></input>
									<i-progress :percent="progressPercent_3" />
								</form-item>
								<form-item label="附件">
				           			<label>请上传zip、rar格式压缩文件</label><br/>
									<i-button type="primary" id="browse">选择文件</i-button>
				           			<i-button type="primary" id="upload-btn">开始上传</i-button><br/>
				           			<label id="zyFormAttachTitle"></label>
				           			<i-progress :percent="attachFilePercent" />
								</form-item>
								<form-item>
									<i-button type="primary" @click="goStep1">上一步</i-button>
									<i-button type="primary" @click="goStep3">下一步</i-button>
								</form-item>
							</div>
							
						</i-form>
						
					</div>
				</i-col>
		    </row>
		</div>
		<div v-show="step === '3'" style="padding-bottom: 20px;">
			<row type="flex" justify="center" align="top">
		        <i-col class="preview" span="20">
		        	<h1>标题：{{formItem.title}}</h1>
		        	<h2>作者：{{formItem.participant_name}}</h2>
		        	<p>简介：{{formItem.content}}</p>
		        	<img v-show="imgUrl_1" :src="imgUrl_1" style="width:60%;height:auto;margin:5px auto;"><br>
		        	<img v-show="imgUrl_2" :src="imgUrl_2" style="width:60%;height:auto;margin:5px auto;"><br>
		        	<img v-show="imgUrl_3" :src="imgUrl_3" style="width:60%;height:auto;margin:5px auto;"><br>
		        	<i-button type="primary" @click="goStep2">上一步</i-button>
					<i-button type="primary" @click="submit">提交</i-button>
		        </i-col>
		    </row>
		</div>
	</div>
    <%@ include file="footer.jsp"%>
	
	<script>
		var pageName = "uploadWork";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	
	<script src="resources/js/lib/plupload.full.min.js"></script>
	<script src="resources/frontend/js/lib/plupLoad.js"></script>
	<script src="resources/js/lib/juicer-min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/frontend/js/src/ossupload.js"></script>
	<script src="resources/frontend/js/src/uploadWork.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>