var nowIndex=0;

function closePicPanel(){
  $("#PicPanelDiv").hide();
}


function likeFun(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
	    if(xmlhttp.readyState==4 && xmlhttp.status==200){
	    }
    };

    xmlhttp.open("POST", "/Command.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    cmtContent=encodeURIComponent($("#CmtContentText").val());
    picID=picArray[nowIndex]["PicID"];
    xmlhttp.send("cmd=addLike&picID=" + picID);
    //num=parseInt($("#LikeNumLabel").text())+1;
    //$("#LikeNumLabel").text(num);
}

function getTimeStr(sec){
    var d=new Date();
    d.setTime(parseInt(sec)*1000);
    year=d.getFullYear();
    month=d.getMonth()+1;
    if(month<10)month="0"+month;
    day=d.getDate();
    if(day<10)day="0"+day;
    hour=d.getHours();
    if(hour<10)hour="0"+hour;
    min=d.getMinutes();
    if(min<10)min="0"+min;
    sec=d.getSeconds();
    if(sec<10)sec="0"+sec;
    return year+"-"+month+"-"+day+" " + hour + ":" + min + ":" + sec;
}

function showInfo(){
    info=[];
    info.push("文件名:" + picArray[nowIndex]['PicName']);
    info.push("文件ID:" + picArray[nowIndex]['PicID']);
    info.push("LikeNum:" + picArray[nowIndex]['LikeNum']);
    info.push("宽度(px):" + picArray[nowIndex]['Width']);
    info.push("高度(px):" + picArray[nowIndex]['Height']);
    info.push("时间:" + picArray[nowIndex]['ShootTime']);
    info.push("位置:" + picArray[nowIndex]['Longitude'] + " " + picArray[nowIndex]['Latitude']);
    info.push("描述:" + picArray[nowIndex]['Description']);
    $("#PicInfoDiv").html(info.join("<br />"));
    $("#PicInfoDiv").show();
    $("#PicPanelCmtDiv").hide();
}

function sendCmtFun(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
	    if(xmlhttp.readyState==4 && xmlhttp.status==200){
            showComment();
	    }
    };

    xmlhttp.open("POST", "/Command.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    cmtContent=encodeURIComponent($("#CmtContentText").val());
    picID=picArray[nowIndex]["PicID"];
    xmlhttp.send("cmd=sendComment&picID=" + picID + "&cmt=" + cmtContent);
    return cmtATmp;

}

function showComment(){
    var cmtArray=getComment(picArray[nowIndex]['PicID']);
    cmt=[];
    for(var i=0;i<cmtArray.length;i++){
        cmtUserName=cmtArray[i]['UserName'];
        cmtTime=getTimeStr(cmtArray[i]['CreateTime']);
        cmtStr=cmtArray[i]['Comment'];
        str='<span class="CmtUserName">' + cmtUserName + "</span>" + '<span class="CmtTime"> (' + cmtTime + "): </span>" + '<span class="CmtStr">' + cmtStr + '</span>';
     
        cmt.push(str);
    }
    $("#PicCmtContentDiv").html(cmt.join("<br />"));
    $("#PicInfoDiv").hide();
    $("#PicPanelCmtDiv").show();
}

function getComment(picID){
    var xmlhttp;
    cmtATmp=new Array();
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
	    if(xmlhttp.readyState==4 && xmlhttp.status==200){
	        res=xmlhttp.responseText;
            if(res.length<=0)return;
	        cmtList=res.split("#");
	        for(var i=0;i<cmtList.length;i++){
	    	    cmtATmp[i]=new Array();
	    	    cmtInfo=cmtList[i].split(" ");
	    	    for(var j=0;j<cmtInfo.length;j++){
	    	        key=decodeURIComponent(cmtInfo[j].split("=")[0]);
	    	        value=decodeURIComponent(cmtInfo[j].split("=")[1]);
	    	        cmtATmp[i][key]=value;
	    	    }
	        }
	    }
    };

    xmlhttp.open("POST", "/Command.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("cmd=getComment&picID=" + picID);
    
    return cmtATmp;
}


function befPic(){
    nums=picArray.length;
    nowIndex=(nowIndex-1);
    if(nowIndex<0){nowIndex=nums-1;}
    freshPanel();
}

function nextPic(){
    nums=picArray.length;
    nowIndex=(nowIndex+1)%nums;
    freshPanel();
}

function nextGroup(){
    groupNum=groupNum + 1;
    fresh();
}

function applyFun(){
    picNum=$("#PicNumText").val();
    sortType=$("#SortTypeSel").val();
    fresh();
}

function freshPanel(){
    if(picArray.length<=0)return;

    picPath=picArray[nowIndex]['PicPath'];
    
    picW=parseInt(picArray[nowIndex]['Width']);
    
    picH=parseInt(picArray[nowIndex]['Height']);
    
    picLng=parseFloat(picArray[nowIndex]['Longitude']);
    picLat=parseFloat(picArray[nowIndex]['Latitude']);
    
    picLikeNum=parseInt(picArray[nowIndex]['LikeNum']);

    picUserID=picArray[nowIndex]['UserID'];

    if(picW>0 && picH>0){

	    $("#LikeNumLabel").text(picLikeNum);
	    $("#PicPanelImg").attr("src",picPath + "_snap.jpg");

	    divH=parseInt($("#PicPanelImgDiv").height());
	    divW=parseInt($("#PicPanelImgDiv").width());

	    rH=divH/picH;  rW=divW/picW;

        if(rH>=rW){
            imgH=divW*picH/picW;
            imgW=divW;
        }
        else{
            imgW=divH*picW/picH;
            imgH=divH;
        }

        topPx=(divH - imgH)/2;
        leftPx=(divW - imgW)/2;
	    $("#PicPanelImg").css("height",imgH+"px");
	    $("#PicPanelImg").css("width",imgW+"px");
	    $("#PicPanelImg").css("top",topPx+"px");
	    $("#PicPanelImg").css("left",leftPx+"px");
    }

    showComment();

}



function hidePanel(){
    $("#PicPanelDiv").hide();
}

function showPanel(){
    $("#PicPanelDiv").show();
}
