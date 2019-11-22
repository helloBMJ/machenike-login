define(["jquery"], function($){
    function download(){
        $.ajax({
            type: "get",
            url: "data/slidenav.json",
            success: function(obj){
                var contentArr = obj.content;
                //取出content数据
                for(var i = 0; i < contentArr.length; i++){
                    // alert(contentArr.length)
                    var childs = contentArr[i].childs;
                    for(var j = 0; j < childs.length; j++){
                        $(`<li class="content-list">
                        <a href="#">
                            <div class="goods-img"><img src="${childs[j].img}" alt=""></div>
                            <div class="goods-title">${childs[j].title}</div>
                            <div class="goods-pirce">${childs[j].pirce}</div>
                        </a>
                    </li>`).appendTo($(".content-right-list"))
                    }
                }

                //取出限时秒杀
                var hotArr = obj.hot;
                for(var i = 0; i < hotArr.length; i++){
                    var childs = hotArr[i].childs;
                    for(var j = 0; j < childs.length; j++){
                        $(`<a href="" class="timeup-box">
                        <img src="${childs[j].img}" alt="">
                        <div class="thing-name">${childs[j].title}</div>
                        <div class="thing-pirce">
                            <p class="pirce-l">${childs[j].left}</p>
                            <p class="pirce-r">${childs[j].right}</p>
                        </div>
                </a>`)
                    }
                }

                //取出热门推荐
                var RecommendArr = obj.Recommend;
                for(var i = 0; i < RecommendArr.length; i++){
                    var childs = RecommendArr[i].childs;
                    for(var j = 0; j < childs.length; j++){
                        $(`<div class="recommend-move">
                        <a href="" class="move-item" id="move-item">
                            <div class="move-item-pic">
                                <img src="${childs[j].img}" alt="">
                            </div>
                            <div class="content-box"> 
                                <div class="move-item-title">${childs[j].title}</div>
                                <div class="move-item-pirce">${childs[j].pirce}</div>
                            </div>
                        </a>
                    </div>`).appendTo($(".hot-recommend"))
                    }
                }  

                //取出热评商品
                var hotshopArr = obj.hotshop;
                for(var i = 0; i < hotshopArr.length; i++){
                    var childs = hotshopArr[i].childs;
                    for(var j = 0; j < childs.length; j++){
                        $(`<li class="review-item ">
                        <div class="hot-img">
                            <a href=""><img src="${childs[j].img}" alt=""></a>
                        </div>
                        <p><a href="">${childs[j].content}</a></p>
                        <div><h3 class="title"> <a href="#">${childs[j].title}</a></h3><span>${childs[j].pirce}</span></div>
                    </li>`).appendTo($(".hot-list-l"))
                    boxShow();
                    }
                }
                

                //视频列表

                var videoArr = obj.video;
                for(var i = 0; i < videoArr.length; i++){
                    
                var childs = videoArr[i].childs;
                    for(var j = 0; j < childs.length; j++){
                        
                    $(`<ul class="video-list clearboth shopbox-item">
                    <li class="video-item">
                    <div class="video-img">
                        <img src="${childs[j].img}" alt="">
                    </div>
                    <h3>${childs[j].title}</h3>
                    <p>${childs[j].p}</p> </li>
                    </ul>`).appendTo($(".video-body"));
                    }
                    boxShow()
                }
                
                //取出商品分类

                var classifyArr = obj.classify;
                for(var i = 0; i < classifyArr.length; i++){
                    var childs = classifyArr[i].childs;
                        $(`<div class="text">
                        <a href="" class="text-c">${classifyArr[i].title}
                        <ul class="block-box">
                            
                        </ul></a>
                    </div>`).appendTo($(".slidenav-box"))
                    for(var j = 0; j < childs.length; j++){
                        var content = childs[j].content;
                        for(var a = 0; a < content.length; a++){
                            // alert(content.length)$(`
                               $(`<li class="empt-title">
                               <a href="">${childs[j].title}</a>
                               <ul class="empt-content">
                                   <li class="empt-content-box">
                                       <img src="${content[a].img}" alt="">
                                       <span>${content[a].span}</span>
                                   </li>
                               </ul>
                           </li>`) .appendTo($(".block-box"))
                        }
                    }
                }
            }
        })
    }
    //视频列表背景阴影
    function boxShow(){
        $(".video-body").on("mouseenter",".video-item", function(){
            $(this).css("boxShadow", " 10px 10px 10px #888");
            // alert(1)
        });
        $(".video-body").on("mouseleave",".video-item",function(){
            $(this).css("boxShadow", "");
        });
        $(".hot-list-l").on("mouseenter",".review-item", function(){
            $(this).css("boxShadow", "10px 10px 20px #888");
            // alert(1)
        });
        $(".hot-list-l").on("mouseleave",".review-item",function(){
            $(this).css("boxShadow", "");
        });
    }


    function slideNav(){
        $(".slidenav-box").on("mouseenter",".text-c", function(){
            $(this).find(".block-box").show();
            $(this).find(".text-c").css("backgroundColor", "#fff")
        })
        $(".slidenav-box").on("mouseleave",".text-c", function(){
            $(this).find(".block-box").hide();
            $(this).find(".text-c").css("backgroundColor", "")
        })
    }
    return {
        download: download,
        slideNav: slideNav,
        boxShow: boxShow,
        // leftNavTab: leftNavTab,
    }
})