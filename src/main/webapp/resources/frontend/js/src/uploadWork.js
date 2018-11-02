/*var attachUrl = ""; 
var uploadWork = (function (config, functions) {
    return {
        
        initData: function (id) {
            ZYCOUHandler.getDataDetail(config.ajaxUrls.workDetail.replace(":id", id), {id: id}, function (data) {
                var personInfoPanel, workInfoPanel, targetPanel, targetPanel2;
                $("#zySelectPersonType input[value='" + data.participantType + "']").prop("checked", true);	//个人 团队 公司
                targetPanel = $("#zySelectPersonType input:checked").data("target");
                $(".zyPersonInfoPanel").addClass("zyHidden");
                $(targetPanel).removeClass("zyHidden");					//选中的显示
                
                personInfoPanel = $(".zyPersonInfoPanel").not(".zyHidden");		//没有隐藏的选项
                personInfoPanel.find('input[name="participantName"]').val(data.participantName);		//队长名称
                personInfoPanel.find('input[name="participantIdNumber"]').val(data.participantIdNumber);//队长身份证
                personInfoPanel.find('textarea[name="participantBrief"]').val(data.participantBrief);	//队长简介
                personInfoPanel.find('textarea[name="teamMember"]').val(data.teamMember);				//队长成员
                personInfoPanel.find("input[name='affiliatedUnit']").val(data.affiliatedUnit);			//队长所属单位
                
                workInfoPanel = $(".zyWorkInfoPanel");
                attachUrl = data.attachFile;
                if(data.subGroupNum == 1){
                	$("input[class ='zyProductSubGroupRadio1']").attr("checked", true);
                }else if(data.subGroupNum == 2){
                	$("input[class ='zyProductSubGroupRadio2']").attr("checked", true);
                }else if(data.subGroupNum == 3){
                	$("input[class ='zyProductSubGroupRadio3']").attr("checked", true);
                }else if(data.subGroupNum == 4){
                	$("input[class ='zyProductSubGroupRadio4']").attr("checked", true);
                }
                if(data.groupNum == 1){
                    workInfoPanel.find("input[name='title']").val(data.title);
                    workInfoPanel.find("input[name='title_en']").val(data.title_en);
                    workInfoPanel.find("textarea[name='content']").val(data.content);	//简介
                    workInfoPanel.find("textarea[name='content_en']").val(data.content_en);
                    workInfoPanel.find("input[name='adviser']").val(data.adviser);
                    var conceptArr = data.pimage.split(',');
                    workInfoPanel.find(".conceptProductImage1").attr("src", conceptArr[0]);	//概念作品1
                    workInfoPanel.find(".conceptProductImage2").attr("src", conceptArr[1]);	//概念作品2
                    workInfoPanel.find(".conceptProductImage3").attr("src", conceptArr[2]);	//概念作品3
                }else if(data.groupNum == 2){
                    workInfoPanel.find("input[name='title']").val(data.title);
                    workInfoPanel.find("input[name='title_en']").val(data.title_en);
                    workInfoPanel.find("textarea[name='content']").val(data.content);
                    workInfoPanel.find("textarea[name='content_en']").val(data.content_en);
                    workInfoPanel.find("input[name='adviser']").val(data.adviser);
                    $("#zyProductImgInfo").addClass("zyHidden");
                    $("#zyProductSloganInfo").removeClass("zyHidden");
                    $("input[class ='zyProductsloganInfoRadio']").attr("checked", true);
                    var innovatArr = data.pimage.split(',');
                    workInfoPanel.find(".innovatProductImage1").attr("src", innovatArr[0]);	//创新作品1
                    workInfoPanel.find(".innovatProductImage2").attr("src", innovatArr[1]);	//创新作品2
                    workInfoPanel.find(".innovatProductImage3").attr("src", innovatArr[2]);	//创新作品3
                }
            });
        },
        getSubmitData: function () {
            var personInfoPanel, workInfoPanel, productType;
            var obj = {};
            obj.participantType = $("#zySelectPersonType input:checked").val();
            personInfoPanel = $(".zyPersonInfoPanel").not(".zyHidden");
            obj.participantName = personInfoPanel.find('input[name="participantName"]').val();
            obj.participantIdNumber = personInfoPanel.find('input[name="participantIdNumber"]').val();
            obj.participantBrief = personInfoPanel.find('textarea[name="participantBrief"]').val();
            obj.teamMember = personInfoPanel.find('textarea[name="teamMember"]').val();
            obj.affiliatedUnit = personInfoPanel.find("input[name='affiliatedUnit']").val();
            workInfoPanel = $(".zyWorkInfoPanel").not(".zyHidden");
            productType = $("#zySelectProductType input:checked").val();
            subGroupNum = $("#zySelectProductSubGroupType input:checked").val();
            if(subGroupNum == "1"){
            	obj.subGroupNum = 1;
            }else if(subGroupNum == "2"){
            	obj.subGroupNum = 2;
            }else if(subGroupNum == "3"){
            	obj.subGroupNum = 3;
            }else if(subGroupNum == "4"){
            	obj.subGroupNum = 4;
            }
            if(productType == "1"){
                obj.title = workInfoPanel.find("input[name='title']").val();
                obj.title_en = workInfoPanel.find("input[name='title_en']").val();
                obj.content = workInfoPanel.find("textarea[name='content']").val();
                obj.content_en = workInfoPanel.find("textarea[name='content_en']").val();
                obj.adviser = workInfoPanel.find("input[name='adviser']").val();
                obj.attachFile = attachUrl;
                obj.status = 1;
                obj.pimageArr = [$("#uploadBg").attr('src'),$("#uploadBg4").attr('src'),$("#uploadBg5").attr('src')];
                for(var i = 0;i<obj.pimageArr.length;i++){
                	if(obj.pimageArr[i] == "resources/frontend/images/app/defaultImage.jpg"){
                		obj.pimageArr.splice(obj.pimageArr.indexOf("resources/frontend/images/app/defaultImage.jpg"),1);
                		i--;
                	}
                }
                obj.pimage = obj.pimageArr.join(",");
                obj.groupNum = 1;
            }else if(productType == "2"){
                obj.title = workInfoPanel.find("input[name='title']").val();
                obj.title_en = workInfoPanel.find("input[name='title_en']").val();
                obj.content = workInfoPanel.find("textarea[name='content']").val();
                obj.content_en = workInfoPanel.find("textarea[name='content_en']").val();
                obj.adviser = workInfoPanel.find("input[name='adviser']").val();
                obj.attachFile = attachUrl;
                obj.status = 1;
                obj.pimageArr = [$("#uploadBg1").attr('src'),$("#uploadBg2").attr('src'),$("#uploadBg3").attr('src')];
                for(var i = 0;i<obj.pimageArr.length;i++){
                	if(obj.pimageArr[i] == "resources/frontend/images/app/defaultImage.jpg"){
                		obj.pimageArr.splice(obj.pimageArr.indexOf("resources/frontend/images/app/defaultImage.jpg"),1);
                    	i--;
                	}
                }
                obj.pimage = obj.pimageArr.join(",");
                obj.groupNum = 2;
            }
            if (id) {
                obj.id = id;
            }

            return obj;
        },
        goToStep: function (stepId) {
            var personInfoPanel, workInfoPanel, canGo = true, previewTpl;
            if (stepId == "#zyStep1") {
                $(".zyStepTip").addClass("zyHidden");
                $("#zyInfoPanel").removeClass("zyHidden");
                $("#zyPreview").addClass("zyHidden");
                $("#zyStep1Tip").removeClass("zyHidden");
            }
            if (stepId == "#zyStep2") {
                //检测数据
                personInfoPanel = $(".zyPersonInfoPanel").not(".zyHidden");
                personInfoPanel.find(".zyActionRequired").each(function (index, el) {
	                if (!$(this).val()) {
	                    canGo = false;
	                }
                });
                if (!canGo) {
                    $().toastmessage("showErrorToast", config.messages.pleaseEnterPersonalInfo);
                    return false;
                }
                $(".zyStepTip").addClass("zyHidden");
                $("#zyInfoPanel").removeClass("zyHidden");
                $("#zyPreview").addClass("zyHidden");
                $("#zyStep2Tip").removeClass("zyHidden");
            }
            if (stepId == "#zyPreview") {
                //检测数据，设置数据
                workInfoPanel = $(".zyWorkInfoPanel").not(".zyHidden");
                workInfoPanel.find(".zyActionRequired").each(function (index, el) {
                    if (!$(this).val()) {
                        canGo = false;
                    }
                });

                if (!canGo) {
                    $().toastmessage("showErrorToast", config.messages.pleaseEnterWorkInfo);
                    return false;
                }

                previewTpl = $("#zyPreviewTpl").html();
                var obj = this.getSubmitData();
                $("#zyPreviewContent").html(juicer(previewTpl, this.getSubmitData()));

                $("#zyInfoPanel").addClass("zyHidden");
                
                $("#videoContainer").html($("#videoAddress").val());
            }
            $(".zyStep .zyStepItem.zyActive").removeClass("zyActive");
            $(".zyStepItem[data-target='" + stepId + "']").addClass("zyActive");
            $(".zyStepPanel").addClass("zyHidden");
            $(stepId).removeClass("zyHidden");
        }
    }
})(config, functions);

$(document).ready(function () {
//  ***************************附件上传******************************    
    var uploader = new plupload.Uploader({
        browse_button : 'browse', //触发文件选择对话框的按钮，为那个元素id
        url : config.ajaxUrls.attachUpload, //服务器端的上传页面地址
        multi_selection:false,
        filters:{
        	mime_types : [{ title : "Zip files", extensions : "zip,rar" }],
        	max_file_size : '100mb',
        	prevent_duplicates : true
        },
        multipart_params:{	//上传的参数
        	fileType:1,
        	file:[]
        }
    });    

    uploader.init();

    uploader.bind('FilesAdded',function(uploader,files){
    	$().toastmessage("showSuccessToast","已添加文件，确认无误请上传");
    });
    
    uploader.bind('FileUploaded',function(up, file, info){
    	$().toastmessage("showSuccessToast",config.messages.uploaded);
    	$("#zyFormAttachTitle").html(file.name);
    	attachUrl = JSON.parse(info.response).object;
    });
    
    uploader.bind('Error',function(uploader,file){
    	$().toastmessage("showErrorToast", config.messages.uploadIOError);
    });
    //最后给"开始上传"按钮注册事件
//    document.getElementById('upload-btn').onclick = function(){
//        uploader.start(); 
//    }
	
    var submitUrl = config.ajaxUrls.workCreate;
    juicer.set({
        'tag::interpolateOpen': '$ZY{'
    });
    
    if (id) {
        uploadWork.initData(id);
        submitUrl = config.ajaxUrls.workUpdate
    }
    var zyFormHandler = new ZYFormHandler({
        submitUrl: submitUrl,
        redirectUrl: config.viewUrls.works
    });

    var conceptProductOSSUploaderObject1 = new uploadOSSObject("uploadBg","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole"),$("#ossBgProgress"),$("#bgFileDescribe"),$("#ossBgfile .determinate"),$("#bgFileCompletePersent"),$("#uploadBg"));
	var conceptProductUploader1 = createUploader(conceptProductOSSUploaderObject1);
	conceptProductUploader1.init();
	
	var conceptProductOSSUploaderObject2 = new uploadOSSObject("uploadBg4","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole4"),$("#ossBgProgress4"),$("#bgFileDescribe4"),$("#ossBgfile .determinate4"),$("#bgFileCompletePersent4"),$("#uploadBg4"));
	var conceptProductUploader2 = createUploader(conceptProductOSSUploaderObject2);
	conceptProductUploader2.init();
	
	var conceptProductOSSUploaderObject3 = new uploadOSSObject("uploadBg5","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole5"),$("#ossBgProgress5"),$("#bgFileDescribe5"),$("#ossBgfile .determinate5"),$("#bgFileCompletePersent5"),$("#uploadBg5"));
	var conceptProductUploader3 = createUploader(conceptProductOSSUploaderObject3);
	conceptProductUploader3.init();
	
	var innovatProductOSSUploaderObject1 = new uploadOSSObject("uploadBg1","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole1"),$("#ossBgProgress1"),$("#bgFileDescribe1"),$("#ossBgfile .determinate1"),$("#bgFileCompletePersent1"),$("#uploadBg1"));
	var innovatProductUploader1 = createUploader(innovatProductOSSUploaderObject1);
	innovatProductUploader1.init();
	
	var innovatProductOSSUploaderObject2 = new uploadOSSObject("uploadBg2","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole2"),$("#ossBgProgress2"),$("#bgFileDescribe2"),$("#ossBgfile .determinate2"),$("#bgFileCompletePersent2"),$("#uploadBg2"));
	var innovatProductUploader2 = createUploader(innovatProductOSSUploaderObject2);
	innovatProductUploader2.init();
	
	var innovatProductOSSUploaderObject3 = new uploadOSSObject("uploadBg3","image/jpg,image/jpeg,image/png","jpg,jpeg,png",'5mb',
			$("#bgConsole3"),$("#ossBgProgress3"),$("#bgFileDescribe3"),$("#ossBgfile .determinate3"),$("#bgFileCompletePersent3"),$("#uploadBg3"));
	var innovatProductUploader3 = createUploader(innovatProductOSSUploaderObject3);
	innovatProductUploader3.init();

    $(".zyStep .zyStepItem, .zyActionNavBtn").click(function () {
        var targetPanel = $(this).data("target");
        uploadWork.goToStep(targetPanel);

    });

//    ***************************填写参赛者信息******************************
    $("#zySelectPersonType input[type='radio']").click(function () {
        var targetPanel = $(this).data("target");
        $(".zyPersonInfoPanel").addClass("zyHidden");
        $(targetPanel).removeClass("zyHidden");
    });

//    *****************************验证营业执照信息****************************
    //  验证营业执照
    function isBusinessLicenseNo(BusinessLicense) { 
    	var pattern = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/; 
    	return pattern.test(BusinessLicense); 
	}
    function formValidate2() {
     	var str = '';
    	// 验证身份证
	    if($.trim($('#BusinessLicense').val()).length == 0) { 
	      	str += '营业执照号码没有输入\n';
	      	$('#BusinessLicense').focus();
	    } else {
	      	if(isBusinessLicenseNo($.trim($('#BusinessLicense').val())) == false) {
	       		str += '营业执照号不正确；\n';
	       		$('#BusinessLicense').focus();
	      	}
	    }
	    if(str != ''  && $("#zySelectPersonType input[value='3']").is(':checked')) {
	    	$("#BusinessLicense").val("");
	    	$().toastmessage("showErrorToast", "营业执照号码信息有误");
	      	return false;
	    } 
    }
    $("#BusinessLicense").blur(function(){
    	formValidate2();
    })
//    *****************************作品上传**********************************
    	//  图幅、口号按钮选择
	  $("#zySelectProductType input[type='radio']").click(function () {
	  	var targetPanel = $(this).data("target");
	  	$(".zyProductInfoPanel").addClass("zyHidden");
	      $(targetPanel).removeClass("zyHidden");
	  });
//    *****************************作品上传**********************************
    $("#zySelectGroup input[type='radio']").click(function () {
        var targetPanel = $(this).data("target");
        $(".zyWorkInfoPanel").addClass("zyHidden");
        $(targetPanel).removeClass("zyHidden");
    });

    $("#zySubmitData").click(function () {
    	console.log(uploadWork.getSubmitData());
    	if(uploadWork.getSubmitData().pimageArr[0] == "resources/frontend/images/app/defaultImage.jpg" || uploadWork.getSubmitData().pimage == ""){
    		$().toastmessage("showErrorToast", "请上传作品图！");
    	}else if(uploadWork.getSubmitData().participantBrief.length >= 600){
    		$().toastmessage("showErrorToast", "简介不能超过600个字符！");
    	}else{
    		zyFormHandler.submitFormWithJSON(null, uploadWork.getSubmitData());
    	}
    });

});*/
'use strict';

