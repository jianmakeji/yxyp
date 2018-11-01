var register = new Vue({
	el:".register",
	data:function(){
		return{
			showMobileCode:true,	//手机验证码显示参数
			disableBtn:false,		//获取验证码禁止
			disableSbt:true,		//提交按钮禁止
			mobileCodeText:"点击获取验证码",
			imgSrc:"user/getCode",	//图片验证码路径
			formItem: {
				mobileOrEmail:"1",
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
    		if(value == "0"){				//  email
    			this.showMobileCode = false;
    			this.disableSbt = false;
    			this.formItem.mobileCode = "";
    		}else if(value == "1"){			//  mobile
    			this.showMobileCode = true;
    			this.disableSbt = true;
    		}
    	},
    	//发送手机验证短信
    	sendAcodeStg:function(){
    		var that = this;
    		this.$Loading.start();
    		if(this.formItem.mobile.length == 11){
    			var url = config.ajaxUrls.sendMobileCode + this.formItem.mobile;
    			$.ajax({
                    dataType:"json",
                    type:"get",
                    url:url,
                    success:function(res){
                        if(res.success){
                    		that.$Loading.finish();
                        	that.$Notice.success({title:res.message, duration:3});
                        	clock(that);
                        }else{
                    		that.$Loading.error();
                        	that.$Notice.error({title:res.message, duration:3});
                        }
                    },
                    error:function(){
                		that.$Loading.error();
                    	that.$Notice.error({title:config.messages.networkError, duration:3});
                    }
                })
    		}else if(this.formItem.mobile.length == 0){
        		that.$Loading.error();
    			that.$Notice.error({title:"请输入手机号", duration:3});
    		}
    	},
    	//验证手机验证码
    	checkMobileCode:function(event){
			var that = this,
			url = config.ajaxUrls.vertifyCode;
    		$.ajax({
                dataType:"json",
                type:"GET",
                url:url,
                data:{mobile:this.formItem.mobile,code:this.formItem.mobileCode},
                success:function(res){
                    if(res.success){
                    	that.$Notice.success({title:res.message, duration:3});
                    	that.disableSbt = false;
                    }else{
                    	that.$Notice.error({title:res.message, duration:3});
                    }
                },
                error:function(){
                	that.$Notice.error({title:config.messages.networkError, duration:3});
                }
            })
    	},
    	//验证两次密码输入
    	conPwdBlur:function(){
    		if(this.formItem.password && this.formItem.confirmPassword != this.formItem.password){
    			this.$Notice.error({ title: '输入的密码不一致', duration:3});
    		}
    	},
    	//刷新图片验证码内容
    	tapClick: function () {
    		var timeStamp = '?' + new Date().getTime() + 'r' + Math.random();
    		this.imgSrc = "user/getCode"+timeStamp;
        },
        //提交
        submit:function(name){
        	this.$Loading.start();
        	this.$refs[name].validate((valid) => {
                if (valid) {
                	var that = this,
            		dataUrl = config.ajaxUrls.register;
	            	$.ajax({
	                    url:dataUrl,
	                    type:"POST",
	                    dataType:"json",
	                    contentType :"application/json; charset=UTF-8",
	                    data:JSON.stringify(this.formItem),
	                    success:function(res){
	                        if(res.success){
	                            that.$Notice.success({ title: config.messages.optSuccRedirect,duration:3,
	                            	onClose:function(){
	                            		that.$Loading.finish();
	                                	window.location.href=config.viewUrls.login;
	                                }
	                            });
	                        }else{
	                        	that.$Loading.error();
	                        	that.$Notice.error({ title: res.message,duration:3});
	                        }
	                    },
	                    error:function(XMLHttpRequest, textStatus, errorThrown){
	                         if(textStatus == "parsererror"){
	                        	 that.$Loading.error();
	                        	 that.$Notice.error({ title: "登陆会话超时，请重新登陆",duration:3});
	                         }
	                    }
	                });
                } else {
                	this.$Loading.error();
                    this.$Message.error('请填写相应信息!');
                }
            })
        }
    }
})
function clock(that){
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
}