//存放输入数字的列表
var inputList=[];
//获取input输入框和提示元素
var input=document.getElementById("input"),
      inputAlert=document.getElementById("alert"),
      numList=document.getElementById("num-List");

//渲染页面列表函数
function renderChart(){
	var fragment=document.createDocumentFragment(),
	      len=inputList.length,
	      numLen=numList.children.length;
	      for(var j=0;j<numLen;j++){
	      	numList.removeChild(numList.children[0]);
	      }
	for(var i=0;i<len;i++){
		var newItem=document.createElement("li");
		newItem.innerHTML=inputList[i];
		fragment.appendChild(newItem);
	}
	numList.appendChild(fragment);
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	     value=input.value;
	if(target.nodeName==="BUTTON"){
			inputAlert.innerHTML="";
		switch(target.className){
			case "unshift":
			if(!Number(value)||value===""){
				inputAlert.innerHTML="请输入正确的数字";
				break;
			}
			inputList.unshift(Number(value));
			renderChart();
			input.value="";
			break;
			case "push":
			if(!Number(value)||value===""){
				inputAlert.innerHTML="请输入正确的数字";
				break;
			}
			inputList.push(Number(value));
			renderChart();
			input.value="";
			break;
			case "shift":
			var shiftNum=inputList.shift();
			renderChart();
			input.value="";
			if(shiftNum){
				alert(shiftNum+" 被残忍抛弃了");
			}else{
				alert("都空了，你要移除啥？");
			}
			break;
			case "pop":
			var popNum=inputList.pop();
			renderChart();
			input.value="";
			if(popNum){
				alert(popNum+"被残忍抛弃了");
			}else{
				alert("都空了，你要移除啥？");
			}
			break;
		}
	}

}
//LI元素点击事件处理程序
function numClick(){
	var target=event.target;
	if(target.nodeName==="LI"){
		var index=[].indexOf.call(target.parentNode.children,target);
		numList.removeChild(target);
		var deleteNum=inputList.splice(index,1);
		alert(deleteNum+" 被残忍抛弃了");
	}
}
//给button绑定点击事件处理程序
function initButtonClick(){
	var buttonArea=document.getElementById("button-area");
	buttonArea.addEventListener("click",buttonClick,false);
}
//给LI元素绑定点击事件处理程序
function initNumClick(){
	numList.addEventListener("click",numClick,false);
}
//初始化函数
function init(){
	initButtonClick();
	initNumClick();
}
init();