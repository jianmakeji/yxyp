var attachUrl = ""; 
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
    document.getElementById('upload-btn').onclick = function(){
        uploader.start(); 
    }
	
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

});
