'use strict';
	
var appServer = 'http://localhost:8080/design/sigUploadKey/1';
var bucket = 'dc-yxyp';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var judge = new Vue({
	  el: '#productList',
	  data:function () {
	    return {
	    	productListStyle:{
	    		width: "100%",
	    		minHeight:""
	    	},
	      total:0,
	      pageSize:12,
	      list:[],
	      theme1: 'light',
	      score:0,
	      title:'',
		  content:'',
		  attachFile:"",
		  attachFileShow:false,
		  imgUrl:"",
		  productionId:'',
		  scoreSign:0,
		  groupNum:"",
		  bigImgData:[],
		  mediumImg:"",
		  imgBox:"",
		  previewModal:false,
		  modelImg:""
	    }
	  },
	  created:function(){
		  this.productListStyle.minHeight = document.documentElement.clientHeight - config.cssHeight.headHeight - config.cssHeight.footHeight + "px";
		  this.loadData(1);
	  },
	  methods:{
		  menuSelect:function(name){
			if(name == 1){
				this.scoreSign = 0;
			}
			else if (name == 2){
				this.scoreSign = 1;
			}
			else if (name == 3){
				this.scoreSign = 2;
			}
			this.loadData(1);
		  },
		  loadData:function(pageNum){
			  var that = this;
			  $.ajax({
	                url: config.ajaxUrls.judgeToScoreList,
	                type: "post",
	                data: {
	                    userId: judgeId,
	                    round:round,
	                    offset: (pageNum-1)*12,
	                    scoreSign:that.scoreSign,
	                    limit:12
	                },
	                success: function (response) {
	                    if (response.success) {
	                        var results = response.object.list;
	                        
	                        /*===============================*/
	                        //对图片进行签名获取
		            		urllib.request(appServer, {
		                  		method: 'GET'
		                	}).then(function (result) {
		                	  	var creds = JSON.parse(result.data);
		                	  	if(creds.success == "true"){
		                	  		var client = initClient(creds);
		                	  		for(var j = 0;j<results.length;j++){
		                	  			if(results[j].groupNum == 2){
											that.groupNum = 2;
										}else if(results[j].groupNum == 1){
											that.groupNum = 1;
										}
										results[j].pimageArr = results[j].pimage.split(",");
		                	  			results[j].pimage = client.signatureUrl("product/"+results[j].pimageArr[0], {expires: 3600,process : 'style/thumb-200-200'});
		                    	  		
		                	  		}
		                	  		that.list = results;
			                        that.total = response.object.count;
		                	  	}
		                    });
	                    }
	                }
	            })
		  },
		  openDetail:function(event){
			  var that = this;
			  $(".JMHeader .JMNoticeBoard").css("opacity","0.1");
			  var slectedImageUrl = "";
			  var title = '';
			  var content = '';
			  var score = '';
			  var list = this.list;
			  /*===============================*/
              //对图片进行签名获取
      			urllib.request(appServer, {
            		method: 'GET'
      			}).then(function (result) {
          	  	var creds = JSON.parse(result.data);
          	  	if(creds.success == "true"){
          	  		var client = initClient(creds);
          	  		
          	  		for(var j = 0;j<list.length;j++){
	          	  		if (list[j].id == event.target.id){
		  					  $(".selected").empty();
		  					  $(".selected").append("<div class='swiper-container' > <div class='swiper-wrapper'></div><div class='swiper-pagination'>"
		  					  + "</div><div class='swiper-button-prev'></div><div class='swiper-button-next'></div></div>");
		  					  slectedImageUrl = client.signatureUrl("product/"+list[j].pimageArr[0], {expires: 3600,process : 'style/thumb-200-200'});
		  					  
		  					  //swiper图片加载
		  					  for(var imgItem = 0;imgItem<list[j].pimageArr.length;imgItem++){
		  						  var imgSrc = client.signatureUrl("product/"+list[j].pimageArr[imgItem], {expires: 3600,process : 'style/thumb-200-200'});
		  						  $(".swiper-wrapper").append("<div class='swiper-slide'><img id='productImage' src="+ imgSrc + "></div>");
		  					  }
		  					  //初始化swiper
		  					  $(".swiper-wrapper .swiper-slide img").css("cursor", "pointer");
							  var mySwiper = new Swiper ('.swiper-container', {
							    	loop: false,
							    	pagination: {
						    	      	el: '.swiper-pagination',
						    	      	clickable :true
						    	    },
						    	    navigation: {
						    	        nextEl: '.swiper-button-next',
						    	        prevEl: '.swiper-button-prev',
						    	    }
							  });
							  mySwiper.updateSlides();
							  mySwiper.updateProgress();
							  
							  
		  					  $("img[id='productImage']").each(function(index){
		  						  $(this).click(function(){
		  							  console.log("click",index);
		  							  that.previewModal = true;
		  							  that.modelImg = client.signatureUrl("product/"+list[j].pimageArr[index], {expires: 3600});
		  						  })
		  					  })
							  
				  			  var selectedImage = $("#"+event.target.id);
				  			  $('body').addClass('overlay-layer');
				  			  that.animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
							  that.updateQuickView(slectedImageUrl);
		  					  
		  					  
		  					  that.content = list[j].content;
		  					  that.attachFile = "file/downloadFile?filePath=" + list[j].attachFile;
		  					  if(list[j].attachFile.length == 0){
		  						that.attachFileShow = false;
		  					  }else{
		  						that.attachFileShow = true;
		  					  }
			  					that.score = list[j].score;
			  					that.title = list[j].title;
			  					that.productionId = list[j].id;
		  					  break;
	          	  		}
          	  		}
          	  	}
              });
			  
		  },
		  updateQuickView:function(url) {
				$('.cd-quick-view .cd-slider li').removeClass('selected')
				this.imgBox = url;
				$('#productImage').attr('src',url);
				$('.cd-quick-view .cd-slider li').addClass('selected');
		  },
		  resizeQuickView:function() {
				var quickViewLeft = ($(window).width() - $('.cd-quick-view').width())/2,
					quickViewTop = ($(window).height() - $('.cd-quick-view').height())/2;
				$('.cd-quick-view').css({
				    "top": quickViewTop,
				    "left": quickViewLeft,
				});
		  }, 
		  closeQuickView:function(finalWidth, maxQuickWidth) {
			  $(".JMHeader .JMNoticeBoard").css("opacity","1");
				var selectedImage = $('.empty-box').find('img')
			  if(this.groupNum == 2){
				  	var close = $('.cd-close');
			  }else if(this.groupNum == 1){
				  	var close = $('.cd-close'),
					activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src'),
					selectedImage = $('.empty-box').find('img');
			  }
				if( !$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
					//还原点击之前的url
					this.animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
				} else {
					this.closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
				}
		  },
		  animateQuickView:function(image, finalWidth, maxQuickWidth, animationType) {
				var parentListItem = image.parent('.cd-item'),
					topSelected = image.offset().top - $(window).scrollTop(),
					leftSelected = image.offset().left,
					widthSelected = image.width(),
					heightSelected = image.height(),
					windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					finalLeft = (windowWidth - finalWidth)/2,
					finalHeight = finalWidth * heightSelected/widthSelected + 240,
					finalTop = (windowHeight - finalHeight)/2 - 100,
					quickViewWidth = ( windowWidth * .8 < maxQuickWidth ) ? windowWidth * .8 : maxQuickWidth ,
					quickViewLeft = (windowWidth - quickViewWidth)/2;
				
				if (windowHeight < 900){
					finalTop = 20;
				}
				if (windowHeight > 900){
					finalTop = 60;
				}
				
				if( animationType == 'open') {
					parentListItem.addClass('empty-box');
					$('.cd-quick-view').css({'top': finalTop + 'px','left': quickViewLeft +'px','width': quickViewWidth +'px',}).addClass('is-visible');
					$('.cd-quick-view').addClass('animate-width');
					$('.cd-quick-view').addClass('add-content');
					$('.cd-quick-view').removeClass("animated zoomOut");
					$('.cd-quick-view').addClass("animated zoomIn");	
				} else {
					$('.cd-quick-view').removeClass("animated zoomIn");
					$('.cd-quick-view').addClass("animated zoomOut");
					$('.cd-quick-view').removeClass('add-content animate-width is-visible');
					$('body').removeClass('overlay-layer');
					parentListItem.removeClass('empty-box');
				}
			},
			closeNoAnimation:function(image, finalWidth, maxQuickWidth) {
				var parentListItem = image.parent('.cd-item'),
					topSelected = image.offset().top - $(window).scrollTop(),
					leftSelected = image.offset().left,
					widthSelected = image.width();

				$('body').removeClass('overlay-layer');
				parentListItem.removeClass('empty-box');
				$('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
					"top": topSelected,
				    "left": leftSelected,
				    "width": widthSelected,
				});
			},
			scoreBtnClick:function(){
		            var reg=/^[0-9]+$/;
		            var that = this;
			        if(reg.test(this.score)){
			            $.ajax({
			                url:config.ajaxUrls.judgeScore,
			                type:"post",
			                data:{
			                    score:parseInt(this.score),
			                    userId:judgeId,
			                    round:round,
			                    productionId:this.productionId
			                },
			                success:function(response){
			                    if (response.success) {
			                        for (var i = 0; i < that.list.length; i++){
			  						  if (that.list[i].id == that.productionId){
			  							  that.list[i].score = that.score;
			  							  break;  
			  						 	}
			  					  	}
			                        that.closeQuickView();
			                    } else {
			                        that.$Notice.error({title:response.message});
			                    }
			                }
			            })
			        }else{
			        	that.$Notice.error({title:config.messages.scoreError});
			        }
			}
	  },
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