//存放输入数字的列表
var inputList=[];
//存放用户输入的tag列表
var tagList=[];
//获取input输入框和提示元素
var input=document.getElementById("input"),
      inputTag=document.getElementById("tag"),
      numNode=document.getElementById("num-List"),
      tagNode=document.getElementById("tag-list");


//渲染页面列表函数
function renderChart(node,arr){
	var fragment=document.createDocumentFragment(),
	      len=arr.length,
	      numLen=node.children.length;
	      for(var j=0;j<numLen;j++){
	      	node.removeChild(node.children[0]);
	      }
	for(var i=0;i<len;i++){
		var newItem=document.createElement("li");
		newItem.innerHTML=arr[i];
		fragment.appendChild(newItem);
	}
	node.appendChild(fragment);
}
//处理textarea输入框内容函数
function handleInput(value){
	if(!value){
		alert("请输入有效内容！");
		return;
	}
	var inputItem=value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/g,",").split(","),
	      isMore;
	for(var i=0;i<inputItem.length;i++){
		if(inputItem[i]&&searchKeyWord(inputItem[i],numNode)){
			if(inputList.length===10){
				isMore=true;
				inputList.shift();
				inputList.push(inputItem[i]);
			}else{
				isMore=false;
				inputList.push(inputItem[i]);
			}
			renderChart(numNode,inputList);
		}
	}
	if(isMore){
		alert("您输入的兴趣爱好超过10个，系统已自动删除前面多余的输入");
	}
}
//检测用户输入是否已存在函数
function searchKeyWord(searchValue,node){
	for(var i=0;i<node.children.length;i++){
		if(searchValue==node.children[i].innerHTML){
			return false;
		}
	}
	return true;
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	     value=input.value;
	if(target.id==="confirm"){
			handleInput(value);
			input.value="";
	}

}
//tag元素鼠标移入处理程序
function tagMouseOver(){
	var target=event.target;
	if(target.nodeName=="LI"){
		var value=target.innerHTML;
		target.className="hover-tag";
		target.innerHTML="点击删除"+value;
	}

}
//tag元素鼠标移出处理程序
function tagMouseOut(){
	var target=event.target;
	if(target.nodeName=="LI"){
		var value=target.innerHTML;
		target.className="";
		target.innerHTML=value.slice(4);
	}
}
//tag元素点击事件处理程序
function tagClick(){
	var target=event.target,
	      deleteNum=target.innerHTML.slice(4);
	if(target.nodeName==="LI"){
		var index=[].indexOf.call(target.parentNode.children,target);
		tagNode.removeChild(target);
		tagList.splice(index,1);
		alert(deleteNum+" 被残忍抛弃了");
	}
}
//检测用户输入tag函数
function tagInputProcess(){
	var tagValue=inputTag.value.trim();
	if(event.keyCode==32||event.keyCode==13){
		if(tagValue){//检测输入是否为空
			if( searchKeyWord(tagValue,tagNode)){//检验输入是否已存在
				if(tagList.length===10){//检测当前已存在tag数
					tagList.shift();
					tagList.push(tagValue);
					alert("您输入的Tag已超过10个，系统将自动删除前面多余的Tag");
				}else{
					tagList.push(tagValue);
				}
			}
		}
		inputTag.value="";
	}
	renderChart(tagNode,tagList);
}
//给button绑定点击事件处理程序
function initButtonClick(){
	var button=document.getElementById("confirm");
	button.addEventListener("click",buttonClick,false);
}
//给tag元素绑定点击和鼠标事件处理程序
function initTagItem(){
	tagNode.addEventListener("mouseover",tagMouseOver,false);
	tagNode.addEventListener("mouseout",tagMouseOut,false);
	tagNode.addEventListener("click",tagClick,false);
}
//给tag输入框绑定点击事件处理程序
function initTagInput(){
	inputTag.addEventListener("keydown",tagInputProcess,false);
}
//初始化函数
function init(){
	initButtonClick();
	initTagItem();
	initTagInput();
}
init();