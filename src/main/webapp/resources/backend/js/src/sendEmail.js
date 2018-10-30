var vm = new Vue({
	el:".sendEmail",
	data:function(){
		return{
			formItem: {
				input: ''
			},
			dataSourse:{
				round:"",
				email:"",
				emailContent:""
			},			
			aoData:{offset: 0,limit: 10},
	      	roundModel:"",
	      	JudgeRoundList:[]
		}
	},
	methods:{
		submit:function(){
			this.$Loading.start();
			var that = this;
			this.dataSourse.emailContent = tinyMCE.activeEditor.getContent();
			$.ajax({
		        url:config.ajaxUrls.sendEmail,
		        type:"post",
		        data:that.dataSourse,
		        success:function(response){
		            if(response.success){
		            	that.$Loading.finish();
		            	that.$Notice.success({title:config.messages.optSuccess});
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
		            }else{
		            	that.$Notice.error({title:response.message});
		            }
		        },
		        error:function(){
	            	that.$Loading.error();
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
		
		tinymce.init({
            selector: "#emailContent",
            height:300,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            plugins : 'link image preview fullscreen table textcolor colorpicker code',
            setup: function (ed) {
                ed.on('blur', function (e) {
                    $("#emailContent").val("sas",ed.getContent());
                    if(ed.getContent()){
                        $(".error[for='emailContent']").remove();
                    }
                });
            }
        });
	}
})