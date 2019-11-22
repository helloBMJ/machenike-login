// console.log("引入成功");

//配置引入路径

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "index": "index",
        "banner": "banner",
        "nav": "nav",
        "slidenav": "slidenav",
        "shopdata": "shopdata",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

    //加载首页代码

require(["index", "banner","nav","slidenav","shopdata"], function(index,banner,nav,slidenav,shopdata){
    index.shoppingCart();
    banner.slide();
    index.countTime();
    banner.sidebarMove();
    nav.download();
    nav.showHide();
    nav.topNav();
    nav.rightHover();
    slidenav.download();
    slidenav.slideNav();
    shopdata.download();
    shopdata.blowUp();
    shopdata.BtnClick();
    shopdata.addAndSub();
    shopdata.deleteBtnShop();
    shopdata.boxShow();
    slidenav.boxShow();
    shopdata.allMoney();
    shopdata.setTotal();
    // slidenav.leftNavTab();
})