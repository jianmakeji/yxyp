var Component = new Vue({
	el:".newsMgr",
	data () {
        return {
        	manageNews:config.ajaxUrls.manageNews,
        	newsUpdate:config.viewUrls.newsUpdate,
        	newsDetail:config.viewUrls.newsDetail,
        	aoData1:{offset: 0,limit: 10},
        	columns: [
        	   { title: 'ID',key: 'id', align: 'center'},
               { title: '标题',key: 'title', align: 'center'},
               { title: '日期',key: 'publishTime', align: 'center'},
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
           newsTitle:""
        }
    },
    created:function(){
    	var that = this;
    	$.ajax({
            "dataType":'json',
            "type":"post",
            "url":config.ajaxUrls.manageNews,
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
                "url":config.ajaxUrls.manageNews,
                "data":this.aoData1,
                "success": function (response) {
                	that.dataList = response.aaData;
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    }else{
                    	that.dataList = response.aaData;
                    	that.totalPage = response.iTotalRecords;
                    }
                }
            });	 
    	},
    	change :function(index) {
    		var id = this.dataList[index].id;
    		window.location.href=config.viewUrls.newsUpdate.replace(":id",id);
        },
        remove :function(index) {
        	this.newsTitle = this.dataList[index].title;
        	this.index = index;
        	this.deleteModal = true;
        	
        },
        ok :function() {
        	var id = this.dataList[this.index].id;
        	var that = this;
        	$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.newsRemove.replace(":id",id),
                "success": function (response) {
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    }else{
                    	that.$Notice.success({title:config.messages.optSuccess});
                    	$.ajax({
                            "dataType":'json',
                            "type":"post",
                            "url":config.ajaxUrls.manageNews,
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


