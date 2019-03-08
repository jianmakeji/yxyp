'use strict';

var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var judgeCOU = new Vue({
	el:".judgeCOU",
	data:{
//      图片上传
		imgUrl:"",
        fileName:"",
        progressPercent:0,
//      需要的数据
        dataSourse:{
        	headicon: "",
        	id:"",
        	name:"",
        	email:"",
        	password:"",
        	subTitle:"",
        	description:"",
        },
        ruleDataSourse:{
        	email: [{ required: true,type:"email",message: '请输入正确格式的邮箱', trigger: 'blur' }],
        	password: [{ required: true,type:"string",  min:6, message: '请输入至少6位数密码', trigger: 'blur' }]
        },
        submitUrl: "",
        redirectUrl:config.viewUrls.judgeMgr
        
    },
    created:function(){
    	this.dataSourse.id = window.location.href.split("judge/judgeCOU/")[1];
    	this.$Loading.start();
    	if(this.dataSourse.id){
    		var that = this;
    		var url = config.ajaxUrls.judgeDetail.replace(":id",this.dataSourse.id);
    		$.ajax({
                dataType:"json",
                type:"get",
                url:url,
                data:{id:that.dataSourse.id},
                success:function(response){
                    if(response.success){
                    	that.$Loading.finish();
                    	//对图片进行签名获取
    	        		urllib.request(appServer, {
    	              		method: 'GET'
    	            	}).then(function (result) {
    	            	  	var creds = JSON.parse(result.data);
    	            	  	if(creds.success == "true"){
    	            	  		
    	            	  		var client = initClient(creds);
    	            	  		that.imgUrl = client.signatureUrl("judges/"+response.object.headicon, {expires: 3600,process : 'style/thumb-200-200'});
    	            	  		that.fileName = response.object.headicon;
    	            	  		that.progressPercent = 100;
    	            	  	}
    	              	});
                    	
                    	
                    	that.dataSourse.name = response.object.name;
                    	that.dataSourse.email = response.object.email;
                    	that.dataSourse.password = response.object.password;
                    	that.dataSourse.subTitle = response.object.subTitle;
                    	that.dataSourse.description = response.object.description;
                    	that.submitUrl = config.ajaxUrls.judgeUpdate;
                    }else{
                    	that.$Loading.error();
	            		that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
                	that.$Loading.error();
            		that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
    		this.$Loading.finish();
    		this.submitUrl = config.ajaxUrls.judgeCreate;
    	}
//    	富文本框初始化
    	tinymce.init({
            selector: "#description",
            height:300,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            //image_advtab: true,
            plugins : 'link image preview fullscreen table textcolor colorpicker code',
            setup: function (ed) {
                ed.on('blur', function (e) {
                    $("#description").val(ed.getContent());
                    if(ed.getContent()){
                        $(".error[for='description']").remove();
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
    		var img = new Image();
    		img.src = this.imgUrl;
    		this.dataSourse.headicon = this.fileName;
    		this.$Loading.start();
    		if(img.width  == img.height){
    			this.dataSourse.description = tinyMCE.editors[0].getContent();
        		var that = this;
        		$.ajax({
        	        url:that.submitUrl,
        	        type:"post",
        	        dataType:"json",
        	        contentType :"application/json; charset=UTF-8",
        	        data:JSON.stringify(that.dataSourse),
        	        success:function(response){
        	            if(response.success){
        	            	that.$Loading.finish();
        	                if(that.redirectUrl){
        	                	that.$Notice.success({title:that.successMessage?that.successMessage:config.messages.optSuccRedirect});
        	                    setTimeout(function(){
            	                    window.location.href=that.redirectUrl;
        	                    },3000);
        	                }else{
        	                	that.$Loading.error();
        	                	that.$Notice.warning({title:that.successMessage?that.successMessage:config.messages.optSuccess});
        	                }
        	            }else{
        	            	that.$Loading.error();
        	            	that.$Notice.error({title:response.message});
        	            }
        	        },
        	        error:function(){
        	        	that.$Loading.error();
        	        	that.$Notice.error({title:config.messages.networkError});
        	        }
        	    });
    		}else{
    			that.$Loading.error();
            	that.$Notice.error({title:"封面图尺寸有误！"});
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
	calculate_object_name(fileName);
    var newFilename =  g_object_name;
	client.multipartUpload('judges/'+ newFilename, file,{
		progress: progress
	}).then(function (res) {
		var res = client.signatureUrl('judges/' + newFilename);
		that.imgUrl = res;
		that.fileName = newFilename;
	});
}
var progress = function (p) {
	return function (done) {
		judgeCOU.progressPercent = p * 100;
		done();
	}
};
//文件随机码
function random_string(len) {
    var len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function get_suffix(filename) {
    var pos = filename.lastIndexOf('.')
    var suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}
function calculate_object_name(filename) {

    var suffix = get_suffix(filename)
    g_object_name = key + random_string(16) + suffix

}
function get_uploaded_object_name(filename) {
    return g_object_name;
}