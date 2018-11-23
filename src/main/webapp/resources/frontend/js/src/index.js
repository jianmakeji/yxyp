'use strict';
	
var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var mySwiper = new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay:5000
	},//可选选项，自动滑动
	pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

var index = new Vue({
	el:".index",
	data:function(){
		return{
			aoData:{
				limit:3,
				offset:0
			},
			dataList:[]
		}
	},
	created:function(){
		var that = this;
		isChorme(that);
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
                	  	}
                    });
                }
            }
        });		
	}
})
function isChorme(that){
	if(navigator.userAgent.toLowerCase().indexOf("chrome") == -1 && navigator.userAgent.toLowerCase().indexOf("firefox") == -1){
		that.$Message.error({content:"为了有更好的使用体验，推荐使用谷歌或者火狐浏览器！",closable:true,duration:0});
	}
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