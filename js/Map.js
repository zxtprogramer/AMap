var map;
var mouseLng, mouseLat;
var lngMax,lngMin,latMax,latMin;

var picArray=new Array();
var picMarker=new Array();

//show pic method;
var picNum=20;
var groupNum=0;
var sortType="PicID";
var selectType="AllRange";
var para="";
//////////////////////
//
//var userName="";
//var userID=0;
//
var homeUserID=0;
var homeUserName="";
var albumID=0;
var albumName="";

////////////////////////

function getDis(lng1,lat1,lng2,lat2){
    R=6371e3;
    x1=R*cos(lat1)*cos(lng1); x2=R*cos(lat2)*cos(lng2);
    y2=R*cos(lat1)*sin(lng1); y2=R*cos(lat2)*sin(lng2);
    z1=R*sin(lat1); z2=R*sin(lat2);
    dis=sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2));
    ang=asin(dis/2.0/R)*2;
    dis=R*ang;
    return dis;
}


function getBounds(){
    bounds=map.getBounds().toString();
    bArr=bounds.split(';');
    ws=bArr[0].split(',');
    en=bArr[1].split(',');
    lngMin=Math.min(parseFloat(ws[0]),parseFloat(en[0]));
    lngMax=Math.max(parseFloat(ws[0]),parseFloat(en[0]));
    latMin=Math.min(parseFloat(ws[1]),parseFloat(en[1]));
    latMax=Math.max(parseFloat(ws[1]),parseFloat(en[1]));

}


function getPic(num, groupNum, sortType, selectType, para){
    var xmlhttp;
    picATmp=new Array();
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
	if(xmlhttp.readyState==4 && xmlhttp.status==200){
	    res=xmlhttp.responseText;
        if(res<=0){
          picATmp="";return;
        }
	    picList=res.split("#");
	    for(var i=0;i<picList.length;i++){
		picATmp[i]=new Array();
		picInfo=picList[i].split(" ");
		for(var j=0;j<picInfo.length;j++){
		    key=decodeURIComponent(picInfo[j].split("=")[0]);
		    value=decodeURIComponent(picInfo[j].split("=")[1]);
		    picATmp[i][key]=value;
		}
	    }
	}
    };

    xmlhttp.open("POST", "/Command.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("cmd=getPic&picNum=" + num + "&groupNum=" + groupNum + "&sortType=" + sortType + "&selectType=" + selectType + "&" + para);
    
    return picATmp;
}

function getPicPara(){
    switch(selectType){
        case "All":
            para="";
            break;
        case "AllRange":
            para="lngMax=" + lngMax + "&lngMin=" + lngMin + "&latMax=" + latMax + "&latMin=" + latMin;
            break;
        case "UserRange":
            para="userID=" + homeUserID + "&lngMax=" + lngMax + "&lngMin=" + lngMin + "&latMax=" + latMax + "&latMin=" + latMin;
            break;
        case "AlbumRange":
            para="albumID=" + albumID + "&lngMax=" + lngMax + "&lngMin=" + lngMin + "&latMax=" + latMax + "&latMin=" + latMin;
            break;
 
    }
}

function initStatus(){
    $("#MapMask").hide();
    $("#NewAlbumDiv").hide();
    $("#UploadPicDiv").hide();
  
}

function initMap(){
    map=new AMap.Map('MapContainer',{resizeEnable:true, zoom:12, center:[116.39,39.9]});
    AMap.event.addListener(map,"moveend",_onMoveend);
    AMap.event.addListener(map,"dragend",_onMoveend);
    AMap.event.addListener(map,"zoomend",_onMoveend);
    AMap.event.addListener(map,"touchend",_onMoveend);
    AMap.event.addListener(map,"click",_onClick);

}

function _onClick(e){
    mouseLng=e.lnglat.getLng();
    mouseLat=e.lnglat.getLat();
    $("#UploadIframe").contents().find("#upPicPos").attr("value", mouseLng+","+mouseLat);
}

function rangeChangeFresh(){
    getBounds();
    groupNum=0;
    getPicPara();
    picArray=getPic(picNum, groupNum, sortType, selectType, para);
    freshPic();
}

function fresh(){
    getPicPara();
    picArray=getPic(picNum, groupNum, sortType, selectType, para);
    if(picArray.length<=1){
	  groupNum=0;
	  getPicPara();
	  picArray=getPic(picNum, groupNum, sortType, selectType, para);
    }
    freshPic();
}

function _onMoveend(e){
    rangeChangeFresh();
}
function _onDragend(e){
    rangeChangeFresh();
}
function _onZoomend(e){
    rangeChangeFresh();
}
function _onTouchend(e){
    rangeChangeFresh();
}


function freshPic(){
    nowIndex=0;
    freshPanel();
    
    for(var i=0;i<picMarker.length;i++){
	picMarker[i].setMap();
    }
    for(var i=0;i<picArray.length;i++){
	picUserID=picArray[i]['UserID'];
	picW=picArray[i]['Width'];
	picH=picArray[i]['Height'];
	
	picLng=parseFloat(picArray[i]['Longitude']);
	picLat=parseFloat(picArray[i]['Latitude']);
	
	picSnapPath=picArray[i]['PicPath']+"_snap.jpg";
	picLikeNum=picArray[i]['LikeNum'];
	
	picInfo='<div class="SnapDiv" id="SnapDiv' + i + '"><img onclick="javascript:onClickMarker(' + i + ')" class="SnapImg" src="' + picSnapPath + '" /></div>';
	picMarker[i]=new AMap.Marker({position:[picLng,picLat]});
    picMarker[i].setLabel({offset:new AMap.Pixel(15,10), content:picInfo});
	picMarker[i].setMap(map);
    }
    
}


function onClickMarker(index){
    nowIndex=index;
    freshPanel();
}

initMap();
initStatus();

