//图片上传
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
	el:".judgeCOU",
	data:{
//      图片上传
        g_object_name: '',
        policyBase64: '',
        accessid: '',
        callbackbody: '',
        signature: '',
        host: hostPrefix,
//      需要的数据
        dataSourse:{
        	headicon: uploadImage,
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
                    	that.dataSourse.headicon = response.object.headicon;
                    	that.dataSourse.name = response.object.name;
                    	that.dataSourse.email = response.object.email;
                    	that.dataSourse.password = response.object.password;
                    	that.dataSourse.subTitle = response.object.subTitle;
                    	that.dataSourse.description = response.object.description;
                    	that.submitUrl = config.ajaxUrls.judgeUpdate;
                    }else{
	            		that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
            		that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
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
//      **********************	图片上传		*******************************
    	handleSuccess: function(res, file, fileList) {
            this.dataSourse.headicon = hostPrefix + g_object_name + "?x-oss-process=style/thumb-300";
        },
        handleFormatError: function(file) {
            this.$Notice.error({title:"文件格式错误！"});
        },
        handleMaxSize: function(file) {
            this.$Notice.error({title:"文件不能超过2M！"});
        },
        handleBeforeUpload: function(file) {
            var message = this.$Message;
            var that = this;
            
            $.ajax({
                type: 'GET',
                url: 'uploadKey/3',
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
                    message.error(errorThrown);
                }
            });
        },
//      **********************	提交		*******************************   
    	submit: function(){
    		var img = new Image();
    		img.src = this.dataSourse.headicon;
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
        	                if(that.redirectUrl){
        	                	that.$Notice.success({title:that.successMessage?that.successMessage:config.messages.optSuccRedirect});
        	                    setTimeout(function(){
            	                    window.location.href=that.redirectUrl;
        	                    },3000);
        	                }else{
        	                	that.$Notice.warning({title:that.successMessage?that.successMessage:config.messages.optSuccess});
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
            	that.$Notice.error({title:"封面图尺寸有误！"});
    		}
    	}
    }
})