let nf=false;
let col=false;
let save=false;
let camera=new Utils("error");
let canvas=document.getElementById("video");
let call;
function o(){
  nf=!nf;
  if(nf){
    camera.startCamera("qvga",null,"storagevideo");
    document.getElementById("open").innerHTML="<span>OPEN CAMERA</span>";
    document.getElementById("abstract").style.opacity="0";
    call=window.setInterval(output,1);
  }
  else{
    col=false;
    save=false;
    document.getElementById("color").innerHTML="<span>FULL COLOR</span>";
    document.getElementById("save").innerHTML="<span>DRAIN AWAY</span>";
    camera.stopCamera();
    document.getElementById("open").innerHTML="<span>CLOSE CAMERA</span>";
    document.getElementById("abstract").style.opacity="1";
    window.clearInterval(call);
  }
}
function c(){
  if(nf){
    col=!col;
    if(col){
      document.getElementById("color").innerHTML="<span>GRAY SCALE</span>";
    }
    else{
      document.getElementById("color").innerHTML="<span>FULL COLOR</span>";
    }
  }
}
function s(){
  if(nf){
    save=!save;
    if(save){
      document.getElementById("save").innerHTML="<span>SAVING PHOTOS</span>";
    }
    else{
      document.getElementById("save").innerHTML="<span>DRAIN AWAY</span>";
    }
  }
}
function output(){
  try{
    if(col){
      let video=document.getElementById("storagevideo");
      let catalyst=new cv.Mat(300,400,cv.CV_8UC4);
      let real=new cv.Mat(300,400,cv.CV_8UC1);
      let camera=new cv.VideoCapture(video);
      camera.read(catalyst);
      cv.cvtColor(catalyst,real,cv.COLOR_BGR2GRAY);
      cv.imshow("video",real);
      real.delete();
      catalyst.delete();
    }
    else{
      let video=document.getElementById("storagevideo");
      let catalyst=new cv.Mat(300,400,cv.CV_8UC4);
      let camera=new cv.VideoCapture(video);
      camera.read(catalyst);
      cv.imshow("video",catalyst);
      catalyst.delete();
    }
    if(save){
      let date=new Date();
      let fulldate=date.getFullYear().toString()+"-"+date.getMonth().toString()+"-"+date.getDate().toString()+"-"+date.getDay().toString()+"-"+date.getHours().toString()+"-"+date.getMinutes().toString()+"-"+date.getSeconds().toString()+"-"+date.getMilliseconds().toString();
      Canvas2Image.saveAsPNG(canvas,400,300,fulldate);
    }
  }
  catch(err){
    col=false;
    save=false;
    document.getElementById("color").innerHTML="<span>FULL COLOR</span>";
    document.getElementById("save").innerHTML="<span>DRAIN AWAY</span>";
    o();
    alert("Error! Plese refresh");
  }
}