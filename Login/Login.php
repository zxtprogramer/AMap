<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
  require("../dbase/dbFunction.php");
  if(isset($_POST['submitLogin'])){
      $userName=$_POST['UserName'];
      $password=$_POST['Password'];
      if(checkLogin($userName, $password)){
	      session_start();
		  $_SESSION['UserName']=$userName;
		  $sql="SELECT UserID FROM UserInfoTable WHERE UserName='$userName'";
		  $res=exeSQL($sql);
		  $row=mysql_fetch_array($res);
		  $userID=$row['UserID'];
		  $_SESSION['UserID']=$userID;
		  echo "<script type=text/javascript>window.location=\"/index.php\";</script>";
	  }
  }
?>

<html  xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link href="Login.css" rel='stylesheet' type='text/css' />
    <title>PicMap</title>
  </head>

  <body>
    
    
    <div class="LoginDiv">
    <h1>登录</h1>
    
    <form action="" method="POST">
    <h2>用户名</h2>
    <input type="text" class="textinput" name="UserName" aria-label="用户名" placeholder="用户名"><br />
    <h2>密码</h2>
    <input class="textinput" type="password" value="" name="Password" aria-label="密码" placeholder="密码" ><br />
    
    <input type="hidden" name="submitLogin" value="Login">
	<br />
    
    <input type="submit" class="button blue tags" value="登录" >
    
    </form>
    
    </div>

  </body>
</html>
