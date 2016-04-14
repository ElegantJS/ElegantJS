//获取需要的html元素
var elements={
	car:document.getElementById("car"),
	order:document.getElementById("order"),
	move:document.getElementById("move")
};
//检查输入指令函数
function checkOrder(value){
	var orderList=["GO","TUN LEF","TUN RIG","TUN BAC"];
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
		go: function(node){
			var rotateValue=parseInt(elements.car.style.transform.split(/[()]/)[1]);
			blockMove(node,rotateValue);
		},
		turnLeft : function(node){
			var rotateValue=parseInt(elements.car.style.transform.split(/[()]/)[1]);
			node.style.transform="rotateZ("+(rotateValue-90)+"deg)";
		},
		turnRight : function(node){
			var rotateValue=parseInt(elements.car.style.transform.split(/[()]/)[1]);
			node.style.transform="rotateZ("+(rotateValue+90)+"deg)";
		},
		turnBack : function(node){
			var rotateValue=parseInt(elements.car.style.transform.split(/[()]/)[1]);
			node.style.transform="rotateZ("+(rotateValue+180)+"deg)";
		}
};
//执行按钮点击事件处理程序
function clickExcute(){
	var orderValue=elements.order.value,
	      block=elements.car;
	if(!checkOrder(orderValue)){
		alert("输入指令有误，请重新输入");
	}else{
		switch(checkOrder(orderValue)){
			case "GO":
				runOrder.go(block);
				break;
			case "TUN LEF":
				runOrder.turnLeft(block);
				break;
			case "TUN RIG":
				runOrder.turnRight(block);
				break;
			case "TUN BAC":
				runOrder.turnBack(block);
				break;
		}
	}
}
//给button绑定事件处理函数
function bindClickFunc(){
	elements.move.addEventListener("click",clickExcute,false);
}
bindClickFunc();

