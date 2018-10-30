var Component = new Vue({
	el:".judgeMgr",
	data :function() {
        return {
        	aoData1:{offset: 0,limit: 10},
        	columns: [
        	   { title: 'ID',key: 'id', align: 'center'},
               { title: '头像',key: 'headicon', align: 'center',
            	   render: (h, params) => {
                       return h('img', {
                    	   	domProps: {
                                   type: 'primary',
                                   size: 'small',
                                   src: params.row.headicon
                               },
                               style: {
                                   width: '80px',
                                   height:"80px",
                                   margin:"10px auto"
                               },
                           })
                   }},
               { title: '姓名',key: 'name', align: 'center'},
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
                                       this.change(params.index)
                                   }
                               }
                           }, '修改'),
                           h('Button', {
                               props: {
                                   type: 'error',
                                   size: 'small'
                               },
                               on: {
                                   click: () => {
                                       this.remove(params.index)
                                   }
                               }
                           }, '删除')
                       ]);
                   }
               }
           ],
           dataList: [],
           totalPage:"",
           deleteModal:false,
           index:"",
           judgeTitle:""
        }
    },
    created:function(){
    	var that = this;
    	$.ajax({
            "dataType":'json',
            "type":"post",
            "url":config.ajaxUrls.judgeGetByPage,
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
    },
    methods:{
    	pageChange:function(changPage){
    		this.aoData1.offset = (changPage-1)*10;
    		this.dataList = [];
    		var that = this;
    		$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.judgeGetByPage,
                "data":this.aoData1,
                "success": function (response) {
                	that.dataList = response.aaData;
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    }else{
//                    	清空数据盒，装新数据
                    	that.dataList = response.aaData;
                    }
                }
            });	 
    	},
    	change :function(index) {
    		var id = this.dataList[index].id;
    		window.location.href=config.viewUrls.judgeUpdate.replace(":id",id);
        },
        remove :function(index) {
        	this.judgeTitle = this.dataList[index].name;
        	this.index = index;
        	this.deleteModal = true;
        },
        ok :function() {
        	var id = this.dataList[this.index].id;
        	var that = this;
        	$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.judgeRemove.replace(":id",id),
                "success": function (response) {
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    }else{
                    	that.$Notice.success({title:config.messages.optSuccess});
                    	$.ajax({
                            "dataType":'json',
                            "type":"post",
                            "url":config.ajaxUrls.judgeGetByPage,
                            "data":that.aoData1,
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
                }
            });
        }
    }
})

