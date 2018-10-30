//清空相关的数组
function initOtherData(lengthArray, checkAllGroup, dataL, oldJudgeData){
	for(var i = 0; i<lengthArray.length;i++){
		checkAllGroup[i] = [];
		dataL[i] = [];
		oldJudgeData[i] = [];
   	}
}
//清空上传所需的参数
function initJudgeData(data1, data2){
	data1.roundId = "";
	data1.judges = "";
	data1.deleteJudges = "";
	data1.addJudges = "";
	data2.id = "";
	data2.judge = "";
}
//拼接所有的评委id
function setJudgeDataX(newJudgeData, judgeList, setJudgeData, setJudgeData1){
	for(var i=0;i<newJudgeData.length;i++){
		for(var j=0;j<judgeList.length;j++){
			if(newJudgeData[i] == judgeList[j].name){
				setJudgeData.judges = setJudgeData.judges!=""? setJudgeData.judges +","+  judgeList[j].id : setJudgeData.judges + judgeList[j].id;
				setJudgeData1.judge = setJudgeData1.judge!=""? setJudgeData1.judge +","+  judgeList[j].id : setJudgeData1.judge + judgeList[j].id;
			}
		}
	};
}
//去重函数
function DuplicateRemoval(JudgeData1, JudgeData2){
	var deleteResult = [];
	var delData = [];
	for(var i=0;i<JudgeData1.length;i++){
	    if(deleteResult.indexOf(JudgeData1[i])==-1){
	 	   deleteResult.push(JudgeData1[i])
	     }
	  }
	JudgeData1 = [];
	JudgeData1 = deleteResult;
	for(var i=0;i<JudgeData1.length;i++){
		if($.inArray(JudgeData1[i], JudgeData2) == -1){
			delData.push(JudgeData1[i]);
		}
	}
	return delData;
}
//拼接删除与添加的评委id方法
function spliceJudgeData(oldData, newData, judgeList){
	if(oldData.length == 0){
		newData = "";
    }else{
        for(var i=0;i<oldData.length;i++){
    		for(var j=0;j<judgeList.length;j++){
    			if(oldData[i] == judgeList[j].name){
    				newData = newData!=""? newData +","+  judgeList[j].id : newData + judgeList[j].id;
    			}
    		}
        };
    }
	return newData;
}
//数据请求后，将评委的id转为name显示在table中
function screenRoundJudge(response, checkAllGroup, oldJudgeData, dataL){
	var ll = [];
   	for(var i = 0; i<response.aaData.rjList.length;i++){	//轮次循环
   		var judgeBox = "";
   		ll = response.aaData.rjList[i].judge.split(",");	//将每个轮次中的评委ID进行拆分成为数组
   		for(var j = 0; j<ll.length;j++){					//循环每个轮次的评委ID
   			for(var k = 0; k < response.aaData.jList.length;k++){	//循环所有的评委
   				if( ll[j] == response.aaData.jList[k].id ){
   					judgeBox = judgeBox!=""?judgeBox +","+  response.aaData.jList[k].name  : judgeBox + response.aaData.jList[k].name ;
   					checkAllGroup[i].push(response.aaData.jList[k].name);
   					oldJudgeData[i].push(response.aaData.jList[k].name);
   				}
   			}	
   		}
		dataL[i].judgeBox = judgeBox;
   	}
}

