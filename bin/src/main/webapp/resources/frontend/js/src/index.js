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