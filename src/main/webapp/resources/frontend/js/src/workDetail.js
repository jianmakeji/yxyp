
'use strict';

var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var workDetail = new Vue({
	el:".workDetail",
	data:function(){
		return{
			title:"",
			content:"",
			attachFileDownload:"",
			attachFile:"",
			productImg_1:"",
			productImg_2:"",
			productImg_3:""
		}
	},
	created:function(){
		var that = this;
		$.ajax({
          url: config.ajaxUrls.workDetail.replace(":id",productionId),
          type: "get",
          success: function (response) {
              if (response.success) {
            	  console.log(response);
            	  that.title = response.object.title;
            	  that.content = response.object.content;
            	  that.attachFile = response.object.attachFile;
            	  that.attachFileDownload = "file/downloadFile?filePath=" + response.object.attachFile;

            	  var pimageArr = response.object.pimage.split(",");
	        		//对图片进行签名获取
	        		urllib.request(appServer, {
	              		method: 'GET'
	            	}).then(function (result) {
	            	  	var creds = JSON.parse(result.data);
	            	  	if(creds.success == "true"){
	            	  		var client = initClient(creds);
	            	  		for(var i=0;i<pimageArr.length;i++){ 
	            	  			if(i == 0){
	            	  				that.productImg_1 = client.signatureUrl("product/"+pimageArr[0], {expires: 3600,process : 'style/thumb-200-200'});
	            	  			}else if(i == 1){
	            	  				that.productImg_2 = client.signatureUrl("product/"+pimageArr[1], {expires: 3600,process : 'style/thumb-200-200'});
	            	  			}else if(i == 2){
	            	  				that.productImg_3 = client.signatureUrl("product/"+pimageArr[2], {expires: 3600,process : 'style/thumb-200-200'});
	            	  			}
	            	  		}
	            	  	}
	              	});
            	  

        	  		console.log("111111",that.productImgArr);
              } else {
                  functions.ajaxReturnErrorHandler(response.message);
              }
          },
          error: function () {
              functions.ajaxErrorHandler();
          }
      })
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