var vm = new Vue({
	el:".judgeRoundMgr",
	data:function(){
		return{
			setModal:false,
	        deleteModal:false,
			roundTitle:"",
			dataL:[],
			judgeBox:[],
			columns: [						//table列选项
		          { title: '名称',key: 'roundName', align: 'center'},
		          { title: '评委',key: 'judge', align: 'center',
		        	  render: (h, params) => {
	                       return h('div', {
	                    	   		props: {
	                                   type: 'primary',
	                                   size: 'small'
	                               },
	                               style: {
	                                   margin:"10px auto"
	                               },
	                           },this.dataL[params.index].judgeBox)
	                   }  
		          },
		          { title: '操作',key: 'opt', align: 'center',
		        	  render: (h, params) => {
	                       return h('div', [
	                           h('Button', {
	                               props: {
	                                   type: 'primary',
	                                   size: 'small'
	                               },
	                               style: {
	                                   marginRight: '5px'
	                               },
	                               on: {
	                                   click: () => {
	                                       this.setJudge(params.index)
	                                   }
	                               }
	                           }, '设置评委'),
	                           h('Button', {
	                               props: {
	                                   type: 'primary',
	                                   size: 'small'
	                               },
	                               style: {
	                                   marginRight: '5px'
	                               },
	                               on: {
	                                   click: () => {
	                                       this.changeRound(params.index)
	                                   }
	                               }
	                           }, '修改'),
	                           h('Button', {
	                               props: {
	                                   type: 'error',
	                                   size: 'small'
	                               },
	                               style: {
	                                   marginRight: '5px'
	                               },
	                               on: {
	                                   click: () => {
	                                       this.removeRound(params.index)
	                                   }
	                               }
	                           }, '删除')
	                       ]);
	                   }
		          }
			],
			judgeList:[],
			dataList:[],
			checkAll: false,
			indeterminate:true,
            checkAllGroup: [],
            oldJudgeData:[],
            newJudgeData:[],
            setJudgeUrl:"",
            index:"",
            judgeRoundTitle:"",
			aoData1:{offset: 0,limit: 100},
	      	setJudgeData:{
	      		roundId:0, 			//轮次id		0
  		      	judges:"",			//确定好的评委id		1	
  		      	deleteJudges:"",		//改动评委id(删除)	2
  		      	addJudges:""
	      	},	
	      	setJudgeData1:{
	      		id:0, 			//轮次id		0
	      		judge:""
	      	}
		}
	},
	methods:{
		setJudge:function(index){
			this.setModal = true;
			this.setJudgeData.roundId = this.dataList[index].id;
			this.setJudgeData1.id = this.dataList[index].id;
			this.roundTitle = this.dataList[index].roundName;
			this.index = index;
			if(this.checkAllGroup[this.index].length == this.judgeList.length){
				this.indeterminate = false;
                this.checkAll = true;
			}else if(this.checkAllGroup[this.index].length == 0){
				this.checkAll = false;
				this.indeterminate = false;
			}else{
				this.indeterminate = true;
                this.checkAll = false;
			}
		},
		changeRound:function(index){
    		var id = this.dataList[index].id;
    		window.location.href= config.viewUrls.judgeRoundUpdate.replace(":id",id);
		},
		removeRound:function(index){
			this.judgeRoundTitle = this.dataList[index].roundName;
			this.deleteModal = true;
			this.index = index;
		},
		deleteOK:function(){
			this.deleteModal = false;
			var id = this.dataList[this.index].id;
        	var that = this;
        	$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.judgeRoundRemove.replace(":id",id),
                "success": function (response) {
                    if(response.success===false){
                        that.$Notice.error({title:response.message});
                    }else{
                    	that.$Notice.success({title:config.messages.optSuccess});
                    	$.ajax({
                            "dataType":'json',
                            "type":"get",
                            "url":config.ajaxUrls.judgeRoundGetByPage,
                            "data":that.aoData1,
                            "success": function (response) {
                            	if(response.success===false){
                            		that.$Notice.error({title:response.message});
                                }else{
                                	that.dataList = response.aaData.rjList;
                                	initOtherData(response.aaData.rjList, that.checkAllGroup, that.dataL, that.oldJudgeData);
                	               	initJudgeData(that.setJudgeData, that.setJudgeData1);
//                	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                	screenRoundJudge(response, that.checkAllGroup, that.oldJudgeData, that.dataL);
//                	               	所有评委数据
                	               	that.judgeList = response.aaData.jList;
                                }
                            }
                        });
                    }
                }
            });
		},
		ok:function(){
			 	this.$Loading.start();
				var that = this;
//				拼接setJudgeData.judge
				setJudgeDataX(this.newJudgeData, this.judgeList, this.setJudgeData, this.setJudgeData1);
				var delData = [];
				var deleteResult = [];
				var addData = [];
				var addResult = [];
//				去重
				delData = DuplicateRemoval(this.oldJudgeData[this.index], this.newJudgeData);
//				拼接删除的评委
				this.setJudgeData.deleteJudges = spliceJudgeData(delData, this.setJudgeData.deleteJudges, this.judgeList);
//				去重
				addData = DuplicateRemoval(this.newJudgeData, this.oldJudgeData[this.index]);
//				拼接添加的评委
				this.setJudgeData.addJudges = spliceJudgeData(addData, this.setJudgeData.addJudges, this.judgeList);				
//		                判断url的值
				var urlData = "";
		        if(this.dataList[this.index].judge != ""){
					this.setJudgeUrl = config.ajaxUrls.judgeRoundChange;
					urlData = this.setJudgeData;
				}else{
		        	this.setJudgeUrl = config.ajaxUrls.judgeRoundSetJudge;
		        	urlData = this.setJudgeData1;
				}
		        $.ajax({
	                "dataType":'json',
	                "type":"post",
	                "url":that.setJudgeUrl,
	                "data":urlData,
	                "success": function (response) {
	                    if(response.success===false){
	                    	that.$Notice.error({title:response.message});
	                    }else{
	                    	that.$Loading.finish();
	                    	that.$Notice.success({title:config.messages.optSuccess});
	                    	$.ajax({
	                            "dataType":'json',
	                            "type":"get",
	                            "url":config.ajaxUrls.judgeRoundGetByPage,
	                            "data":that.aoData1,
	                            "success": function (response) {
	                            	if(response.success===false){
	                            		that.$Notice.error({title:response.message});
	                                }else{
	                                	that.dataList = response.aaData.rjList;
	                	               	initJudgeData(that.setJudgeData, that.setJudgeData1);
	                                	initOtherData(response.aaData.rjList, that.checkAllGroup, that.dataL, that.oldJudgeData);
//	                	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
	                                	screenRoundJudge(response, that.checkAllGroup, that.oldJudgeData, that.dataL);
//	                	               	所有评委数据
	                	               	that.judgeList = response.aaData.jList;
	                                }
	                            }
	                        });
	                    }
	                }
	            });
		},
		cancel:function(){
			this.setModal = false;
			var that = this;
			$.ajax({
                "dataType":'json',
                "type":"get",
                "url":config.ajaxUrls.judgeRoundGetByPage,
                "data":that.aoData1,
                "success": function (response) {
                	if(response.success===false){
                		that.$Notice.error({title:response.message});
                    }else{
                    	that.dataList = response.aaData.rjList;
                    	initOtherData(response.aaData.rjList, that.checkAllGroup, that.dataL, that.oldJudgeData);
    	               	initJudgeData(that.setJudgeData, that.setJudgeData1);
//    	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                    	screenRoundJudge(response, that.checkAllGroup, that.oldJudgeData, that.dataL);
//    	               	所有评委数据
    	               	that.judgeList = response.aaData.jList;
                    }
                }
            });
		},
		handleCheckAll:function(){		//是否全选
			this.newJudgeData = [];
			this.checkAllGroup[this.index] = [];
			if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                for(var i=0;i<this.judgeList.length;i++){
                	this.checkAllGroup[this.index].push(this.judgeList[i].name);
                	this.newJudgeData.push(this.judgeList[i].name);
                }
            } else {
                this.checkAllGroup[this.index] = [];
                this.newJudgeData = [];
            }
		},
		checkAllGroupChange:function(data){
			this.newJudgeData = [];
			this.checkAllGroup[this.index] = [];
			this.newJudgeData = data;
			this.checkAllGroup[this.index] = data;
			if (data.length === this.judgeList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }

		}
	},
	created:function(){
		var that = this;
		$.ajax({
            "dataType":'json',
            "type":"get",
            "url":config.ajaxUrls.judgeRoundGetByPage,
            "data":that.aoData1,
            "success": function (response) {
            	if(response.success===false){
            		that.$Notice.error({title:response.message});
                }else{
                	that.dataList = response.aaData.rjList;
                	initOtherData(response.aaData.rjList, that.checkAllGroup, that.dataL, that.oldJudgeData);
//	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                	screenRoundJudge(response, that.checkAllGroup, that.oldJudgeData, that.dataL);
//	               	所有评委数据
	               	that.judgeList = response.aaData.jList;
                }
            }
        });
	}
})
