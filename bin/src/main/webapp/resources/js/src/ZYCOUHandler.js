var ZYCOUHandler={
    getDataDetail:function(url,data,callback){
        $.ajax({
            dataType:"json",
            type:"get",
            url:url,
            data:data,
            success:function(response){
                if(response.success){
                    if(callback){
                        callback(response.object);
                    }
                }else{
                    functions.ajaxReturnErrorHandler(response.message);
                }
            },
            error:function(){
                functions.ajaxErrorHandler();
            }
        })
    }
}