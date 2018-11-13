
var forgetPwd = new Vue({
	el:".forgetPwd",
	data:function(){
		return{
			formItem:{
				email:"",
				rand:""
			},
			ruleValidate:{
				email:[
				    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
				    {type:"email", message: '请输入正确邮箱格式', trigger: 'blur'}
				],
				rand:[
				    {required: true, message: '请输入验证码', trigger: 'blur'},
				    {required: true, len:6, message: '验证码长度有误', trigger: 'blur'}
				]
			},
			forgetPwdStyle:{
				minHeight:"",
				margin:"0 auto",
			  	marginTop: config.cssHeight.headHeight + 40 + "px",
			  	width:"45%"
			}
		}
	},
	methods:{
		submit:function(){
			var that = this;
			this.$Loading.start();
			$.ajax({
		        url:config.ajaxUrls.forgetPwd,
		        type:"post",
		        dataType:"json",
		        data:this.formItem,
		        success:function(response){
		            if(response.success){
		    			that.$Loading.finish();
		            	that.$Notice.success({title:config.messages.optSuccess});
		            }else{
		    			that.$Loading.error();
		            	that.$Notice.success({title:response.message});
		            }
		        }
		    });
		}
	},
	created:function(){
		this.forgetPwdStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.footHeight - config.cssHeight.headHeight - 40 + "px";
	}
})