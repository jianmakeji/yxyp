'use strict';

var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var Component = new Vue({
	el:".newsCOU",
	data:{
        dataSourse:{
        	id:"",
        	title:"",
            publishTime:"",
            newsAbstract:"",
            content:"",
            language:"",
            thumb: ""
        },
        ruleDataSourse:{
        	title:[{ required: true,max: 50, message: '请字数控制在50以内', trigger: 'blur' }],
        	newsAbstract:[{ required: true,max: 225, message: '请字数控制在225以内', trigger: 'blur' }]
        },
        imgShow:false,
        submitUrl: "",
        redirectUrl:config.viewUrls.newsMgr,

        imgUrl:"",
        fileName:"",
        progressPercent:0
    },
    created: function(){
    	this.dataSourse.id = window.location.href.split("news/newsCOU/")[1];
    	if(this.dataSourse.id){			//修改
    		var that = this;
    		var url = config.ajaxUrls.newsDetail.replace(":id",this.dataSourse.id);
    		$.ajax({
                dataType:"json",
                type:"get",
                url:url,
                data:{id:that.dataSourse.id},
                success:function(response){
                    if(response.success){
                    	console.log(response);
                    	
                    	//对图片进行签名获取
    	        		urllib.request(appServer, {
    	              		method: 'GET'
    	            	}).then(function (result) {
    	            	  	var creds = JSON.parse(result.data);
    	            	  	if(creds.success == "true"){
    	            	  		
    	            	  		var client = initClient(creds);
    	            	  		that.imgUrl = client.signatureUrl("news/"+response.object.thumb, {expires: 3600,process : 'style/thumb-200-200'});
    	            	  		that.fileName = response.object.thumb;
    	            	  		that.progressPercent = 100;
    	            	  	}
    	              	});
                    	that.dataSourse.title = response.object.title;
                    	that.dataSourse.publishTime = response.object.publishTime;
                    	that.dataSourse.newsAbstract = response.object.newsAbstract;
                    	var contentArr = "",
                    		str = "";
                    	contentArr = response.object.content.split("../");
                    	for(var i=0; i<contentArr.length;i++){
                    		if(contentArr[i] != ""){
                        		if(i != contentArr.length -1){
                            		str = str + contentArr[i] + "../../";
                        		}else{
                        			str = str + contentArr[i];
                        		}
                    		}
                    	}
                    	that.dataSourse.content = str;
                    	that.dataSourse.id = response.object.id;
                    	if(response.object.language){
                    		that.dataSourse.language = "1";
                    	}else{
                    		that.dataSourse.language = "0";
                    	}
                    	that.imgShow = true;
                    	that.submitUrl = config.ajaxUrls.newsUpdate;
                    }else{
                    	that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
                	that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{						//新建
    		this.submitUrl = config.ajaxUrls.newsCreate;
    	}
//    	富文本框初始化
    	tinymce.init({
            selector: "#content",
            height:300,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            //image_advtab: true,
            plugins : 'link image preview fullscreen table textcolor colorpicker code',
            setup: function (ed) {
                ed.on('blur', function (e) {
                    $("#content").val("sas",ed.getContent());
                    if(ed.getContent()){
                        $(".error[for='content']").remove();
                    }
                });
            }
        });
    },
    methods:{
    	doUpload:function(files){
    		var that = this;
        	urllib.request(appServer, {
          		method: 'GET'
        	}).then(function (result) {
        	  	var creds = JSON.parse(result.data);
        	  	if(creds.success == "true"){
        	  		var client = initClient(creds);
        	  		multipartUpload(client, files, that, progress);
        	  	}
          	});
    	},
    	submit: function(){
    		var that = this;
    		var img = new Image();
    		img.src = this.imgUrl;
    		this.dataSourse.thumb = this.fileName;
    		if(img.width == img.height){
    			this.dataSourse.content = tinyMCE.activeEditor.getContent();
        		var that = this;
        		$.ajax({
        	        url:that.submitUrl,
        	        type:"post",
        	        dataType:"json",
        	        contentType :"application/json; charset=UTF-8",
        	        data:JSON.stringify(that.dataSourse),
        	        success:function(response){
        	            if(response.success){
        	                if(that.redirectUrl){
        	                	that.$Notice.success({title:that.successMessage?that.successMessage:config.messages.optSuccRedirect});
        	                    setTimeout(function(){
            	                    window.location.href=that.redirectUrl;
        	                    },3000);
        	                }else{
        	                	that.$Notice.success({title:that.successMessage?that.successMessage:config.messages.optSuccess});
        	                }
        	            }else{
        	            	that.$Notice.error({title:response.message});
        	            }
        	        },
        	        error:function(){
        	        	that.$Notice.error({title:config.messages.networkError});
        	        }
        	    });
    		}else{
    			this.$Notice.error({title:"封面图尺寸有误！"});
    		}
    	}
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

function multipartUpload(client, files, that, progress){
	var file = files.target.files[0];
	var fileName = files.target.files[0].name;
	client.multipartUpload('news/'+ fileName, file,{
		progress: progress
	}).then(function (res) {
		var res = client.signatureUrl('news/' + fileName);
		that.imgUrl = res;
		that.fileName = fileName;
	});
}
var progress = function (p) {
	return function (done) {
		Component.progressPercent = p * 100;
		done();
	}
};
