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
<style type="text/css">

</style>
<script>
	var id = "${production.id}";
</script>
</head>
<body style="max-width:none;">
	<%@ include file="header.jsp"%>
	<%@ include file="pageMenu.jsp"%>

	<div class="zyTwoSide zyMargin60" id="zyInfoPanel">
		<div class="zyCLeft zyTipPanel">
			<h2 class="zyTitle"><spring:message code="uploading"/></h2>			<!-- 上传作品 -->
			<div id="zyStep1Tip" class="zyStepTip">
			</div>
			<div id="zyStep2Tip" class="zyStepTip zyHidden">
				<p class="zyText">
					<span style="color: #656464;">概念设计组：</span>主要评选出相关研究机构、高校、设计机构、自由设计师和创新发明爱好者的概念设计作品或服务方案。<br>
					<span style="color: #656464;">产品创新组：</span>主要评选出相关企事业单位、研究机构、设计机构、自由设计师等制造生产的已完成功能开发的设计产品或综合服务系统。
				</p>	
				<h5 class="zySubTitle">作品提交及报名要求</h5>
				<p class="zyText">
					1.<font class="zyFF0000">作品要求</font>:所有参赛作品内容需要符合本次大赛的主题和征集方向，参赛者须保证对其参赛作品具有原创性，具有完整的知识产权，不存在知识产权侵权或任何其他侵权行为。产品创新组限销售或投入使用5年以内（2013年1月1日以后销售或投入使用）的服务或者产品设计报名参赛。<br>
					2.<font class="zyFF0000">作品提交要求</font>:所有未销售或投入使用的服务或者产品设计提交“概念设计组”参赛。已销售或投入使用的服务或者产品设计（含已取得专利的产品和服务）提交“产品创新组”参赛。
				</p>
				<h5 class="zySubTitle">概念设计组作品提交要求</h5>
				<p class="zyText">
					（1）作品版面大小为<font class="zyFF0000">A1</font>（840mm×594mm）图幅，<font class="zyFF0000">竖构图</font>，jpg格式，精度350dpi；单张图片大小<font class="zyFF0000">不得超过5M</font>。<br>
					（2）每件参赛作品提交3个版面，版面内容包含主题阐释、效果图、必要的结构图、基本外观尺寸图及设计说明（必须是中英双语）等。
				</p>
				<h5 class="zySubTitle">产品创新组作品提交要求</h5>
				<p class="zyText">
					（1）提交3张高精度（350dpi以上）产品实物照片，单张图片大小<font class="zyFF0000">不得超过5M</font>。<br>
					（2）填写产品/服务设计说明（300字以内），并提交相应的辅助资料（如说明书扫描文档，产品/服务网页链接等信息）。
				</p>
				<p class="zyText">
					为保证本次大赛评选的公正性，参赛作品及版面上不得出现作者所在单位、姓名（包括英文或拼音缩写）或与作者身份有关的任何图标、图形等个人信息资料。
				</p>
			</div>
		</div>

		<div class="zyCRight zyHandlerPanel">
			<div class="zyStep" id="zyStep">
				<div class="zyStepItem zyActive" data-target="#zyStep1"><spring:message code="contestant_info"/>&nbsp</div>
				>
				<div class="zyStepItem" data-target="#zyStep2">&nbsp<spring:message code="production_info"/>&nbsp</div>
				>
				<div class="zyStepItem" data-target="#zyPreview">&nbsp<spring:message code="preview_submission"/></div>
			</div>
			<div class="zyStepPanel" id="zyStep1">
				<div class="zyForm">
					<div class="zyFormRow" id="zySelectPersonType" style="margin-top: 29px;">
						<input type="radio" name="participantType" value="1" checked="checked" data-target="#zyPersonalInfo"><label>个人</label> <input type="radio"
							name="participantType" value="2" data-target="#zyTeamInfo" style="margin-left: 60px"><label>团队</label> <input type="radio" name="participantType" value="3"
							data-target="#zyCompanyInfo" style="margin-left: 60px"><label>企业</label>
					</div>
					<div id="zyPersonalInfo" class="zyPersonInfoPanel">
						<div class="zyFormRow">
							<label class="zyFormLabel">中文姓名</label>	<!-- 姓名 -->
							<div class="zyFormControl">
								<input type="text" name="participantName" class="zyInput zyActionRequired" placeholder = "请输入中文姓名">
							</div>
							<span class="zyRequired">*</span>
						</div>
						
						<!-- div class="zyFormRow">
							<label class="zyFormLabel">中文姓名</label>	姓名
							<div class="zyFormControl">
								<input type="text" name="participantName_en" class="zyInput zyActionRequired" placeholder = "请输入英文姓名">
							</div>
							<span class="zyRequired">*</span>
						</div> -->

						<div class="zyFormRow">
							<label class="zyFormLabel">身份证或护照号</label>	<!-- 身份证号 -->
							<div class="zyFormControl">
								<input id="identityPersonal" type="text" name="participantIdNumber" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="subordinate_units"/></label>	<!-- 所属单位 -->
							<div class="zyFormControl">
								<input type="text" name="affiliatedUnit" class="zyInput">
							</div>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="introduction"/></label>	<!-- 简介 -->
							<div class="zyFormControl">
								<textarea name="participantBrief" class="zyInput zyTextarea zyActionRequired"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>
					</div>
					<div id="zyTeamInfo" class="zyPersonInfoPanel zyHidden">
						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="captain_name"/></label>	<!-- 队长姓名 -->
							<div class="zyFormControl">
								<input type="text" name="participantName" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="captain_ID_number"/></label>	<!-- 队长身份证号 -->
							<div class="zyFormControl">
								<input id="identityCaptain" type="text" name="participantIdNumber" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="captain_subordinate_units"/></label>	<!-- 队长所属单位 -->
							<div class="zyFormControl">
								<input type="text" name="affiliatedUnit" class="zyInput">
							</div>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="member"/></label>		<!-- 队员 -->
							<div class="zyFormControl">
								<textarea name="teamMember" class="zyInput zyTextarea zyActionRequired" placeholder="中文逗号隔开"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="introduction"/></label>
							<div class="zyFormControl">
								<textarea name="participantBrief" class="zyInput zyTextarea zyActionRequired"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>
					</div>

					<div id="zyCompanyInfo" class="zyPersonInfoPanel zyHidden">
						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="company_name"/></label>
							<div class="zyFormControl">
								<input type="text" name="participantName" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="business_license"/></label>
							<div class="zyFormControl">
								<input id="BusinessLicense" type="text" name="participantIdNumber" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow">
							<label class="zyFormLabel"><spring:message code="introduction"/></label>
							<div class="zyFormControl">
								<textarea name="participantBrief" class="zyInput zyTextarea zyActionRequired"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>
					</div>

				</div>

				<button id="zystep" style="margin-top: 86px;" class="zyBtn zyActionNavBtn" data-target="#zyStep2"><spring:message code="next_step"/></button>
			</div>

			<div class="zyStepPanel zyHidden" id="zyStep2">
				<div class="zyForm">
					
					<div id="zyProductInfo" class="zyWorkInfoPanel">
						
						<div class="zyFormRow" style="margin-top: 29px;">
							<label class="zyFormLabel" style="line-height: normal;">中文标题</label>	<!-- 标题 -->
							<div class="zyFormControl">
								<input type="text" name="title" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>
						<div class="zyFormRow">
							<label class="zyFormLabel" style="line-height: normal;">English Title</label>	<!-- 标题 -->
							<div class="zyFormControl">
								<input type="text" name="title_en" class="zyInput zyActionRequired">
							</div>
							<span class="zyRequired">*</span>
						</div>

						<div class="zyFormRow" style="margin-top: 1px;">
							<label class="zyFormLabel" style="line-height: normal;">中文简介</label>	<!-- 简介 -->
							<div class="zyFormControl">
								<textarea name="content" class="zyInput zyTextarea zyActionRequired"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>
						
						<div class="zyFormRow" style="margin-top: -7px;">
							<label class="zyFormLabel" style="line-height: normal;">English Abstract</label>	<!-- 简介 -->
							<div class="zyFormControl">
								<textarea name="content_en" class="zyInput zyTextarea zyActionRequired"></textarea>
							</div>
							<span class="zyRequired">*</span>
						</div>
						
						<div class="zyFormRow" style="    margin-top: -8px;">
							<label class="zyFormLabel">指导老师</label>	<!-- 简介 -->
							<div class="zyFormControl">
								<input type="text" name="adviser" class="zyInput">
							</div>
						</div>
						
						<!-- 概念作品	或者		创新作品	-->
						<div class="zyFormRow" id="zySelectProductType">
							<label class="zyFormLabel">组别</label>
							<input type="radio" class="zyProductImgInfoRadio" name="SelectProductType" value="1" checked="checked" data-target="#zyProductImgInfo"><label>概念设计组</label> 
							<input type="radio" class="zyProductsloganInfoRadio" name="SelectProductType" value="2" data-target="#zyProductSloganInfo" style="margin-left: 20px"><label>产品创新组</label> 
						</div>
						<div class="zyFormRow" id="zySelectProductSubGroupType" style="margin: 12px 0px;">
							<label class="zyFormLabel">作品类型</label>
							<input type="radio" class="zyProductSubGroupRadio1" name="SelectProductSubType" value="1" checked="checked" data-target="#zyProductImgInfo"><label>康复辅具类</label> 
							<input type="radio" class="zyProductSubGroupRadio2" name="SelectProductSubType" value="2" data-target="#zyProductSloganInfo" style="margin-left: 20px"><label>生活益智类</label> 
							<input type="radio" class="zyProductSubGroupRadio3" name="SelectProductSubType" value="3" data-target="#zyProductSloganInfo" style="margin-left: 20px"><label>设施环境类</label> 
							<input type="radio" class="zyProductSubGroupRadio4" name="SelectProductSubType" value="4" data-target="#zyProductSloganInfo" style="margin-left: 20px"><label>综合服务类</label> 
						</div>
						<!-- 概念作品	-->
						<div id="zyProductImgInfo" class="zyProductInfoPanel">
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面1</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer1">
									<img id="uploadBg" class="conceptProductImage1" style="width: 198px;height:280px;margin-top: 25px;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe"><span id="bgFileCompletePersent"></span></b>
												<div  id="ossBgProgress"  class="progress">
													<div class="determinate" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面2</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer2">
									<img id="uploadBg4" class="conceptProductImage2" style="width: 198px;height:280px;margin-top: -40px;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo4" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe4"><span id="bgFileCompletePersent4"></span></b>
												<div  id="ossBgProgress4"  class="progress">
													<div class="determinate4" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole4"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面3</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer3">
									<img id="uploadBg5" class="conceptProductImage3" style="width: 198px;height:280px;margin-top: -40px;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo5" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe5"><span id="bgFileCompletePersent5"></span></b>
												<div  id="ossBgProgress5"  class="progress">
													<div class="determinate5" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole5"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
						</div>
						<!-- 创新作品	-->
						<div id="zyProductSloganInfo" class="zyProductInfoPanel zyHidden">
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面1</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer1">
									<img id="uploadBg1" class="innovatProductImage1" style="width: 198px;height:280px;margin-top: 25px ;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe1"><span id="bgFileCompletePersent1"></span></b>
												<div  id="ossBgProgress1"  class="progress">
													<div class="determinate1" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole1"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面2</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer1">
									<img id="uploadBg2" class="innovatProductImage2" style="width: 198px;height:280px;margin-top: -40px;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo2" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe2"><span id="bgFileCompletePersent2"></span></b>
												<div  id="ossBgProgress2"  class="progress">
													<div class="determinate2" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole2"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
							<div class="zyFormRow">
								<label class="zyFormLabel" style="margin-top: -8px;">版面3</label>
								<div class="zyFormControl zyUploadControl" id="uploadImageContainer1">
									<img id="uploadBg3" class="innovatProductImage3" style="width: 198px;height:280px;margin-top: -40px;" src="resources/frontend/images/app/defaultImage.jpg" /> 
									<div id="uploadBgInfo3" style="width:300px">
										<div id="ossBgfile">
											<div><b id="bgFileDescribe3"><span id="bgFileCompletePersent3"></span></b>
												<div  id="ossBgProgress3"  class="progress">
													<div class="determinate3" style="width: 1%"></div>
												</div>
											</div>
										</div>
										<pre id="bgConsole3"></pre>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>
						</div>
						<div class="zyFormRow" style="margin-top:-25px;">
							<label class="zyFormLabel">附件</label>
							<button type="default" id="browse">选择文件</button>
		           			<button type="default" id="upload-btn">开始上传</button><br/>
		           			<label>请上传zip、rar格式压缩文件</label><br/>
		           			<label id="zyFormAttachTitle"></label>
						</div>
					</div>

					<button class="zyBtn zyActionNavBtn" data-target="#zyStep1" style="margin-top: 86px;">上一步</button>
					<button class="zyBtn zyActionNavBtn" data-target="#zyPreview" style="margin-top: 86px;">下一步</button>
				</div>
			</div>
		</div>
	</div>

	<div class="zyStepPanel zyHidden zyMargin60" id="zyPreview">
		<div class="zyStep zyTCenter">
			<div class="zyStepItem" data-target="#zyStep1"><spring:message code="contestant_info"/></div>
			>
			<div class="zyStepItem" data-target="#zyStep2"><spring:message code="production_info"/></div>
			>
			<div class="zyStepItem  zyActive" data-target="#zyPreview"><spring:message code="preview_submission"/></div>
		</div>

		<div class="zyWorkDetail" id="zyPreviewContent"></div>

		<script type="text/template" id="zyPreviewTpl">
            <h3 class="zyTitle">标题：$ZY{title}</h3>
            <h3 class="zyAuthor">作者：$ZY{participantName}</h3>
            <p class="zyText">简介：$ZY{content}</p>
			{@if slogan}
               <div class="slogan">口号:&nbsp;&nbsp;$ZY{slogan}</div>
            {@/if}
			
			{@each pimageArr as item}
				<img id="imgProduct" src="$ZY{item}" style="margin:10px auto;">
			{@/each}
        </script>
		<!-- {@if pimage}
                <img id="imgProduct" src="$ZY{pimage}" style="margin:10px auto;">
            {@/if} -->
		<div class="zyTCenter" style="margin-top: 86px;">
			<button class="zyBtn zyActionNavBtn" data-target="#zyStep2"><spring:message code="previous_step"/></button>
			<button class="zyBtn" id="zySubmitData"><spring:message code="submit"/></button>
		</div>
	</div><br><br><br><br>

    <%@ include file="footer.jsp"%>
	<%@ include file="loading.jsp"%>
	
	<script>
		var pageName = "uploadWork";
	</script>

	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/jquery.toastmessage.js"></script>
	<script src="resources/js/lib/plupload.full.min.js"></script>
	<script src="resources/frontend/js/lib/plupLoad.js"></script>
	<script src="resources/js/lib/juicer-min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script src="resources/js/src/functions.js"></script>
	<script src="resources/js/src/ZYFormHandler.js"></script>
	<script src="resources/js/src/ZYCOUHandler.js"></script>
	<script src="resources/frontend/js/src/ossupload.js"></script>
	<script src="resources/frontend/js/src/uploadWork.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
</body>
</html>