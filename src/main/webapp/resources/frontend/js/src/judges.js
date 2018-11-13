'use strict';
	
var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var judges = new Vue({
	el:"#judge",
	data:function(){
		return{
			dataList:[],
			judgeStyle:{
				minHeight:"",
			  	marginTop: config.cssHeight.headHeight + "px"
			}
		}
	},
	methods:{
	},
	created:function(){
		var that = this;
		this.judgeStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
    	$.ajax({
            "dataType":'json',
            "type":"post",
            "url":config.ajaxUrls.judgeGetByPage,
            "success": function (res) {
                if(res.success===false){
                	that.$Notice.error({title:res.message});
                }else{
                	console.log(res);
//                	//对图片进行签名获取
            		urllib.request(appServer, {
                  		method: 'GET'
                	}).then(function (result) {
                	  	var creds = JSON.parse(result.data);
                	  	if(creds.success == "true"){
                	  		var client = initClient(creds);
                	  		for(var j = 0;j<res.object.length;j++){
                    	  		res.object[j].headicon = client.signatureUrl("judges/"+res.object[j].headicon, {expires: 3600,process : 'style/thumb-200-200'});	
                	  		}
                	  		that.dataList = res.object;
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