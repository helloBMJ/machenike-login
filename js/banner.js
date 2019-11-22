define(["jquery"], function($){
    function slide(){
        $(function(){
            var aBtns = $(".banner-img").find("ol").find("li");
            var oUl = $(".banner-img").find("ul");
            var aLis = oUl.find("li");
            var timer = null;  //定时器返回值
            var iNow = 0; //代表当前显示第几张图片


            aBtns.click(function(){
                iNow = $(this).index();
                tab();
            })

            timer = setInterval(function(){
                iNow++;
                tab();
            }, 5000);  //图片持续的时间

            $(".banner-left").click(function(){
                if(iNow == 0){
                    oUl.css("right", iNow++)
                }else{
                    oUl.css("right", iNow--)
                    tab()
                }
            })
            $(".banner-right").click(function(){
                oUl.css("right", iNow++)
                tab()
            })

            //切换
            function tab(){
                aBtns.removeClass("active").eq(iNow).addClass("active");

                if(iNow == aBtns.size()){
                    aBtns.eq(0).addClass("active");
                }
                //动画跳转500的速度
                oUl.animate({right: iNow * 1920}, 500, function(){
                    //动画结束
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        oUl.css("right", 0);
                    }
                })
            }  
        });
    }

    //侧边栏轮播图
function sidebarMove(){
    $(function(){
        var iNow = 0;
        var timer = null;
        
        timer = setInterval(function(){
            iNow++;
            moveTab();
        }, 3000);  //图片持续的时间
        function moveTab(){
            var Rmove = $(".recommend-move");
            var boxMove = Rmove.find(".move-item");

            if(iNow == boxMove.size()){
                boxMove.eq().addClass("activeMove");
            }
            Rmove.animate({top: -iNow * 116}, 1000, function(){
                if(iNow == boxMove.size()){
                    iNow = 0;
                    boxMove.addClass("activeMove").eq();
                }
            })
            
        }
    })
}
    return {
        slide: slide,
        sidebarMove: sidebarMove
    }
})