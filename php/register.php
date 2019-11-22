<?php
    header("Content-type:text/html;charset=utf-8");
    // var_dump($_POST);
    //统一的返回格式
    $responseData = array("code" => 0, "message" => "");

    //取出post提交的数据
    $phoneNum = $_POST['phoneNum'];
    $password = $_POST['password'];

    //数据验证
    if(!$phoneNum){
        $responseData["code"] = 1;
        $responseData["message"] = "手机号码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //登录数据库
    $link = mysql_connect("localhost", "root", "123456");
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("machenike");

    //判断是否登录成功

    //密码进行md5加密
    $str = md5(md5(md5($password)."mimma")."jiami");

    //准备sql语句验证
    $sql = "SELECT * FROM login WHERE phoneNum = '{$phoneNum}' AND password = '{$str}'";
    $res = mysql_query($sql);

    //取出一行
    $row = mysql_fetch_assoc($res);
    if(!$row){
		$responseData["code"] = 4;
		$responseData["message"] = "用户名或密码错误";
		echo json_encode($responseData);
		exit;
	}else{
		$responseData["message"] = "登录成功";
		echo json_encode($responseData);
    }
    
    mysql_close($link);
?>