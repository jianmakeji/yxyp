<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>评审</title>
<link href="resources/frontend/css/src/style.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/iview.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/lib/animation.css" type="text/css" rel="stylesheet">
<link href="resources/css/lib/jquery.toastmessage.css" type="text/css" rel="stylesheet">
<link href="resources/backend/css/lib/swiper.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/main.css" type="text/css" rel="stylesheet">
<link href="resources/frontend/css/src/JMCSS/Header.css" type="text/css" rel="stylesheet">
<script>
	var judgeId = "${param.judgeId}";
	var round = "${param.round}";
	var attachFile = "${param.attachFile}";
	var pageName = "judge";
	var sliderFinalWidth = 400,
	maxQuickWidth = 1200;
</script>
</head>
<body>
	<%@ include file="../header.jsp"%>
	<div id="productList" style="width: 100%" v-cloak>
		<div style="text-align: center">
			<i-menu mode="horizontal" :theme="theme1" active-name="1" @on-select="menuSelect" style="width:100%;margin-top:10px;z-index:0"> <menu-item name="1">
			<icon type="settings"></icon> <spring:message code="all_productions"/> </menu-item> <menu-item name="2"> <icon type="settings"></icon> <spring:message code="graded_productions"/> </menu-item> <menu-item name="3"> <icon type="settings"></icon>
			<spring:message code="non_rated_productions"/> </menu-item> </i-menu>
		</div>


		<ul class="cd-items cd-container">
			<li v-for="item in list" class="cd-item">
				<p class="cd-score">{{item.score}}<spring:message code="fraction"/></p>
				<img :src="item.pimage" :id="item.id"
				v-on:click="openDetail" style="cursor: pointer;">
				<p class="cd-trigger">{{item.title}}</p>
			</li>
		</ul>
		<div style="text-align: center; margin-bottom: 30px;">
			<page :total="total" :page-size="pageSize" @on-change="loadData"></page>
		</div>

		<%@ include file="../footer.jsp"%>

		<div class="cd-quick-view">
			<div class="cd-slider-wrapper">
				<ul class="cd-slider">
					<li class="selected">
						<div class="swiper-container" >
						    <div class="swiper-wrapper">
						    </div>
						    <div class="swiper-pagination"></div>
						    <div class="swiper-button-prev"></div>
    						<div class="swiper-button-next"></div>
						</div>
					</li>
				</ul>
			</div>

			<div class="cd-item-info">
				<h3 style="padding:5px 5px;"><spring:message code="title"/>：{{title}}</h3>
				<p style="padding:5px 5px;"><spring:message code="introduction"/>：{{content}}</p>
				<a v-if="attachFileShow" :href="attachFile">点击进行附件下载</a>
				<div style="padding:5px 5px;">
					<ul class="cd-item-action">
						<i-col style="color:red;">请输入分数0-100的整数</i-col>
						<li><input type="text" v-model="score" style="line-height: 1.5em; color: #ff0000; font-size: 32px; text-align: center; display: block; width: 96px; margin-top: 5px;float:left;" />
							<i-button type="error" v-on:click="scoreBtnClick" style="margin-left:10px;height: 52px;width: 100px; margin-top: 5px;font-size: 24px;"><spring:message code="score"/></i-button>
						</li>
					</ul>
				</div>
			</div>

			<a href="#0" class="cd-close" v-on:click="closeQuickView">Close</a>
		</div>
		 <modal v-model="previewModal" title="图片预览 (按Esc可返回)" width="auto" cancel-text="" ok-text="">
	        <img style="width:100%;heigth:auto;" :src="modelImg" />
	    </modal>
	</div>
	<script src="resources/js/lib/jquery-1.10.2.min.js"></script>
	<script src="resources/js/lib/vue.min.js"></script>
	<script src="resources/js/lib/velocity.min.js"></script>
	<script src="resources/backend/js/lib/swiper.js"></script>
	<script src="resources/frontend/js/src/header.js"></script>
	<script src="resources/js/lib/iview.min.js"></script>
	<script src="resources/frontend/js/src/config.js"></script>
	<script type="text/javascript">


		new Vue({
			  el: '#productList',
			  data:function () {
			    return {
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
			                        that.total = response.object.count;
									for (var i = 0; i < results.length; i++){
										if(results[i].groupNum == 2){
											results[i].pimageArr = results[i].pimage.split(",");
											results[i].pimage = results[i].pimageArr[0] + "?x-oss-process=style/thumb-198-280";
											that.groupNum = 2;
										}else if(results[i].groupNum == 1){
											results[i].pimageArr = results[i].pimage.split(",");
											results[i].pimage = results[i].pimageArr[0] + "?x-oss-process=style/thumb-198-280";
											that.groupNum = 1;
										}
									}
									that.list = results;
			                    } else {
			                        
			                    }
			                },
			                error: function () {
			                    
			                }
			            })
				  },
				  openDetail:function(event){
					  $(".JMHeader .JMNoticeBoard").css("opacity","0.1");
					  var slectedImageUrl = "";
					  var title = '';
					  var content = '';
					  var score = '';
					  for (var i = 0; i < this.list.length; i++){
						  if (this.list[i].id == event.target.id){
							  $(".selected").empty();
							  $(".selected").append("<div class='swiper-container' > <div class='swiper-wrapper'></div><div class='swiper-pagination'>"
							  + "</div><div class='swiper-button-prev'></div><div class='swiper-button-next'></div></div>");
							  slectedImageUrl = this.list[i].pimageArr[0] + "?x-oss-process=style/thumb-594-840";
							  for(var imgItem = 0;imgItem<this.list[i].pimageArr.length;imgItem++){
								  var imgSrc =  this.list[i].pimageArr[imgItem] + "?x-oss-process=style/thumb-594-840";
								  $(".swiper-wrapper").append("<div class='swiper-slide'><img id='productImage' src="+ imgSrc + "></div>");
							  }
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
							  var that = this;
							  $("img[id='productImage']").each(function(index){
								  $(this).click(function(){
									  that.previewModal = true;
									  that.modelImg = that.list[i].pimageArr[index];
								  })
							  })
							  this.content = this.list[i].content;
							  this.attachFile = "file/downloadFile?filePath=" + this.list[i].attachFile;
							  if(this.list[i].attachFile.length == 0){
								  this.attachFileShow = false;
							  }else{
								  this.attachFileShow = true;
							  }
							  this.score = this.list[i].score;
							  this.title = this.list[i].title;
							  this.productionId = this.list[i].id;
							  break;
						  }
						  
					  }
					  
					  var selectedImage = $("#"+event.target.id);

					  $('body').addClass('overlay-layer');
					  this.animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
					  this.updateQuickView(slectedImageUrl.replace('?x-oss-process=style/thumb_210_300',''));
					
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
							this.imgBox = this.imgBox.replace("?x-oss-process=style/thumb-594-840","?x-oss-process=style/thumb-198-280");
							selectedImage.attr({src:this.imgBox});
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
				            reg=/^[0-9]+$/;
				            let that = this;
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
					                        functions.ajaxReturnErrorHandler(response.message);
					                    }
					                },
					                error:function(){
					                    functions.ajaxErrorHandler();
					                }
					            })
					        }else{
					            $().toastmessage("showErrorToast",config.messages.scoreError);
					        }
					}
			  },
			})   
  </script>
</body>
</html>