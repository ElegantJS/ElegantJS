//初始化参数及获取所需页面元素
var elements={
	button:document.getElementById("button"),
      	hiddenBg:document.getElementById("hidebg"),
      	surfaced:document.getElementById("surfaced"),
      	save:document.getElementById("save"),
      	cancel:document.getElementById("cancel"),
      	orignLeft:this.surfaced.style.left,
      	orignTop:this.surfaced.style.top
};
//页面所需事件处理程序
var eventProgress=(function(){
	var mouseOffset,
	      hiddenBg=elements.hiddenBg,
	      button=elements.button,
	      surfaced=elements.surfaced;
	      save=elements.save,
	      cancel=elements.cancel;
	//显示元素
	function showEle(){
			hiddenBg.style.display="block";
			surfaced.style.display="block";
		}
	//隐藏元素
	function hiddenEle(){
			hiddenBg.style.display="none";
			surfaced.style.display="none";
		}
	//使surface元素回到初始位置
	function backToOrign(){
		surfaced.style.left=elements.orignLeft;
		surfaced.style.top=elements.orignTop;
	}
	//获取元素相对于document的偏移量
	function getOffset(ele){
		var x=0,y=0;
		while(ele){
			y+=ele.offsetTop;
			x+=ele.offsetLeft;
			ele=ele.offsetParent;
		}
		return{
			x:x,
			y:y
		}
	}
	//获取鼠标的位置
	function getMousePosition(event){
		if(event.pageX || event.pageY){
  			return {x:event.pageX, y:event.pageY};
 		}
 		return {
  			x:event.clientX + document.body.scrollLeft - document.body.clientLeft,
  			y:event.clientY + document.body.scrollTop  - document.body.clientTop
 		};
	}
	//获取鼠标相对目标元素的偏移量
	function getMouseOffset(ele,event){
		var elePosition=getOffset(ele);
		var mousePosition=getMousePosition(event);
		return{
			x:mousePosition.x-elePosition.x,
			y:mousePosition.y-elePosition.y
		}

	}
	return{
		//button元素点击事件处理程序
		buttonClick:showEle,
		//save元素点击事件处理程序
		saveClick:function(){
				alert("You choose Save!");
				hiddenEle();
				backToOrign();
			},
		//cancel元素点击事件处理程序
		cancelClick:function(){
				alert("You choose Cancel!");
				hiddenEle();
				backToOrign();
			},
		hiddenBgClick:function(){
				hiddenEle();
				backToOrign();
			},
		//为surface元素监听dragstart事件处理程序
		dragStart:function(event){
				var elePosition=getOffset(surfaced);
				surfaced.style.left=elePosition.x+"px";
				surfaced.style.top=elePosition.y+"px";
				surfaced.className="draging";
				mouseOffset=getMouseOffset(surfaced,event);
			},
		//为surface设置拖拽事件处理程序
		dragMoving:function(event){
				var target=document.getElementsByClassName("draging")[0],
				      mousePosition=getMousePosition(event);
				event=event||window.event;
				if(target!=null){
				target.style.left=mousePosition.x-mouseOffset.x+"px";
				target.style.top=mousePosition.y-mouseOffset.y+"px";
				}
			},
		//为surface元素设置完成拖动事件处理程序
		dragEnd:function(event){
			if(surfaced.className=="draging"){
				surfaced.className="";
			}
		}
	}
})();
//给个元素绑定点击事件处理程序
function bindClickFunc(){
	elements.button.addEventListener("click",eventProgress.buttonClick,false);
	elements.save.addEventListener("click",eventProgress.saveClick,false);
	elements.cancel.addEventListener("click",eventProgress.cancelClick,false);
	elements.hiddenBg.addEventListener("click",eventProgress.hiddenBgClick,false);
}
//为surface元素绑定拖拽事件处理程序
function bindDragFunc(){
	elements.surfaced.addEventListener("mousedown",function(){
		if(event.target.nodeName!="INPUT"){
			eventProgress.dragStart(event);
		}
	},false);
	document.addEventListener("mousemove",eventProgress.dragMoving,false);
	elements.surfaced.addEventListener("mouseup",eventProgress.dragEnd,false);
}
//初始化函数
function init(){
	bindClickFunc();
	bindDragFunc();
}
init();