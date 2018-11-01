var workDetail = (function (config, functions) {
    return {
        loadWorkDetail: function (id,callback) {
            $.ajax({
                url: config.ajaxUrls.workDetail.replace(":id",id),
                type: "get",
                data: {
                    id:id
                },
                success: function (response) {
                    if (response.success) {

                        if(callback){
                            callback(response.object);
                        }
                        functions.hideLoading();
                    } else {
                        functions.ajaxReturnErrorHandler(response.message);
                    }
                },
                error: function () {
                    functions.ajaxErrorHandler();
                }
            })
        }
    }
})(config, functions);

$(document).ready(function () {
    workDetail.loadWorkDetail(productionId,function(response){
        var pimageHtmlArray = [], pimageArray = response.pimage.split(",");
        for(var i= 0;i<pimageArray.length;i++){
            if(pimageArray[i] != "resources/frontend/images/app/defaultImage.jpg"){
                pimageHtmlArray.push('<img src="'+pimageArray[i]+'?x-oss-process=style/thumb-792-1120" style="margin:10px auto;">');
            }
        }
        $("#zyWorkDetail").append(pimageHtmlArray.join(''));
    });
});