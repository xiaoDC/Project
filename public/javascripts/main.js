
window.onload=function(){
<!--向上滚动 -->
var speed = 35;//滚动的速度
var tab = document.getElementById("ad_content");
var tab1 = document.getElementById("ad_ul");
var tab2 = document.getElementById("ad_ul1");
var li_count=tab1.getElementsByTagName('li').length;
tab2.innerHTML = tab1.innerHTML;
if(li_count%2==1){
    tab2.className="odd";
}else{
    tab2.className="even";
}
function Marquee(){
    if(tab.scrollTop==tab1.offsetHeight ){//当滚动条到达可见视图框底部的时候

        tab.scrollTop = 0;
    }
    else{
        tab.scrollTop++;//滚动条往下移动

    }
}
var MyMar = setInterval(Marquee,speed);
tab.onmouseover = function(){ clearInterval(MyMar)};//清除循环
tab.onmouseout =  function(){MyMar = setInterval(Marquee,speed)}; //恢复循环


}