$(document).click(function(){  
	$("#scoreTable").addClass("hidden");
});

function initData(url, aoData, dataList, totalPage){
	var that = this;
	$.ajax({
      "dataType":'json',
      "type":"post",
      "url":url,
      "data":aoData,
      "success": function (response) {
          if(response.success===false){
          	that.$Notice.error({title:response.message});
          }else{
          	dataList = response.aaData;
          	totalPage = response.iTotalRecords;
          }
      }
  });	
}
var vm = new Vue({
	el:".worksMgr",
	data:function(){
		return{
			groupModel:"",
			subGroupModel:"",
			roundModel:"",
			statusModel:"",
			totalPage:"",
			GroupList:[{value:"0",label:"全部"},{value:"1",label:"概念设计组"},{value:"2",label:"产品创新组"}],
			SubGroupList:[{value:"0",label:"全部"},{value:"1",label:"康复辅具类 "},{value:"2",label:"生活益智类"},{value:"3",label:"设施环境类"},{value:"4",label:"综合服务类"}],
			JudgeRoundList: [{value: '0',label: '全部'}],				//顶部轮次筛选
			StatusList: [					//顶部状态筛选
                {value: '0',label: '全部'},{value: '1',label: '已提交'},{value: '2',label: '审核未通过'},{value: '3', label: '审核已通过'},{value: '4',label: '初选入围'},
                {value: '5',label: '初选未入围'},{value: '6',label: '复选入围'},{value: '7',label: '复选未入围'}
            ],
            statusTypes:[					//状态选择库
                {value: 1,label: '已提交'},{value: 2,label: '审核未通过'},{value: 3, label: '审核已通过'},{value: 4,label: '初选入围'},
                {value: 5,label: '初选未入围'},{value: 6,label: '复选入围'},{value: 7,label: '复选未入围'}    
            ],
            roundTypes:[],					//轮次选择库    
            columns: [						//table列选项
                  { title: 'ID',key: 'id', align: 'center'},
                  { title: '缩略图',key: 'pimage', align: 'center',
               	   render: (h, params) => {
                          return h('img', {
                   	   		domProps: {
                                  type: 'primary',
                                  size: 'small',
                                  src:  params.row.pimage.split(',')[0] + "?x-oss-process=style/thumb-198-280"
                              },
                              style: {
                                  width: '99px',
                                  height:"140px",
                                  margin:"10px auto"
                              },
                          })
                      }
               	  },
                  { title: '名称',key: 'title', align: 'center'},
                  { title: '分数',key: 'score', align: 'center',
                	  render: (h, params) => {
                          return h('a', {
                                  props: {
                                      type: 'primary',
                                      size: 'small'
                                  },
                                  attrs :{
                                      href:	"javascript:void(0)"
                                  },
                                  on:{
                                	  'click':(value,event) => {  
                  	                		this.getRoundScore(params.index, value, event); 
                                	  }  
                                  }
                              },params.row.score)
                      }
                  },
                  { title: '状态',key: 'status', align: 'center',
                	  render: (h, params) => {  
                	        return h('i-select', {  
                	            props:{  
                	                value: this.dataList[params.index].status, 
                	            },
                	            on: {  
                	                'on-change':(value) => {  
                	                	this.changeStatus(params.index, value); 
                	                }  
                	            }
                	        },this.statusTypes.map(function(item){  
                	            return h('i-option', {  
                	                props: {
                	                	value: item.value,
                	                	label: item.label
                	                	}  
                	            }, item);  
                	        })   
                	        );  
                	    }
                  },
                  { title: '所在评审轮次',key: 'round', align: 'center',
                	  render: (h, params) => {  
              	        return h('i-select', {  
								props:{ 
									value: this.dataList[params.index].round,  
								},
								on: {  
								    'on-change':(value) => {  
										this.changeRound(params.index, value); 
									}  
		          	            }
              	        },this.roundTypes.map(function(type){  
	          	            return h('i-option', {  
	          	                props: {
	          	                	value: type.value,
            	                	label: type.label
	          	                	}  
	          	            }, type);  
	          	        })     
              	        );  
              	    }
                  },
                  { title: '更新时间',key: 'createTime', align: 'center'},
                  { title: '操作',key: 'opt', align: 'center',
               	   	render: (h, params) => {
                          return h('a', {
                                  props: {
                                      type: 'primary',
                                      size: 'small'
                                  },
                                  attrs :{
                                      href:	config.viewUrls.manageWorkDetail.replace(":id",this.dataList[params.index].id),
                                      target:"_blank"
                                  },
                                  style: {
                                      marginRight: '5px'
                                  }
                              }, "详情")
                      }
                  }
              ],	
              aoData1:{offset: 0,limit: 10,groupId: 0,round: 0,status: 0,groupNum: 0,subGroupNum: 0},
         	  aoData2:{offset: 0,limit: 1000},
           	  setstatusList:{id:"",status:""},
           	  setRoundList:{productId:"",round:""},
         	  dataList:[],	
         	  
         	  Scroecolumns: [						//table列选项
                  { title: '评审轮次',key: 'round', align: 'center'},
                  { title: '得分',key: 'averageScore', align: 'center'}
              ],	
         	  RoundScroeList:[]		//分数显示数据（轮次）
		}	
	},
	methods:{
		changeStatus:function(index, value){
			this.$Loading.start();
			var that = this;
			this.setstatusList.id = this.dataList[index].id;
			this.setstatusList.status = value;
			$.ajax({
	            "dataType":'json',
	            "type":"get",
	            "url":config.ajaxUrls.workSetStatus,
	            "data":that.setstatusList,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.$Notice.success({title:config.messages.optSuccess});
	        			$.ajax({
	        	            "dataType":'json',
	        	            "type":"post",
	        	            "url":config.ajaxUrls.worksGetByPage,
	        	            "data":that.aoData1,
	        	            "success": function (response) {
	        	                if(response.success===false){
	        	                	that.$Notice.error({title:response.message});
	        	                }else{
	        	                	that.dataList = [];
	        	                	that.dataList = response.aaData;
	        	                	that.totalPage = response.iTotalRecords;
	        	                }
	        	            }
	        	        });	
	                }
	            }
	        });	
		},
		changeRound:function(index, value){
        	this.$Loading.start();
			var that = this;
			this.setRoundList.productId = this.dataList[index].id;
			this.setRoundList.round = value;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.workSetRound,
	            "data":that.setRoundList,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Loading.error();
	                	that.$Notice.error({title:"修改出错",desc:"1.作品状态无法选择评审轮次,	2.可能该轮次未绑定评委, 3.分数已更新为本轮次,无法修改"});
	        			$.ajax({
	        	            "dataType":'json',
	        	            "type":"post",
	        	            "url":config.ajaxUrls.worksGetByPage,
	        	            "data":that.aoData1,
	        	            "success": function (response) {
	        	                if(response.success===false){
	        	                	that.$Notice.error({title:response.message});
	        	                }else{
	        	                	that.$Loading.finish();
	        	                	that.dataList = [];
	        	                	that.dataList = response.aaData;
	        	                	that.totalPage = response.iTotalRecords;
	        	                }
	        	            }
	        	        });
	                }else{
	                	that.$Notice.success({title:config.messages.optSuccess});
	        			$.ajax({
	        	            "dataType":'json',
	        	            "type":"post",
	        	            "url":config.ajaxUrls.worksGetByPage,
	        	            "data":that.aoData1,
	        	            "success": function (response) {
	        	                if(response.success===false){
	        	                	that.$Notice.error({title:response.message});
	        	                }else{
	        	                	that.$Loading.finish();
	        	                	that.dataList = [];
	        	                	that.dataList = response.aaData;
	        	                	that.totalPage = response.iTotalRecords;
	        	                }
	        	            }
	        	        });
	                }
	            }
	        });	
		},
		pageChange:function(index){
			this.$Loading.start();
			var that = this;
    		this.aoData1.offset = (index-1)*10;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.worksGetByPage,
	            "data":this.aoData1,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Loading.error();
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.dataList = [];
	                	that.dataList = response.aaData;
	                	that.totalPage = response.iTotalRecords;
	                }
	            }
	        });	
		},
		groupCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.groupNum = value;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.worksGetByPage,
	            "data":this.aoData1,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.dataList = [];
	                	that.dataList = response.aaData;
	                	that.totalPage = response.iTotalRecords;
	                }
	            }
	        });
		},
		subGroupCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.subGroupNum = value;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.worksGetByPage,
	            "data":this.aoData1,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.dataList = [];
	                	that.dataList = response.aaData;
	                	that.totalPage = response.iTotalRecords;
	                }
	            }
	        });
		},
		roundCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.round = value;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.worksGetByPage,
	            "data":this.aoData1,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.dataList = [];
	                	that.dataList = response.aaData;
	                	that.totalPage = response.iTotalRecords;
	                }
	            }
	        });
		},
		statusCheck:function(value){
        	this.$Loading.start();
			var that = this;
			this.aoData1.offset = 0;
			this.aoData1.status = value;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.worksGetByPage,
	            "data":this.aoData1,
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	                	that.dataList = [];
	                	that.dataList = response.aaData;
	                	that.totalPage = response.iTotalRecords;
	                }
	            }
	        });
		},
		getRoundScore:function(index,event){
			var that = this;
			$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "url":config.ajaxUrls.getRoundScoreBean,
	            "data":{productionId:this.dataList[index].id},
	            "success": function (response) {
	                if(response.success===false){
	                	that.$Notice.error({title:response.message});
	                }else{
	                	that.$Loading.finish();
	        			var poptipClientX = event.clientX  - 165, poptipClientY = (index+1)*160 ;
	                	that.RoundScroeList = response.object;
	                	$("#scoreTable").removeClass("hidden");
	        			$("#scoreTable").css({"display":"inline-block","left": poptipClientX+"px","top": poptipClientY+"px"});
	                }
	            }
	        });	
		},
	},
	created:function(){
    	this.$Loading.start();
    	$("#scoreTable").addClass("hidden");
		var that = this;
		this.subGroupModel = "0",
		this.groupModel = "0",
		this.statusModel = "0",
		$.ajax({
            "dataType":'json',
            "type":"get",
            "url":config.ajaxUrls.judgeRoundGetByPage,
            "data":this.aoData2,
            "success": function (response) {
                if(response.success===false){
                	that.$Notice.error({title:response.message});
                }else{
                	that.$Loading.finish();
                	for(var i=0;i<response.aaData.rjList.length;i++){
                		var roundBox = {};
                		roundBox.value = response.aaData.rjList[i].id;
                		roundBox.label = response.aaData.rjList[i].roundName;
                		that.JudgeRoundList.push(roundBox);
                		that.roundTypes.push(roundBox);
                	}
                }
                that.roundModel = "0";
            }
        });	
		$.ajax({
	      "dataType":'json',
	      "type":"post",
	      "url":config.ajaxUrls.worksGetByPage,
	      "data":this.aoData1,
	      "success": function (response) {
	          if(response.success===false){
	          		that.$Notice.error({title:response.message});
	          }else{
	        	  	that.dataList = response.aaData;
	        	  	that.totalPage = response.iTotalRecords;
	          }
	      }
	  });	
		
		
	}
})