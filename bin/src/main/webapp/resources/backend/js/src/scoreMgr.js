var vm = new Vue({
	el:"#myForm",
	data:function(){
		return{
			formItem: {
				input: ''
			},
			roundModel:"",
	      	JudgeRoundList:[],
	      	aoData:[
	  	        {name: "offset", value: 0},
	  	        {name: "limit", value: 10}
	      	],
	      	dataSourse:{
	      		round:""
	      	}
		}
	},
	methods:{
		submit:function(){
			var that = this;
			$.ajax({
		        url:config.ajaxUrls.workComputeScore,
		        type:"post",
		        data:that.dataSourse,
		        success:function(response){
		            if(response.success){
		            	that.$Notice.success({title:config.messages.optSuccess});
		            }else{
		            	that.$Notice.error({title:response.message});
		            }
		        },
		        error:function(){
		        	that.$Notice.error({title:config.messages.networkError});
		        }
		    });
		},
		roundCheck:function(index){
			this.roundModel = index;
			this.dataSourse.round = index;
		}
	},
	created:function(){
		var that = this;
		$.ajax({
	        url:config.ajaxUrls.judgeRoundGetByPage,
	        type:"get",
	        dataType:"json",
	        contentType :"application/json; charset=UTF-8",
	        data:that.aoData,
	        success:function(response){
	            if(response.success){
	                that.JudgeRoundList = response.aaData.rjList;
	            }else{
	            	that.$Notice.error({title:response.message});
	            }
	        },
	        error:function(){
	        	that.$Notice.error({title:config.messages.networkError});
	        }
	    });
	}
})