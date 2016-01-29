<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html  xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
      <link href="/css/Map.css" rel='stylesheet' type='text/css' />
      <link href="/css/Nav.css" rel='stylesheet' type='text/css' />
      <link href="/css/PicPanel.css" rel='stylesheet' type='text/css' />
      <link href="/css/AlbumPanel.css" rel='stylesheet' type='text/css' />
    <title>Map</title>
  </head>

  <body>

    <div id="MapMask" class="Mask"></div>
    <div id="NewAlbumDiv" class="NewAlbumDiv">
      <h1>新建相册</h1>
      <h2>相册名</h2>
      <input type="text" id="NewAlbumName" name="NewAlbumName" />
      <h2>描述</h2>
      <input type="text" id="NewAlbumDes" name="NewAlbumDes" />
      <input type="button" class="" value="新建" onclick="newAlbum()" /> 
      <input type="button" class="" value="取消" onclick="newAlbumHide()"/> 
    </div>

    <div id="UploadPicDiv" class="UploadPicDiv">
      <iframe id="UploadIframe" src="upload.php"> </iframe>
    </div>

    <div id="NavDiv" class="NavDiv">
      <ul id="Nav">
        <?php
          session_start();
          $str='';
          if(isset($_SESSION['UserName'])){
              $userName=$_SESSION['UserName'];
              $userID=$_SESSION['UserID'];

              if(isset($_GET['HomeUserName'])){
                  $homeUserName=$_GET['HomeUserName'];
              }
              else{
                  $homeUserName=$userName;
              }

              $str='<li ><a href="#">当前位置:</a></li>' .
                   '<li id="NavPath"><a href="javascript:navGoto(\"all\");">全部></a></li>' .
                   '<li><input type="text" value="" class="textinput" /></li>' .
                   '<li><input type="button" value="搜索" class="" /></li>' .
                   '<li><a id="NavNewAlbum" href="javascript:navNewAlbum()" class="NavSmallText">新建相册</a></li>' .
                   '<li><a id="NavUpload" href="javascript:navUpload()" class="NavSmallText">上传照片</a></li>' .
                   '<li><a id="NavOwn" href="javascript:navOwn()" class="NavSmallText">' . $userName . '</a></li>' .
                   '<li><a id="NavSet" href="javascript:navSet()" class="NavSmallText">设置</a></li>' .
                   '<li><a href="javascript:navLogout()" class="NavSmallText">注销</a></li>';
          }
          else{
              $str='<li ><a href="#">当前位置:</a></li>' .
                   '<li id="NavPath"><a href="javascript:navGoto(\"all\");">全部></a></li>' .
                   '<li><input type="text" value="" class="textinput" /></li>' .
                   '<li><input type="button" value="搜索" class="button blue tags" /></li>' .
                   '<li><a href="javascript:navLogin()" class="NavSmallText">登录</a></li>' . 
                   '<li><a href="javascript:navRegister()" class="NavSmallText">注册</a></li>'; 
          }
          $str=$str . "<script type=\"text/javascript\">var userName=\"$userName\"; var userID=$userID;</script>";
          printf($str);
        ?>
      </ul>
    </div>


    <div id="AlbumPanelDiv" class="AlbumPanelDiv">
      <div id="AlbumBarDiv" class="AlbumBarDiv">
      </div>
      <div id="AlbumListDiv" class="AlbumListDiv">
        <ul id="AlbumUL" class="AlbumUL">
        </ul>
      </div>
    </div>



    <div id="PicPanelDiv" class="PicPanelDiv">
      <div id="PicPanelToolDiv" class="PicPanelToolDiv">
	    <a href="javascript:befPic()"><</a>
	    <a href="javascript:nextPic()">></a>
	    <a href="javascript:nextGroup()">换一批</a>
	    排序
	    <select id="SortTypeSel" onclick="">
	      <option value="ShootTime">时间</option>
	      <option value="LikeNum">好评</option>
	      <option value="Rand">随机</option>
	    </select>
	    数目
	    <input type="text" id="PicNumText" value="20" />
	    <input type="button" id="Apply" onclick="applyFun()" value="应用" />
	
      </div>

      <div id="PicPanelImgDiv" class="PicPanelImgDiv">
        <img id="PicPanelImg" class="PicPanelImg" src="" />
      </div>

      <div id="PicPanelTool2Div" class="PicPanelTool2Div">
        <a href="javascript:likeFun()">Like</a>
        <span id="LikeNumLabel">0</span>
        <a href="javascript:showComment()">Comment</a>
        <a href="javascript:showInfo()">Info</a>
      </div>

      <div id="PicInfoDiv" class="PicInfoDiv">
      </div>
      

      <div id="PicPanelCmtDiv" class="PicPanelCmtDiv">
        <div id="PicCmtContentDiv" class="PicCmtContentDiv" >
        </div>
        <div id="PicCmtSendDiv" class="PicCmtSendDiv" >
          <input id="CmtContentText" type="text" />
          <input type="button" value="发送" onclick="sendCmtFun()" />
        </div>
      </div>
      
    </div>
    
    <div id="MapContainer" tabindex="0" > </div>
  </body>

  <script type="text/javascript" src="/js/jquery.min.js"></script>
  <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=605574e6236d5b46cff5ddfe4ac9f437"></script>
  <script type="text/javascript" src="/js/Map.js"></script>
  <script type="text/javascript" src="/js/Nav.js"></script>
  <script type="text/javascript" src="/js/PicPanel.js"></script>
  <script type="text/javascript" src="/js/AlbumPanel.js"></script>

</html>

