define(["parabola", "jquery", "jquery-cookie"], function(parabola,$){
        //我的购物车移入事件
    function shoppingCart(){
        $(".shopping-cart").hover(function(){
            $(".hidden-content").show();
        },function(){
            $(".hidden-content").hide();
        })
    }

    
    //导航栏移入移出
    //限时秒杀
    function countTime(){
        var setTimer = null;
        var residue = 0;
        //差值计算
        //例子(模拟)
        residue = 2 * 86400000;     //剩余
        //真实时间(注意月份需减掉1，否则时间会计算错误)
        //chazhi = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
        //chazhi = (new Date(2018,8-1,6,6,6,6)) - (new Date());
         
        //执行函数部分
        countFunc(residue);
        setTimer = setInterval(function() {
            residue = residue - 1000;
            countFunc(residue);
            }, 1000);
            function countFunc(leftTime) {
            if(leftTime >= 0) {
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
            var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
            days = doubleNum(days);
            hours = doubleNum(hours);
            minutes = doubleNum(minutes);
            seconds = doubleNum(seconds);
            $(".stop-day").html(days);
            $(".stop-hour").html(hours);
            $(".stop-min").html(minutes);
            $(".stop-sec").html(seconds);
            } else {
            clearInterval(setTimer);
            $(".stop-day").html("00");
            $(".stop-hour").html("00");
            $(".stop-min").html("00");
            $(".stop-sec").html("00");
            }
        }
    }
    //记录定时器中00
    function doubleNum(n){
        if(n < 10){
            return "0" + n;
        }else{
            return n;
        }
    }

    //登录

    
    return{
        shoppingCart: shoppingCart,
        countTime: countTime,
    }
})