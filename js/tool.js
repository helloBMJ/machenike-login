//IE兼容
function addEvent(node, eventType, funcName){
    if(node.addEventListener){
        node.addEventListener(eventType, funcName, false);
    }else{
        node.attachEvent("on" + eventType, funcName);
    }
}

function removeEvent(node, eventType, funcName){
    if(node.removeEventListener){
        node.removeEventListener(eventType, funcName);
    }else{
        node.detachEvent("on" + eventType, funcName);
    }
}

function preDef(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        window.event.returnValue = false;
    }
}

function limitDrag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            if(l <= 0){
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }

            var t = e.clientY - offsetY;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(t <= 0){
                t = 0;
            }
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

function drag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            node.style.left = e.clientX - offsetX + 'px';
            node.style.top = e.clientY - offsetY + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

function draw(testCode) {
    var canvas_width=document.getElementById('canvas').clientWidth;
    var canvas_height=document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = 22 * testCode.length;
    canvas.height = canvas_height;
    

    //有n位验证，可以绘制n位字符
    for (var i = 0; i < testCode.length; i++) {
       
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = testCode[i];//得到随机的一个内容
        // show_num[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

function removeSpaceNode(parentNode){
    var nodes = parentNode.childNodes;
    for(var i = 0; i < nodes.length; i++){
        //当前遍历到的节点是文本节点，且文本是纯空白字符组成的
        if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
            parentNode.removeChild(nodes[i]);
        }
    }
}

//阻止事件冒泡的跨浏览器兼容
function stopBubble(ev){
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
}

//获取当前有效样式浏览器兼容的写法
function getStyle(node, cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
}
function randomColor(){
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    return str;
}

function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var week = d.getDay();
    week = chineseFromNum(week);

    var hour = doubleNum(d.getHours());
    var min = doubleNum(d.getMinutes());
    var sec = doubleNum(d.getSeconds());

    return year + "年" + month + "月" + day + "日 星期" + week + " " + hour + ":" + min + ":" + sec;
}

function doubleNum(n){
    if(n < 10){
        return "0" + n;
    }else{
        return n;
    }
}

//把星期从数字转成中文
function chineseFromNum(num){
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}

// 封装一个可以随机任意范围整数的函数
function randomNum(min, max){
	var tmp = max - min + 1;
	return parseInt(Math.random() * tmp) + min
}
function bubbleSort(arr){
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = 0; j < arr.length - (i + 1); j++){
            if(arr[j] > arr[j + 1]){
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
function changeSort(arr){
    //选出的擂台
   for(var i = 0; i < arr.length - 1; i++){
       for(var j = i + 1; j < arr.length; j++){
           if(arr[i] > arr[j]){
               var tmp = arr[i];
               arr[i] = arr[j];
               arr[j] = tmp;
           }
       }
   }
}

function norepeat(arr){
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = i + 1; j < arr.length; j++){
            //判断是否有相等的元素
            if(arr[i] === arr[j]){
                //将后面这个数删除掉
                arr.splice(j, 1);
                j--;
            }
        }
    }
}


/* 
    倒着遍历元素
*/

function norepeatDown(arr){
    for(var i = arr.length - 1; i > 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
            }
        }
    }
}

function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 123);
		if(tmp >= 0 && tmp <= 9){
			arr.push(tmp);
		}else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
			arr.push(String.fromCharCode(tmp));
		}else{
			//随机到别的不在范围内的数
			i--;
		}
	}
	return arr.join("");
}



function testCodeNum(n){
	//n生成n位的验证码
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 10);
		arr.push(tmp);
	}
	return arr.join("");
}