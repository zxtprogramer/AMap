function navGoto(cmd){
    switch(cmd){
        case 0://all
            homeUserID=0; homeUserName=""; albumID=0; albumName="";
            selectType="AllRange";
            break;
        case 1: //user
            albumID=0; albumName="";
            selectType="UserRange";
            break;
        case 2://album
            selectType="AlbumRange";
            break;
    }
    freshNav();
    freshAlbum();
    rangeChangeFresh();
    
}

function freshNav(){
    str='<a href="javascript:navGoto(0);">全部> </a>';
    if(homeUserID!=0){
	    str=str + '<a href="javascript:navGoto(1);">' + homeUserName + '> </a>';
    }
    if(albumID!=0){
        str=str + '<a href="javascript:navGoto(2);">' + albumName + '></a>';
    }

    $("#NavPath").html(str);
}

function navOwn(){
    homeUserID=userID;
    homeUserName=userName;
    albumID=0;
    albumName="";
    navGoto(1);
}

function navSet(){
}

function navLogout(){
  window.location="/Login/Logout.php";
}

function navLogin(){
  window.location="/Login/Login.php";
}

function navRegister(){
  window.location="/Register/Register.php";
}

function navUpload(){
  $("#UploadIframe").attr("src", "/upload.php");
  $("#UploadPicDiv").show();
}

function navUploadPicHide(){
  $("#UploadPicDiv").hide();
}



function navNewAlbum(){
  wH=$(window).height();
  wW=$(window).width();
  dW=$("#NewAlbumDiv").width();
  dH=$("#NewAlbumDiv").height();

  $("#NewAlbumDiv").css("left",(wW-dW)/2 + "px");
  $("#NewAlbumDiv").css("top",(wH-dH)/2 + "px");

  $("#MapMask").show();
  $("#NewAlbumDiv").show();
}

function newAlbum(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    var albumName=$("#NewAlbumName").val();
    var albumDes=$("#NewAlbumDes").val()

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            newAlbumHide();
        }
    };

    xmlhttp.open("POST", "/Command.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("cmd=newAlbum&AlbumName=" + albumName + "&AlbumDes=" + albumDes);

}

function newAlbumHide(){
  $("#MapMask").hide();
  $("#NewAlbumDiv").hide();
}
