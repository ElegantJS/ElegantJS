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
//处理输入框内容函数
function handleInput(value,handle){
	if(!value){
		alert("请输入有效内容！");
		return;
	}
	var inputItem=value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/g,",").split(",");
	for(var i=0;i<inputItem.length;i++){
		if(inputItem[i]){
			if(handle==="unshift"){
			inputList.unshift(inputItem[i]);
		}else if(handle==="push"){
			inputList.push(inputItem[i]);
		}
		}
	}
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	     value=input.value;
	if(target.nodeName==="BUTTON"){
		switch(target.className){
			case "unshift":
				handleInput(value,"unshift");
				renderChart();
				input.value="";
				break;
			case "push":
				handleInput(value,"push");
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
			case "search":
				function searchKeyWord(){
					for(var j=0;j<numList.children.length;j++){
						numList.children[j].className="";
					}
					var searchValue=document.getElementById("search").value;
					if(!searchValue){
						return;
					}
					var searchWord=new RegExp(searchValue);
					for(var i=0;i<numList.children.length;i++){
						if(searchWord.test(numList.children[i].innerHTML)){
							numList.children[i].className="match-word";
						}
					}
					document.getElementById("search").value="";
				}
				searchKeyWord();
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