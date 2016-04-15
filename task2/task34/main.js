//获取需要的html元素
var elements={
	car:document.getElementById("car"),
	order:document.getElementById("order"),
	move:document.getElementById("move")
};
//检查输入指令函数
function checkOrder(value){
	var orderList=["GO","TUN LEF","TUN RIG","TUN BAC","TRA LEF","TRA RIG","TRA TOP","TRA BOT","MOV LEF","MOV TOP","MOV RIG","MOV BOT"];
	value=(value.trim()).toUpperCase();
	if(orderList.indexOf(value)>=0){
		return value;
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
	var orderValue=elements.order.value;
	if(!checkOrder(orderValue)){
		alert("输入指令有误，请重新输入");
	}else{
		switch(checkOrder(orderValue)){
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
//给button绑定事件处理函数
function bindClickFunc(){
	elements.move.addEventListener("click",clickExcute,false);
}
bindClickFunc();

