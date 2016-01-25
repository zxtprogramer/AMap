<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
  require("../dbase/dbFunction.php");
  if(isset($_POST['submitRegister'])){
      $userName=$_POST['UserName'];
	  $password=$_POST['Password'];
	  $email=$_POST['Email'];
	  $gender="S";
	  addUser($userName, $password, $email, $gender);
      header("Location: ../Login/Login.php");
  }
?>

<html  xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link href="Register.css" rel='stylesheet' type='text/css' />
    <title>Register</title>
  </head>

  <body>

    
    <div class="RegisterDiv">
    <h1>注册</h1>
    
    <form action="" method="POST">
    <h2>用户名</h2>
    <input type="text" class="textinput" name="UserName" aria-label="用户名" placeholder="用户名"><br />
    <h2>邮箱</h2>
    <input type="text" class="textinput" name="Email" aria-label="邮箱" placeholder="邮箱"><br />
    <h2>密码</h2>
    <input type="password" class="textinput" name="Password" aria-label="密码" placeholder="密码"><br />
    
    <input type="hidden" name="submitRegister" value="Register">
	<br />
    
    <input type="submit" class="button blue tags" value="注册" >
    
    </form>
    
    </div>

  </body>
</html>
