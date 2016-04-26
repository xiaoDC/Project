$(function(){
    $(window).scroll(function(){
        var top=$(window).scrollTop();//获取浏览器窗口滚动高度
        $("#rightbar").offset().top=top;
    })


});


