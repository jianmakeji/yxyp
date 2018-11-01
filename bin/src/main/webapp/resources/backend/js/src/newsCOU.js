var g_object_name = "";
var key = '';
var hostPrefix = "http://dc-yl.oss-cn-hangzhou.aliyuncs.com/";

var uploadImage = "resources/backend/images/app/defaultPeopleImage.jpg";
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
    g_object_name = key + random_string(10) + suffix

}
function get_uploaded_object_name(filename) {
    return g_object_name;
}
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
            thumb: uploadImage
        },
        ruleDataSourse:{
        	title:[{ required: true,max: 50, message: '请字数控制在50以内', trigger: 'blur' }],
        	newsAbstract:[{ required: true,max: 225, message: '请字数控制在225以内', trigger: 'blur' }]
        },
        imgShow:false,
        submitUrl: "",
        redirectUrl:config.viewUrls.newsMgr,
//        	图片上传
        g_object_name: '',
        policyBase64: '',
        accessid: '',
        callbackbody: '',
        signature: '',
        host: hostPrefix
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
                    	that.dataSourse.title = response.object.title;
                    	that.dataSourse.publishTime = response.object.publishTime;
                    	that.dataSourse.thumb = response.object.thumb;
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
//    **********************	图片上传		*******************************
    	handleSuccess: function(res, file, fileList) {
            this.dataSourse.thumb = hostPrefix + g_object_name;
        },
        handleFormatError: function(file) {
            this.$Message.error("文件格式错误！");
        },
        handleMaxSize: function(file) {
            this.$Message.error("文件不能超过2M！");
        },
        handleBeforeUpload: function(file) {
            var message = this.$Message;
            var that = this;
            $.ajax({
                type: 'GET',
                url: 'uploadKey/2',
                async: false,
                dataType: 'json',
                success: function(result) {
                	that.$refs.upload.data.host = result.host;
                	that.$refs.upload.data.policy = result.policy;
                	that.$refs.upload.data.OSSAccessKeyId = result.accessid;
                	that.$refs.upload.data.signature = result.signature;
                	that.$refs.upload.data.callback = '';
                    key = result.dir;
                    g_object_name = result.dir;
                    calculate_object_name(file.name)
                    that.$refs.upload.data.key = g_object_name;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                	that.$Notice.error({title:errorThrown});
                }
            });
        },
//     **********************	提交		*******************************   
    	submit: function(){
    		var that = this;
    		var img = new Image();
    		img.src = this.dataSourse.thumb;
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