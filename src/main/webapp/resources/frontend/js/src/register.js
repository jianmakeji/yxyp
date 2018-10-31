//$(document).ready(function () {
//    var zyFormHandler = new ZYFormHandler({
//        submitUrl: config.ajaxUrls.register,
//        successMessage: config.messages.registerSuccess,
//        redirectUrl: config.viewUrls.login
//    });
//    $("#myForm").validate({
//        ignore: [],
//        rules: {
//            email: {
//                required: true,
//                maxlength: 32,
//                email: true
//            },
//            mobile: {
//                required: true,
//                maxlength: 18
//            },
//            realname: {
//                required: true,
//                maxlength: 32
//            },
//            address: {
//                required: true,
//                maxlength: 32
//            },
//            password: {
//                required: true,
//                rangelength: [6, 20]
//            },
//            confirmPwd: {
//                equalTo: "#password"
//            },
//            activecode: {
//                required: true
//            }
//        },
//        messages: {
//            email: {
//                required: config.validErrors.required,
//                maxlength: config.validErrors.maxLength.replace("${max}", 32),
//                email: config.validErrors.email
//            },
//            mobile: {
//                required: config.validErrors.required,
//                maxlength: config.validErrors.maxLength.replace("${max}", 18)
//            },
//            realname: {
//                required: config.validErrors.required,
//                maxlength: config.validErrors.maxLength.replace("${max}", 32)
//            },
//            address: {
//                required: config.validErrors.required,
//                maxlength: config.validErrors.maxLength.replace("${max}", 32)
//            },
//            password: {
//                required: config.validErrors.required,
//                rangelength: config.validErrors.rangLength.replace("${max}", 20).replace("${min}", 6)
//            },
//            confirmPwd: {
//                equalTo: config.validErrors.pwdNotEqual
//            },
//            activecode: {
//                required: config.validErrors.required
//            }
//        },
//        submitHandler: function (form) {
//            zyFormHandler.submitFormWithJSON(form, null);
//        }
//    });
//    
//    $(".zyActiveCode").on("click",function(){
//        var timeStamp = '?' + new Date().getTime() + 'r' + Math.random();
//        $(this).attr("src","user/getCode"+timeStamp);
//    })
//});

var register = new Vue({
	el:".register",
	data:function(){
		return{
			button1:"手机验证",
			showMobileCode:true,	//手机验证码显示参数
			disableBtn:false,
			disableSbt:true,		//提交按钮禁止
			mobileCodeText:"点击获取验证码",
			imgSrc:"user/getCode",
			formItem: {
				email: '',			//邮箱
				realname: '',		//用户名称
				mobile: '',			//手机号码
				mobileCode: '',		//手机验证码
				address: '',		//地址
				password: '',		//密码
				activecode: ''		//图片验证码
            },
            ruleValidate:{
            	email:[
        	       {required: true, message: '邮箱不能为空', trigger: 'blur'},
        	       {type:"email", message: '请输入正确邮箱格式', trigger: 'blur'}
            	],
            	realname:{required: true, message: '用户名不能为空', trigger: 'blur'},
            	mobile:[
        	        {required: true, message: '手机号码不能为空', trigger: 'blur'},
        	        {required: true, len:11, message: '请输入正确手机号码格式', trigger: 'blur'}
            	],
            	mobileCode:[
					{required: true, message: '请输入验证码', trigger: 'blur'},
					{len:6, message: '验证码为6位', trigger: 'blur'}
            	],
            	password:[
            	    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}
            	],
            	confirmPassword:[
            	    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}
            	],
            	activecode:{required: true, message: '验证码不能为空', trigger: 'blur'}
            }
		}
	},
    methods: {
    	//验证方式选择
    	radioChange:function(value){
    		if(value == "邮箱验证"){
    			this.showMobileCode = false;
        		console.log("邮箱验证");
    		}else if(value == "手机验证"){
    			this.showMobileCode = true;
        		console.log("手机验证");
    		}
    	},
    	//发送手机验证短信
    	sendAcodeStg:function(){
    		var that = this;
    		var num = 60;
    		var int = setInterval(function(){
    			num > 0 ? num-- : clearInterval(int);
        		that.mobileCodeText = num + "秒后重试";
        		that.disableBtn = true;
        		if(num == 0){
        			that.mobileCodeText = "点击获取验证码";
            		that.disableBtn = false;
        		}
    		},1000);
    	},
    	//验证手机验证码
    	checkMobileCode:function(){
    		console.log("11111111");
    	},
    	//验证两次密码输入
    	conPwdBlur:function(){
    		if(this.formItem.password && this.formItem.confirmPassword != this.formItem.password){
    			this.$Notice.error({ title: '输入的密码不一致'});
    		}
    	},
    	//刷新图片验证码内容
    	tapClick: function () {
    		var timeStamp = '?' + new Date().getTime() + 'r' + Math.random();
    		this.imgSrc = "user/getCode"+timeStamp;
        }
    }
})