var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var uploadWork = new Vue({
	el:".uploadWork",
	data:function(){
		return{
			current:0,
			step:"1",						//控制到了第几步
			participantName:"姓名",
			participantIdNumber:"身份证或护照号",
			idNamePlaceholder:"请输入身份证或护照号",
			formItem:{
				participant_type:"1",		//参与者类型
				participant_name:"",		//参与者姓名
				participant_id_number:"",	//身份证号码
				participant_brief:"",		//公司简介
				
				affiliatedUnit:"",			//所属单位---选择公司时隐藏
				team_member:"",				//队员姓名---选择团队时显示
				
				title:"",					//作品标题
				title_en:"",				//作品英文标题
				content:"",					//作品内容
				content_en:"",				//作品英文标题
				adviser:"",					//指导老师
				groupNum:"1",				//组别
				subGroupNum:"1"				//作品类型
			},
			
			fileName_1:"",	//上传文件名称参数（测试）
			imgUrl_1:"",
			progressPercent_1:0,	
			fileName_2:"",	//上传文件名称参数（测试）
			imgUrl_2:"",
			progressPercent_2:0,
			fileName_3:"",	//上传文件名称参数（测试）
			imgUrl_3:"",
			progressPercent_3:0	
		}
	},
	methods:{
		userInfoChange: function (value) {
            if(value == 1){				//个人
            	this.participantName = "姓名";
            	this.participantIdNumber = "证件号";
            	this.idNamePlaceholder = "请输入身份证或护照号";
            }else if(value == 2){			//团队
            	this.participantName = "队长姓名";
            	this.participantIdNumber = "队长证件号";
            	this.idNamePlaceholder = "请输入队长身份证或护照号";
            }else{							//公司
            	this.participantName = "公司名称";
            	this.participantIdNumber = "营业执照号";
            	this.idNamePlaceholder = "请输入公司营业执照号";
            }
        },
        goStep1:function(){
        	this.step = "1";
        	this.current = 0;
        },
        goStep2:function(){
        	this.step = "2";
        	this.current = 1;
        	console.log(this.formItem);
        },
        goStep3:function(){
        	this.step = "3";
        	this.current = 2;
        	console.log(this.formItem);
        },
        //上传第一件作品
        doUpload_1:function(files){
        	var that = this;
        	urllib.request(appServer, {
          		method: 'GET'
        	}).then(function (result) {
        	  	var creds = JSON.parse(result.data);
        		console.log(creds);
            	var client = new OSS({
            		region: region,
              		accessKeyId: creds.accessKeyId,
              		accessKeySecret: creds.accessKeySecret,
              		stsToken: creds.securityToken,
              		bucket: bucket
            	});
            	var file = files.target.files[0];;
            	var key = that.fileName;
            	client.multipartUpload('product/'+key, file,{
            		progress: progress
            	}).then(function (res) {
            		var res = client.signatureUrl('product/' + key);
            		that.imgUrl_1 = res;
            		console.log("res",res);
            		console.log(res.replace(globel_.aliHttp + "courseImages/",'').split('?')[0];)
            	});
          	});
        },
        doUpload_2:function(files){
        	var that = this;
        	urllib.request(appServer, {
          		method: 'GET'
        	}).then(function (result) {
        	  	var creds = JSON.parse(result.data);
        		console.log(creds);
            	var client = new OSS({
            		region: region,
              		accessKeyId: creds.accessKeyId,
              		accessKeySecret: creds.accessKeySecret,
              		stsToken: creds.securityToken,
              		bucket: bucket
            	});
            	var file = files.target.files[0];;
            	var key = that.fileName;
            	client.multipartUpload('product/'+key, file,{
            		progress: progress
            	}).then(function (res) {
            		var res = client.signatureUrl('product/' + key);
            		that.imgUrl_2 = res;
            	});
          	});
        },
        doUpload_3:function(files){
        	var that = this;
        	urllib.request(appServer, {
          		method: 'GET'
        	}).then(function (result) {
        	  	var creds = JSON.parse(result.data);
        		console.log(creds);
            	var client = new OSS({
            		region: region,
              		accessKeyId: creds.accessKeyId,
              		accessKeySecret: creds.accessKeySecret,
              		stsToken: creds.securityToken,
              		bucket: bucket
            	});
            	var file = files.target.files[0];;
            	var key = that.fileName;
            	client.multipartUpload('product/'+key, file,{
            		progress: progress
            	}).then(function (res) {
            		var res = client.signatureUrl('product/' + key);
            		that.imgUrl_3 = res;
            	});
          	});
        },
        submit:function(){
        	console.log("submit");
        }
	}
})
var progress = function (p) {
	return function (done) {
		uploadWork.progressPercent_1 = p * 100;
		done();
	}
};


































