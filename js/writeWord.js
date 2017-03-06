// JavaScript Document

window.onload=function(){
    var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
    //设置画布宽高
	var canvasWidth=800;
	var canvasHeight=canvasWidth;
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;

	var e = e || window.event;
	var ismousedown=false;
	var strokeColor="red";
	lineWidth=28;
	var lastLineWidth=-1;//相当于标志位，结果返回strokeWidth；
	/***************************************/
 
	
    /***************************************/
	/*清除字*/
	var btns=document.getElementById("btns");
	var a=btns.getElementsByTagName("a")[0];
    a.onclick=function(){
	     context.clearRect(0,0,canvas.width,canvas.height);	
		 driveFont();
	}
	/****************************************/
	//用不同颜色写
   	var div=btns.getElementsByTagName("div");
	for(var i=0;i<div.length;i++){
		(function(i){
			div[i].onclick=function(){
				for(var j=0;j<div.length;j++){
		            div[j].className="sn";
			    }
			    this.className="sn btn_selected";
				strokeColor=getStyle(this,"background-color");
		    }
			
		})(i);
	}
	/*$(".sn").click(function(){
			$(this).addClass("btn_selected").siblings().removeClass("btn_selected");	;
            strokeColor=$(this).css("background-color");
	});	*/	   

	
	canvas.onmousedown=function(e){
		e.preventDefault();  
		ismousedown=true;
	    lastPos=getPos(e.clientX,e.clientY);
		lastTime=new Date().getTime();
	    //alert(lastPos.x+"+"+lastPos.x);
	}
	canvas.onmousemove=function(e){
	    e.preventDefault(); 
	    if(ismousedown){
			curPos=getPos(e.clientX,e.clientY);
			curTime=new Date().getTime();
			
		    context.beginPath();
			context.lineWidth=lineWidth;
			context.strokeStyle=strokeColor;
			context.lineCap="round";
			context.moveTo(lastPos.x,lastPos.y);
			context.lineTo(curPos.x,curPos.y);
			context.stroke();
			   //笔速对线条粗细的影响
			var s=Math.sqrt((curPos.x-lastPos.x)*(curPos.x-lastPos.x)+(curPos.y-lastPos.y)*(curPos.y-lastPos.y));
			var t=curTime-lastTime;
			lineWidth=calcLineWidth(s,t);
			
			lastLineWidth=lineWidth;
			lastPos=curPos;
			lastTime=curTime;
		}
		
	}
	canvas.onmouseup=function(e){
		e.preventDefault();
		ismousedown=false;
	}
	canvas.onmouseout=function(e){
	    e.preventDefault();
		ismousedown=false;
	}
	function calcLineWidth(s,t){
		var v=s/t;
		var strokeWidth;
		if(v<=0.1){
			strokeWidth=28;
		}else if(v>=7){
			strokeWidth=2;
		}else{
			strokeWidth=28-(v-0.1)/(7-0.1)*(28-2);
		}
		if(lastLineWidth==-1){
			return strokeWidth;
		}
		return lastLineWidth*2/3+strokeWidth*1/3;
	}
	

		
	//画布中鼠标按下时的坐标	
	function getPos(x,y){
			x1=Math.round(x-canvas.getBoundingClientRect().left);
			y1=Math.round(y-canvas.getBoundingClientRect().top);
			return {x:x1,y:y1}
	}
	
    driveFont();
	//画写字框
    function driveFont(){
	    context.save();
		context.lineWidth=9;
		context.strokeStyle="red";
		
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(canvasWidth-0,0);
		context.lineTo(canvasWidth-0,canvasHeight-0);
		context.lineTo(0,canvasHeight-0);
		context.closePath();
		context.stroke();
		
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(canvasWidth,canvasHeight);
		
		context.moveTo(canvasWidth,0);
		context.lineTo(0,canvasWidth);
		
		context.moveTo(canvasWidth/2,0);
		context.lineTo(canvasWidth/2,canvasWidth);
		
		context.moveTo(0,canvasHeight/2);
		context.lineTo(canvasWidth,canvasHeight/2);
		
		context.lineWidth=1;
		context.stroke();
		context.restore();
	}
    
}
