$(document).ready(function(){
	
	var ua = navigator.userAgent;

	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

	isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

	isAndroid = ua.match(/(Android)\s+([\d.]+)/),

	isMobile = isIphone || isAndroid;
	
	if(isMobile){
		window.location.href = "/DesignYL/mobile/index";
	}else{

	}
})

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