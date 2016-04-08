//存放输入数字的列表
var inputList=[];
//获取input输入框和提示元素
var input=document.getElementById("input"),
      inputAlert=document.getElementById("alert"),
      numList=document.getElementById("num-List");
//随机生成50个数函数
function randomNum(){
	while(numList.children.length){
		numList.removeChild(numList.children[0]);
	}
	inputList=[];
	for (var i = 0; i < 50; i++) {
		var random=Math.floor(Math.random()*90+10);
			inputList.push(random);
	}
}
//渲染页面列表函数
function renderChart(arr){
	var fragment=document.createDocumentFragment(),
	      len=arr.length||inputList.length,
	      numLen=numList.children.length;
	      for(var j=0;j<numLen;j++){
	      	numList.removeChild(numList.children[0]);
	      }
	for(var i=0;i<len;i++){
		var newItem=document.createElement("li");
		newItem.innerHTML=arr[i];
		newItem.style.height=arr[i]*4+"px";
		newItem.style.lineHeight=newItem.style.height;
		fragment.appendChild(newItem);
	}
	numList.appendChild(fragment);
}
//验证输入是否有效函数
function isRight(value){
	if(!Number(value)||value===""){
		inputAlert.innerHTML="请输入正确的数字";
		return false;
	}else if(Number(value)>100||Number(value)<10){
		inputAlert.innerHTML="请输入10-100以内的数字";
		return false;
	}else if(inputList.length==60){
		alert("已达到上限60个数，本次输入将被舍弃！");
		input.value="";
		return false;
	}
	return true;
}
//快排序函数
function quickSort(arr){

}

//冒泡排序函数
function bubbleSort(arr){
    var len=arr.length,
          i=0,
          j=0;
          clear=setInterval(innerLoop,10);
    function innerLoop(){
        if(i<len){
                if(j<len-i){
                    if(arr[j]<arr[j-1]){
                        arr[j]=[arr[j-1],arr[j-1]=arr[j]][0];
                        renderChart(arr);
                        numList.children[j].className="red";
                    }
                    j++;
                    return;
                }else{
                    j=0;
                }
                i++;
            }else{
            	for(var k=0;k<inputList.length;k++){
            		numList.children[k].className="";
            	}
                clearInterval(clear);
            }
        }
}
//插入排序算法
function insertSort(arr){
	var empty=[],
	i=1,
	len=arr.length;
	clear=setInterval(innerLoop,50);
	empty.push(arr[0]);
	var j=empty.length;
	function innerLoop(){
		if(i<len){
			if(arr[i]>=empty[empty.length-1]){
				empty[empty.length]=arr[i];
				renderChart(empty.concat(arr.slice(i+1)));
				numList.children[i].className="red";
				j=empty.length;
			}else{
				if(j>0&&arr[i]<empty[j-1]){
					empty[j]=empty[j-1];
					empty[j-1]=arr[i];
					renderChart(empty.concat(arr.slice(i+1)));
					numList.children[j-1].className="red";
					j--;
					return;
				}
			j=empty.length;
			}
			i++;
		}
		else{
			for(var k=0;k<inputList.length;k++){
            			numList.children[k].className="";
            		}
			clearInterval(clear);
		}
		inputList=empty;
	}

}
//选择排序算法
function selectSort(arr){
	var min,
	      len=arr.length,
	      i=0,
	      j=i+1,
	      clear=setInterval(innerLoop,10);
	function innerLoop(){
		if(i<len){
			min=i;
			if(j<len){
				if(arr[min]>arr[j]){
					min=j;
					if(min!=i){
						arr[i]=[arr[min],arr[min]=arr[i]][0];
						renderChart(arr);
						numList.children[min].className="red";
						numList.children[i].className="red";
					 }
				}
				j++;
				return;
			}
			i++;
			  j=i+1;
		}else{
			for(var k=0;k<inputList.length;k++){
            			numList.children[k].className="";
            		}
			clearInterval(clear);
		}
	}
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	     value=input.value;
	if(target.nodeName==="BUTTON"){
			inputAlert.innerHTML="";
		switch(target.className){
			case "unshift":
				if(!isRight(value)){
					break;
				}else{
					inputList.unshift(Number(value));
					renderChart(inputList);
					input.value="";
					break;
				}
			case "push":
				if(!isRight(value)){
					break;
				}else{
					inputList.push(Number(value));
					renderChart(inputList);
					input.value="";
					break;
				}
			case "shift":
				var shiftNum=inputList.shift();
				renderChart(inputList);
				input.value="";
				if(shiftNum){
					alert(shiftNum+" 被残忍抛弃了");
				}else{
					alert("都空了，你要移除啥？");
				}
				break;
			case "pop":
				var popNum=inputList.pop();
				renderChart(inputList);
				input.value="";
				if(popNum){
					alert(popNum+"被残忍抛弃了");
				}else{
					alert("都空了，你要移除啥？");
				}
				break;
			case "random":
				randomNum();
				renderChart(inputList);
				break;
			case "insertSort":
				if(!inputList.length){
					alert("都空了,还排啥排？");
					break;
				}else{
					insertSort(inputList);
				break;
				}
			case "bubbleSort":
				if(!inputList.length){
					alert("都空了,还排啥排？");
					break;
				}else{
					bubbleSort(inputList);
					break;
				}
			case "selectSort":
				if(!inputList.length){
					alert("都空了,还排啥排？");
					break;
				}else{
					selectSort(inputList);
					break;
				}
			case "quickSort":
				alert("oops,此功能尚未开发，试试其它的吧~~~");
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
	var buttonArea=document.getElementById("button-area"),
	      sortArea=document.getElementById("sort-area");
	buttonArea.addEventListener("click",buttonClick,false);
	sortArea.addEventListener("click",buttonClick,false);
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