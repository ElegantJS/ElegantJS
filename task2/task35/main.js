//获取需要的html元素
var elements={
	car:document.getElementById("car"),
	order:document.getElementById("order"),
	move:document.getElementById("move"),
	lineNumber:document.getElementById("line-num"),
	orderList:[]
};
//处理输入指令函数
function handleOrder(target){
	var orderValue=target.value;
	orderList=orderValue.split("\n");
}
//检查输入指令函数
function checkOrder(value){
	var tunOrderList=["TUN LEF","TUN RIG","TUN BAC"],
	      otherOrderList=["GO","TRA LEF","TRA RIG","TRA TOP","TRA BOT","MOV LEF","MOV TOP","MOV RIG","MOV BOT"];
	value=(value.trim()).toUpperCase();
	if(tunOrderList.indexOf(value)>=0){
		return value;
	}else if(otherOrderList.indexOf(value.replace(/\s\d$/,""))>=0){
		return parseInt(value.replace(/.*(\d)/,"$1"))?[value.replace(/\s\d/,""),parseInt(value.replace(/.*(\d)/,"$1"))]:[value,1];

	}
	return false;
}
//方块移动函数
function blockMove(node,rotateValue){
	var leftValue=parseInt(node.style.left),
	topValue=parseInt(node.style.top);
	switch(rotateValue%360){
		case 0:
			if(topValue==40){
				alert("已到达边界，再走就要撞车啦！");
			}else{
				node.style.top=(topValue-40)+"px";
			}
			break;
		case 90:
		case -270:
			if(leftValue==400){
				alert("已到达边界，再走就要撞车啦！");
			}else{
				node.style.left=(leftValue+40)+"px";
			}
			break;
		case 180:
		case -180:
			if(topValue==400){
				alert("已到达边界，再走就要撞车啦！");

			}else{
				node.style.top=(topValue+40)+"px";
			}
			break;
		case 270:
		case -90:
			if(leftValue==40){
				alert("已到达边界，再走就要撞车啦！");
			}else{
				node.style.left=(leftValue-40)+"px";
			}
			break;
	}
}
var runOrder={
		node:elements.car,
		go: function(){
			var rotateValue=parseInt(runOrder.node.style.transform.split(/[()]/)[1]);
			blockMove(runOrder.node,rotateValue);
		},
		turnLeft : function(){
			var rotateValue=parseInt(this.node.style.transform.split(/[()]/)[1]);
			this.node.style.transform="rotateZ("+(rotateValue-90)+"deg)";
		},
		turnRight : function(){
			var rotateValue=parseInt(this.node.style.transform.split(/[()]/)[1]);
			this.node.style.transform="rotateZ("+(rotateValue+90)+"deg)";
		},
		turnBack : function(){
			var rotateValue=parseInt(this.node.style.transform.split(/[()]/)[1]);
			this.node.style.transform="rotateZ("+(rotateValue+180)+"deg)";
		},
		transLeft:function(){
			blockMove(this.node,-90);
		},
		transRight:function(){
			blockMove(this.node,90);
		},
		transTop:function(){
			blockMove(this.node,0);
		},
		transBottom:function(){
			blockMove(this.node,180);
		},
		moveLeft:function(){
			if(this.node.style.transform=="rotateZ("+270+"deg)"){
				 this.go();
			}else{
			this.node.style.transform="rotateZ("+270+"deg)";
			setTimeout(this.go,1000);
			}
		},
		moveRight:function(){
			if(this.node.style.transform=="rotateZ("+90+"deg)"){
				this.go();
			}else{
				this.node.style.transform="rotateZ("+90+"deg)";
				setTimeout(this.go,1000);
			}
		},
		moveTop:function(){
			if(this.node.style.transform=="rotateZ("+0+"deg)"){
				this.go();
			}else{
				this.node.style.transform="rotateZ("+0+"deg)";
				setTimeout(this.go,1000);
			}
		},
		moveBottom:function(){
			if(this.node.style.transform=="rotateZ("+180+"deg)"){
				this.go();
			}else{
				this.node.style.transform="rotateZ("+180+"deg)";
				setTimeout(this.go,1000);
			}
		}
};
//执行按钮点击事件处理程序
function clickExcute(){
	handleOrder(elements.order);
	for(var j=0;j<elements.lineNumber.children.length;j++){
		elements.lineNumber.children[j].className="";
	}
	var index=0;
	loopRun();
	var clear=setInterval(loopRun,1000);
	function loopRun(){
		var subOrder=orderList.shift();
		if(orderList.length>0||subOrder){
			var orderResult=checkOrder(subOrder);
			if(!orderResult){
				elements.lineNumber.children[index].className="wrong";
			}else if(typeof orderResult=="string"){
				switch(orderResult){
					case "TUN LEF":
						runOrder.turnLeft();
						break;
					case "TUN RIG":
						runOrder.turnRight();
						break;
					case "TUN BAC":
						runOrder.turnBack();
						break;
				}
			}else{
				for(var i=0;i<orderResult[1];i++){
					switch(orderResult[0]){
						case "GO":
							runOrder.go();
							break;
						case "TUN LEF":
							runOrder.turnLeft();
							break;
						case "TUN RIG":
							runOrder.turnRight();
							break;
						case "TUN BAC":
							runOrder.turnBack();
							break;
						case "TRA LEF":
							runOrder.transLeft();
							break;
						case "TRA RIG":
							runOrder.transRight();
							break;
						case "TRA TOP":
							runOrder.transTop();
							break;
						case "TRA BOT":
							runOrder.transBottom();
							break;
						case "MOV LEF":
							runOrder.moveLeft();
							break;
						case "MOV RIG":
							runOrder.moveRight();
							break;
						case "MOV TOP":
							runOrder.moveTop();
							break;
						case "MOV BOT":
							runOrder.moveBottom();
							break;
					}
				}
			}
			i++;
		}else{
			clearInterval(clear);
		}
	}
}
//tecxtarea输入处理程序
function orderInput(){
	var target=event.target,
	lineNumber=elements.lineNumber,
	orderValue=target.value.split("\n");
	if(target.id=="order"){
		switch(event.keyCode){
			case 13:
				var newLine=document.createElement("li");
				newLine.innerHTML=lineNumber.children.length+1;
				lineNumber.appendChild(newLine);
				break;
			case 8:
				if (orderValue[orderValue.length-1]==""){
					 if(lineNumber.children.length>1){
						lineNumber.removeChild(lineNumber.children[(lineNumber.children.length-1)]);
					}
				}
				break;
		}
	}
}
//textarea区域滚动事件处理程序
function scrollFunc(){
	var top=event.target.scrollTop;
	elements.lineNumber.children[0].style.marginTop=-top+"px";
}
//给button绑定事件处理函数
function bindClickFunc(){
	elements.move.addEventListener("click",clickExcute,false);
}
//给textarea绑定输入事件处理程序
function bindInputFunc(){
	elements.order.addEventListener("keydown",orderInput,false);
	elements.order.addEventListener("scroll",scrollFunc,false);
}
//初始化函数
function init(){
	bindClickFunc();
	bindInputFunc();
}
init();

