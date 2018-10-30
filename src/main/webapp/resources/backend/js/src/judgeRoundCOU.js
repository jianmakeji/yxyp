var vm = new Vue({
	el:".judgeRoundCOU",
	data:function(){
		return{
			dataSourse:{
				id:"",
				roundName:"",
				describes:"",
				judge:""
			},
			ruleDataSourse:{
				roundName:{ required: true, message: '请输入轮次名称', trigger: 'blur' }
			},
			submitUrl:"",
			redirectUrl:config.viewUrls.judgeRoundMgr
		}
	},
	created:function(){
    	this.dataSourse.id = window.location.href.split("roundJudge/judgeRoundCOU/")[1];
    	if(this.dataSourse.id){
    		var that = this;
    		var url = config.ajaxUrls.judgeRoundDetail.replace(":id",this.dataSourse.id);
    		$.ajax({
                dataType:"json",
                type:"get",
                url:url,
                data:{id:that.dataSourse.id},
                success:function(response){
                    if(response.success){
                    	that.dataSourse.roundName = response.object.roundName;
                    	that.dataSourse.describes = response.object.describes;
                    	that.dataSourse.judge = response.object.judge;
                    	that.submitUrl = config.ajaxUrls.judgeRoundUpdate;
                    }else{
                    	that.$Notice.error({title:response.message});
                    }
                },
                error:function(){
                	that.$Notice.error({title:config.messages.networkError});
                }
            })
    	}else{
    		this.submitUrl = config.ajaxUrls.judgeRoundCreate;
    	}
	},
	methods:{
		submit:function(){
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

		}
	}
})