'use strict';
	
var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var news = new Vue({
	el:"#news",
	data:function(){
		return{
			newsStyle:{
				minHeight:"",
			  	marginTop: config.cssHeight.headHeight + "px"
			},
			total:0,
			aoData:{
				limit:10,
				offset:0
			},
			dataList:[]
		}
	},
	methods:{
		pageOnChange:function(page){
			var that = this;
			this.aoData.offset = (page-1)*10;
	    	$.ajax({
	            "dataType":'json',
	            "type":"post",
	            "data":this.aoData,
	            "url":config.ajaxUrls.manageNews,
	            "success": function (res) {
	                if(res.success===false){
	                	that.$Notice.error({title:res.message});
	                }else{
	                	//对图片进行签名获取
	            		urllib.request(appServer, {
	                  		method: 'GET'
	                	}).then(function (result) {
	                	  	var creds = JSON.parse(result.data);
	                	  	if(creds.success == "true"){
	                	  		var client = initClient(creds);
	                	  		for(var j = 0;j<res.aaData.length;j++){
	                    	  		res.aaData[j].thumb = client.signatureUrl("news/"+res.aaData[j].thumb, {expires: 3600,process : 'style/thumb-200-200'});
	                    	  		
	                	  		}
	                	  		that.dataList = res.aaData;
		                    	that.total = res.iTotalRecords;
	                	  	}
	                    });
	                	
	                	
	                }
	            }
	        });		
		}
	},
	created:function(){
		var that = this;
		smallDeviceHideNewsAbstract();
		this.newsStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
    	$.ajax({
            "dataType":'json',
            "type":"post",
            "data":this.aoData,
            "url":config.ajaxUrls.manageNews,
            "success": function (res) {
                if(res.success===false){
                	that.$Notice.error({title:res.message});
                }else{
                	//对图片进行签名获取
            		urllib.request(appServer, {
                  		method: 'GET'
                	}).then(function (result) {
                	  	var creds = JSON.parse(result.data);
                	  	if(creds.success == "true"){
                	  		var client = initClient(creds);
                	  		for(var j = 0;j<res.aaData.length;j++){
                    	  		res.aaData[j].thumb = client.signatureUrl("news/"+res.aaData[j].thumb, {expires: 3600,process : 'style/thumb-200-200'});	
                	  		}
                	  		that.dataList = res.aaData;
	                    	that.total = res.iTotalRecords;
                	  	}
                    });
                }
            }
        });		
	}
})	

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
function smallDeviceHideNewsAbstract(){
	if(document.documentElement.clientWidth < 530){
		$(".JMNewsText_content").css({"display":"none"});
	}else{
		$(".JMNewsText_content").css({"display":"block"});
	}
}