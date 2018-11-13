
var setPwd = new Vue({
	el:".setPwd",
	data:function(){
		return{
			formItem:{
				email:"",
				newPwd:"",
				confirmPwd:"",
				code:code
			},
			ruleValidate:{
				email:[
				    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
				    {type:"email", message: '请输入正确邮箱格式', trigger: 'blur'}
				],
				newPwd:[
				    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}
				],
				confirmPwd:[
				    {required: true, message: '请输入密码', trigger: 'blur'},
              	    {min:6, message: '密码至少为6位', trigger: 'blur'}          
				]
			
			},
			redirectUrl: config.viewUrls.login
		}
	},
	methods:{
		conPwdBlur:function(){
    		if(this.formItem.newPwd && this.formItem.confirmPwd != this.formItem.newPwd){
    			this.$Notice.error({ title: '输入的密码不一致', duration:3});
    		}
    	},
		submit:function(){
			var that = this;
			this.$Loading.start();
			$.ajax({
		        url:config.ajaxUrls.setPwd,
		        type:"post",
		        dataType:"json",
		        data:this.formItem,
		        success:function(response){
		            if(response.success){
		    			that.$Loading.finish();
		            	that.$Notice.success({title:config.messages.optSuccess,duration:3,
		            		onClose:function(){
		            			window.location.href=that.redirectUrl;
		            		}
		            	});
		            }else{
		    			that.$Loading.error();
		            	that.$Notice.success({title:response.message});
		            }
		        }
		    });
		}
	},
	created:function(){
		console.log(code);
	}
})