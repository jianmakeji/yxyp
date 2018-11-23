'use strict';

var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

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
                                   src: Component.productImgArr[params.index]
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
                           h('poptip',{
                        	   props: {
                        		   confirm: true,
                        		   transfer:true,
                        		   title: '确定删除此项？'
                               },
                               on: {
                            	   "on-ok": () => {
                                       this.ok(params.index)
                                   }
                               }
                           }, [
                               h('Button',{
                            	   props: {
	                                   type: 'error',
	                                   size: 'small'
                            	   }
                               },"删除")
                           ])
                       ]);
                   }
               }
           ],
           dataList: [],
           productImgArr:[],
           totalPage:"",
           judgeHeadIconArr:[]
        }
    },
    created:function(){
    	var that = this;
    	getPageData(this);
    },
    methods:{
    	pageChange:function(changPage){
    		this.aoData1.offset = (changPage-1)*10;
    		this.dataList = [];
    		var that = this;
    		getPageData(this); 
    	},
    	change :function(index) {
    		var id = this.dataList[index].id;
    		window.location.href=config.viewUrls.judgeUpdate.replace(":id",id);
        },
        ok :function(index) {
        	var id = this.dataList[index].id;	//poptip删除
        	var that = this;
        	this.$Loading.start();
        	$.ajax({
                "dataType":'json',
                "type":"post",
                "url":config.ajaxUrls.judgeRemove.replace(":id",id),
                "success": function (response) {
                    if(response.success===false){
                    	that.$Notice.error({title:response.message});
                    	that.$Loading.error();
                    }else{
                    	that.$Loading.finish();
                    	that.$Notice.success({title:config.messages.optSuccess});
                    	getPageData(that);
                    }
                }
            });
        }
    }
})
function getPageData(that){
	that.$Loading.start();
	$.ajax({
        "dataType":'json',
        "type":"post",
        "url":config.ajaxUrls.judgeGetByPage,
        "data":that.aoData1,
        "success": function (response) {
            if(response.success===false){
            	that.$Loading.error();
            	that.$Notice.error({title:response.message});
            }else{
            	that.$Loading.finish();	
        		//对图片进行签名获取
        		urllib.request(appServer, {
              		method: 'GET'
            	}).then(function (result) {
            	  	var creds = JSON.parse(result.data);
            	  	if(creds.success == "true"){
            	  		var client = initClient(creds);
            	  		var arr = response.aaData;
            	  		for(var j = 0;j<arr.length;j++){
                	  		var pimg = arr[j].headicon;
                	  		that.productImgArr[j] = client.signatureUrl("product/"+pimg, {expires: 3600,process : 'style/thumb-200-200'});
            	  		}

            	  		that.dataList = response.aaData;
                    	that.totalPage = response.iTotalRecords;
            	  	}
                });
            	
            }
        }
    });	 
}
function initClient(creds){
	var client = new OSS({
		region: region,
  		accessKeyId: creds.accessKeyId,
  		accessKeySecret: creds.accessKeySecret,
  		stsToken: creds.securityToken,
  		bucket: bucket
	});
	return client;
}