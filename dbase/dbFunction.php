<?php
$dbVersion="V0";
$dbHost="localhost";
$dbUser="zxt";
$dbPwd="t";
$dbName="PM_" . $dbVersion;

$dbRoot="root";
$dbRootPwd="1qaz2wsx";

function createDB(){
    global $dbHost, $dbUser, $dbPwd, $dbName, $dbRoot, $dbRootPwd;
    $con = connectDB($dbHost, $dbRoot, $dbRootPwd);

    $sql = "CREATE DATABASE $dbName";
    if(mysql_query($sql, $con)){
        mysql_query("GRANT ALL ON $dbName.* TO $dbUser@'%'", $con);
        mysql_query("GRANT create routine ON $dbName" . ".*" . "TO $dbUser@'%'", $con);

    }
    else{printf("Create Database Failed\n");}
    mysql_close($con);

}

function clearDB(){
    global $dbHost, $dbUser, $dbPwd, $dbName, $dbRoot, $dbRootPwd;
    $con = connectDB($dbHost, $dbRoot, $dbRootPwd);

    $sql = "DROP DATABASE $dbName";
    mysql_query($sql, $con);
    mysql_close($con);
}


function connectDB($host, $name, $pwd){
    $con = mysql_connect($host, $name, $pwd);
    if(!$con){
        print("connect error\n");
    }
    return $con;
}

function exeSQL($sql){
    global $dbHost, $dbUser, $dbPwd, $dbName;
    $con=connectDB($dbHost, $dbUser, $dbPwd);
    mysql_select_db($dbName, $con);
    $result=mysql_query($sql, $con);
    mysql_close($con);
    return $result;
}

function createTable($xmlFile){
    $xml=simplexml_load_file($xmlFile);

    foreach ($xml->children() as $table){
	$tableName=$table->getName();
	$itemArray=array();
	foreach ($table->children() as $tableItem){
	    $itemName=$tableItem->getName();
	    $item=$tableItem;
	    array_push($itemArray, $itemName . " " . $item);
	}
	$sql="CREATE TABLE $tableName (" . join(",", $itemArray) . ")";
	//echo $sql . "\n";
	if(!exeSQL($sql)){echo "Create table $tableName failed\n";}
		
    }
    $sql="ALTER TABLE LikeTable ADD UNIQUE KEY(UserID,PicID)";
	if(!exeSQL($sql)){echo "Alert LikeTable failed \n";}
}


function init(){
    clearDB();
    createDB();
    createTable("DbDesign.xml");
}

function addUser($userName, $password, $email, $gender){
    if(checkUser($userName, $email)>0) return;
    $sql="INSERT INTO UserInfoTable (UserName,Password,Email,Gender) VALUES('$userName','$password','$email','$gender')";
    if(!exeSQL($sql)){return;}//printf("add user $userName failed\n");
    $sql="SELECT UserID from UserInfoTable WHERE UserName='$userName'";
	$res=exeSQL($sql);
	$row=mysql_fetch_array($res);
	$id=$row[0];
	addAlbum($id,"Face","The user face album", time());
	addAlbum($id,"Default","The default user album", time());
    $sql="SELECT AlbumID FROM AlbumTable WHERE UserID=$id AND AlbumName='Face'";
	$res=exeSQL($sql);
	$row=mysql_fetch_array($res);
	$albumID=$row[0];
    addPic($id, "DefaultFace.gif", 200, 200, "DefaultFace.gif", "/images/DefaultFace.gif", time(), time(), 0, 0, 0, $albumID);
}

function addAlbum($userID, $albumName, $des, $createTime){
    $userName=getUserName($userID);
    $sql="INSERT INTO AlbumTable (UserID,UserName,AlbumName,Description,CreateTime) VALUES('$userID', '$userName', '$albumName', '$des', '$createTime')";
    if(!exeSQL($sql)){printf("add album $albumName failed");}
}

function addComment($userID, $picID, $comment, $createTime){
    $userName=getUserName($userID);
    $sql="INSERT INTO CommentTable (UserID,UserName,PicID, Comment, CreateTime) VALUES('$userID', '$userName', '$picID', '$comment', '$createTime')";
    if(!exeSQL($sql)){printf("add comment failed");}
}

function addLike($userID, $picID, $createTime){
    $userName=getUserName($userID);
    $sql="INSERT INTO LikeTable (UserID,UserName,PicID,CreateTime) VALUES('$userID', '$userName', '$picID', '$createTime')";
    if(!exeSQL($sql)){printf("add Like failed");}
    else{
        $sql="UPDATE PicTable SET LikeNum=LikeNum+1 WHERE PicID=$picID";
        if(!exeSQL($sql)){printf("update LikeNum failed");}
    }
}



function addMessage($fromID, $toID, $sendTime, $msgType, $message){
    $sql="INSERT INTO MessageTable (FromID, ToID, SendTime, MsgType, Message) VALUES($fromID, $toID, $sendTime, '$msgType', '$message')";
    if(!exeSQL($sql)){printf("add message failed");}
}

function addPic($userID, $picName, $width, $height, $des, $picPath, $shootTime, $uploadTime, $longitude, $latitude, $likeNum, $albumID){
    $userName=getUserName($userID);
    $sql="INSERT INTO PicTable (UserID, UserName,  PicName, Width, Height, Description, PicPath, ShootTime, UploadTime, Longitude, Latitude, LikeNum, AlbumID) VALUES($userID, '$userName', '$picName', $width, $height, '$des', '$picPath', $shootTime, $uploadTime, $longitude, $latitude, $likeNum, $albumID)";
    if(!exeSQL($sql)){printf("add pic error");}
}

function addFriend($fromID, $toID, $type, $createTime){
    $sql="INSERT INTO FriendTable (FromID, ToID, Type, CreateTime) VALUES($fromID, $toID, '$type', $createTime)";
    if(!exeSQL($sql)){printf("add message failed");}
}

function checkUser($userName, $email){
    $sql="SELECT UserID FROM UserInfoTable WHERE UserName='$userName' or Email='$email'";
    $result=exeSQL($sql);
    $row=mysql_fetch_array($result);
    if(empty($row))return 0;
    else return 1;
}

function checkLogin($userName, $password){
    $sql="SELECT UserID FROM UserInfoTable WHERE UserName='$userName' AND Password='$password'";
    $result=exeSQL($sql);
    $row=mysql_fetch_array($result);
    if(empty($row))return 0;
    else return 1;
}

function getUserID($userName){
    $sql="SELECT UserID FROM UserInfoTable WHERE UserName='$userName'";
    $result=exeSQL($sql);
    $row=mysql_fetch_array($result);
    if(empty($row))return 0;
    else return $row[0];
}

function getUserName($userID){
    $sql="SELECT UserName FROM UserInfoTable WHERE UserID='$userID'";
    $result=exeSQL($sql);
    $row=mysql_fetch_array($result);
    if(empty($row))return 0;
    else return $row[0];
}




//init();
//addUser("zxt","t","zxt@pku.edu.cn","M");
//addPic(1,"a.jpg",300,300,"test1","/pic",time(),time(),0,0,1,1);
//addMessage(1,2,time(),'N',"hello");
//addFriend(1,2,'N',time());
//addAlbum(1,'al1','haha',time());
