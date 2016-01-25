var albumArray=new Array();

function getAlbum(albumUserID){
    var xmlhttp;
    var albumATmp=new Array();
    xmlhttp=new XMLHttpRequest();

    xmlhttp.onreadystatechange=function(){
	    if(xmlhttp.readyState==4 && xmlhttp.status==200){
	        res=xmlhttp.responseText;
            if(res.length<=0)return;
	        albumList=res.split("#");
	        for(var i=0;i<albumList.length;i++){
	    	    albumATmp[i]=new Array();
	    	    albumInfo=albumList[i].split(" ");
	    	    for(var j=0;j<albumInfo.length;j++){
	    	        key=decodeURIComponent(albumInfo[j].split("=")[0]);
	    	        value=decodeURIComponent(albumInfo[j].split("=")[1]);
	    	        albumATmp[i][key]=value;
	    	    }
	        }
	    }
    };

    xmlhttp.open("POST", "/Command.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("cmd=getAlbum&albumUserID=" + albumUserID);
    
    return albumATmp;
}

function freshAlbum(){
    albumArray=getAlbum(homeUserID);
    if(parseInt(homeUserID)==0){
        $("#AlbumBarDiv").html("全部相册");
    }
    else{
        $("#AlbumBarDiv").html(homeUserName + "的相册");
    }

    str="";
    for(var i=0;i<albumArray.length;i++){
       alName=albumArray[i]['AlbumName'];
       alDes=albumArray[i]['Description'];
       alPicNum=albumArray[i]['PicNum'];
       alUserName=albumArray[i]['UserName'];
       alTime=albumArray[i]['CreateTime'];
       alFacePath=albumArray[i]['FacePicPath'];
       str=str + '<li><a href="javascript:gotoAlbum(' + i +')"><div class="AlbumItemDiv" id="AlbumItem' + i + '">' + 
           '<img src="' + alFacePath + '" /><br />' +
           '<span>名称:' + alName + '</span><br />' +
           '<span>作者:' + alUserName + '</span><br />' +
           '<span>数目:' + alPicNum + '</span><br />' +
           '</div></a></li>';
    }
    $("#AlbumUL").html(str);
    
}

function gotoAlbum(index){
    homeUserName=albumArray[index]['UserName'];
    homeUserID=parseInt(albumArray[index]['UserID']);
    albumID=parseInt(albumArray[index]['AlbumID']);
    albumName=albumArray[index]['AlbumName'];
    selectType="AlbumRange";
    freshNav();
    rangeChangeFresh();
}

freshAlbum();
