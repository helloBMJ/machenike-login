define(["jquery","parabola", "jquery-cookie"],function($){
    function download(){
        sc_left();
        sc_num();
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(obj){
               var shopboxArr = obj.shopBox;
               for(var i = 0; i < shopboxArr.length; i++){
                   $(`<li class="shopbox-item">
                   <div class="shopbox-img">
                       <img src="${shopboxArr[i].img}" alt="">
                   </div>
                   <div class="shopbox-title">
                       <span>${shopboxArr[i].title}</span>
                   </div>
                   <div class="shopbox-sc" id="${shopboxArr[i].id}">
                       加入购物车
                   </div>
               </li>`).appendTo($(".shopbox-list"))
               }
            //    boxShow()
            }
            
        })
    } 

    // //购物车点击事件
    function BtnClick(){
        $(".shopbox-list").on("click", ".shopbox-sc", function(){
            // alert(this.id)
            var id = this.id    //购物车按钮所在的id
            //判断是否是第一次
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var obj = [{id: id, num: 1}];
                $.cookie("goods", JSON.stringify(obj), {
                    expires: 7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(id == cookieArr[i].id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                if(!same){
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            // alert($.cookie("goods"))
            sc_left();
            sc_num();
            ballMove(this);
        })
    }
    
            //加载购物车数据
            function sc_left(){
                $(".shop-list-menu").empty();//删除该节点下的所有的子节点
                $.ajax({
                    type: "get",
                    url: "data/data.json",
                    success: function(obj){
                        var shopboxArr = obj.shopBox;
                        var cookieStr = $.cookie("goods");
                        if(cookieStr){
                            var cookieArr = JSON.parse(cookieStr);
                            var newArr = [];
                            for(var i = 0; i < shopboxArr.length; i++){
                                for(var j = 0; j < cookieArr.length; j++){
                                    if(shopboxArr[i].id == cookieArr[j].id){
                                        shopboxArr[i].num = cookieArr[j].num;
                                        newArr.push(shopboxArr[i])
                                    }
                                }
                            }
                            // console.log(shopboxArr)
                            for(var i = 0; i < newArr.length; i++){
                                // alert(newArr.length)
                                var node = $(`<li class = 'shop-list-menu' id="${shopboxArr[i].id}">
                                <div class = 'sc_goodsPic' >
                                <img src="${shopboxArr[i].img}" alt=""/>
                            </div>
                            <div class = 'sc_goodsTitle'>
                                <p>${shopboxArr[i].title}</p>
                            </div>
                            <div class = 'sc_goodsBtn'>购买</div>
                            <div class = 'sc_deleteBtn'>删除</div>
                            <div class = 'sc_goodsNum'>
                                <button>+</button>
                                <button>-</button>
                                <span>商品数量：${shopboxArr[i].num}</span>
                            </div></li>`)
                            node.appendTo($(".shopcar-list"))
                            }
                        }
                    },
                    error: function(msg){
                        console.log(msg);
                    }
                })
            }
            function sc_num(){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        sum += cookieArr[i].num;
                    }
                    $(".sc_num").html(sum);
                }else{
                    $(".sc_num").html(0)
                }
            }
            function ballMove(node){
                //node当前点击的按钮
                $("#ball").css({
                    left: $(node).offset().left,
                    top: $(node).offset().top,
                    display: "block",
                })
        
                var X = $("#shopcar").offset().left - $(node).offset().left;
                var Y = $("#shopcar").offset().top - $(node).offset().top;
        
                //1、创建抛物线对象
                var bool = new Parabola({
                    el: "#ball",
                    offset: [X, Y],
                    duration: 800,
                    curvature: 0.0005,
                    callback: function(){
                        $("#ball").hide();
                    }
                })
        
                bool.start();
            }
            
            $("#deleteshop").click(function(){
                //1、清空cookie
                $.cookie("goods", null);
                $(".shopcar-list").empty();
                sc_num();
            })
    function addAndSub(){
        //给+和-按钮添加事件
        $(".shopcar-list").on("click", ".sc_goodsNum button", function(){
            var id = $(this).closest(".shop-list-menu").attr("id");
            // alert(id);
            // 1、找出这个数据,改了cookie
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    if(this.innerHTML === "+"){
                        cookieArr[i].num++;
                    }else if(cookieArr[i].num == 1 && this.innerHTML == "-"){
                        alert("数量为1，不能在减少");
                    }else{
                        cookieArr[i].num--;
                    }

                    //页面上的数据
                    $(this).nextAll("span").html("商品数量：" + cookieArr[i].num);

                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                    sc_num();

                    break;
                }
            }

        })
    }
    function deleteBtnShop(){
        

        //给删除按钮添加点击事件

        $(".shopcar-list").on("click", ".sc_deleteBtn", function(){
            
            //2、删除节点
            var id = $(this).closest(".shop-list-menu").remove().attr("id");
            //1、删除cookie
            // alert(id);
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            //3、判断是否是空数组
            if(!cookieArr.length){
                $.cookie("goods", null);
            }else{
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }

            sc_num();
            
        })
}
    //放大图片
    function blowUp(){
        $("#small").mouseenter(function(){
            $("#mark,#big").show();
        }).mouseleave(function(){
            $("#mark,#big").hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 55;
            if(l <= 0){
                l = 0;
            }
            if(l >= 200){
                l = 200;
            }
    
            var t = ev.pageY - $(this).offset().top - 55;
            if(t <= 0){
                t = 0;
            }
            if(t >= 200){
                t = 200;
            }
            $("#mark").css({
                left: l,
                top: t
            })
    
            //让big下面的图片，反方向，对应倍数移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })
    }
    function boxShow(){
        $(".shopbox-list").on("mouseenter",".shopbox-item", function(){
            $(this).addClass("boxShow");
        });
        $(".shopbox-list").on("mouseleave",".shopbox-item",function(){
            $(this).removeClass("boxShow");
        });
    }

    //计算总价
    function allMoney(){
        //加
        $("#Add").on("click", function(){
            var numBuy = $("#buy_number").val();
            var num = parseInt(numBuy);
            $("#buy_number").val(num + 1)
            setTotal();
            if(numBuy >= 5){
                $("#buy_number").val(0);
            }

        })
        //减
        $("#Sub").on("click", function(){
            setTotal();
            var numBuy = $("#buy_number").val();
            var num = parseInt(numBuy);
            $("#buy_number").val(num - 1)
            setTotal();
            if(numBuy <= 1){
                $("#buy_number").val(0);
            }
        })
    }

    function setTotal(){
        // alert($("#inall").html())
        var total = $("#buy_number").val() *  $(".market-pirce").html();
        $("#inall").html("￥" + total);
    }
    return{
        download: download,
        blowUp: blowUp,
        BtnClick: BtnClick,
        addAndSub: addAndSub,
        deleteBtnShop: deleteBtnShop,
        boxShow: boxShow,
        allMoney: allMoney,
        setTotal:setTotal,
    }
})