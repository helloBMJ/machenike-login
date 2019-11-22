
define(["jquery"], function($){
    //通过ajax下载数据加载到页面上
    function download(){
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(obj){
                var navArr = obj.navArr;
                // alert(navArr.length);
                for(var i = 0; i < navArr.length; i++){
                    var childArr = navArr[i].childs;
                    $(`<li class="footer-li" ><a href="#" id = "boxid">${navArr[i].title}</a>
                    <div class="nav-box">
                        <div class="cintainer">
                            <ul class="childs-list">
                            </ul>
                        </div>
                    </div>
                </li>`).appendTo($(".nav-footer-menu"))
                    for(var j = 0; j < childArr.length; j++){
                        $(`
                        <li class="first">
                            <div class="imgbox">
                                <a href="#"><img src="${childArr[j].pic}" alt=""></a>
                            </div>
                            <div class="title"><a href="#">${childArr[j].title}</a></div>
                            <p class="pirce">${childArr[j].pirce}</p>
                        </li>`).appendTo($(".childs-list"))
                    }
                }
                //取出限时秒杀的
                var flashdealsArr = obj.flashdeals;
                for(var i = 0; i < flashdealsArr.length; i++){
                    var childs = flashdealsArr[i].childs;

                    for(var j = 0; j < childs.length; j++){
                        var node = $(`
                    <a href="" class="timeup-box"></a>
                    `).appendTo($(".timeup-thing"));
                        $(`
                        <img src="${childs[j].img}" alt="">
                        <div class="thing-name">${childs[j].title}</div>
                        <div class="thing-pirce">
                            <p class="pirce-l">${childs[j].left}</p>
                            <p class="pirce-r">${childs[j].right}</p>
                        </div> 
                        `).appendTo(node);
                    }
                }
                
            }
        })
    }

    function topNav(){
        $(".nav-footer-menu").on("mouseenter",".footer-li", function(){
            $(this).find(".nav-box").show();
        })
        $(".nav-footer-menu").on("mouseleave",".footer-li", function(){
            $(this).find(".nav-box").hide();
        })
    }

    //我的订单界面全部商品分类显示隐藏

    function showHide(){
        $(".red-menu").on("mouseenter", function(){
            $(".height-menu").show();
            // alert(1)
        })
        $(".red-menu").on("mouseleave", function(){
            $(".height-menu").hide();
            // alert(1)
        })
    }

   

    //左侧购物车
    function rightHover(){
        
        $("#shopcar").mouseenter(function(){
            $(".shopcar-list").stop(true).animate({
                left: 0
            }, 500)
        })
        $("#shopcar").mouseleave(function(){
            $(".shopcar-list").stop(true).animate({
                left: -201
            }, 500)
        })
    }

    //购物车数量
    return {
        download: download,
        topNav: topNav,
        showHide: showHide,
        rightHover: rightHover,
    }
})