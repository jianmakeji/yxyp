$(document).ready(function() {
	function smallDeviceHideUserLoginWithHide(){
		if(document.documentElement.clientWidth < 1200){
			$(".JMUserMenu").css({"display":"none"});
			$(".JMNoticeBoardLeft a").attr({"href":"javascript:void(0)"});
		}else{
			$(".JMUserMenu").css({"display":"inline-block"});
			$(".JMNoticeBoardLeft a").attr({"href":"login"});
		}
	}
	smallDeviceHideUserLoginWithHide();
	$.ajax({
		type : 'get',
		url : 'countDown',
		cache : true,
		dataType : 'json',
		success : function(data) {
			$("#countDown").html(data.object)
		}
	});
});
