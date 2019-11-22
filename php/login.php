<?php
	header("Content-type:text/html;charset=utf-8");
    // var_dump($_POST);
    //统一的返回格式
    $responseData = array("code" => 0, "message" => "");

    //取出post提交的数据
    $phoneNum = $_POST['phoneNum'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $authCode = $_POST['authCode'];
    $creatTime = $_POST['creatTime'];

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
    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次密码不一致";
        echo json_encode($responseData);
        exit;
    }
    if(!$authCode){
        $responseData["code"] = 4;
        $responseData["message"] = "验证码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //注册
    $link = mysql_connect("localhost", "root", "123456");
    if(!$link){
        $responseData["code"] = 5;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("machenike");

    //准备sql语句   判断是否有同名
    $sql = "SELECT * FROM login WHERE phoneNum = '{$phoneNum}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    // var_dump($row)
    if($row){
        $responseData["code"] = 6;
        $responseData["message"] = "手机号码已被注册";
        echo json_encode($responseData);
        exit;
    }

    //给密码加密
    $str = md5(md5(md5($password)."mimma")."jiami");

    // //注册
    $sql = "INSERT INTO login(phoneNum,password,creat_time,authCode) VALUES('{$phoneNum}','{$str}','{$creatTime}','{$authCode}')";
    // echo $sql
    $res = mysql_query($sql);
    // var_dump($res);
    if(!$res){
        $responseData["code"] = 7;
		$responseData["message"] = "服务器忙";
		echo json_encode($responseData);
		exit;
    }else{
		$responseData["message"] = "注册成功";
		echo json_encode($responseData);
    }
    mysql_close($link);
?>