var orderList=[],//用来保存遍历后节点
      lastTime,//记录上次点击按钮时间
      treeNodes=document.getElementsByTagName("div"),
      buttonArea=document.getElementById("button-area"),
      alertText=document.getElementById("alert");

//消除chrome中自动出现的shadow root对treeNodes的影响
for (var i =0; i<treeNodes.length; i++) {
	if(!treeNodes[i].className){
		treeNodes.splice(i,1);
	}
}
//生成二叉树节点函数
function Node(data,left,right){
	this.data=data;
	this.left=left;
	this.right=right;
	this.value=Number(data.className);
	this.show=show;

	function show(){
		return this.data;
	}
}
//二叉树生成构造函数
function BST(){
	this.root=null;
	this.insert=insert;
	this.preOrder=preOrder;
	this.inOrder=inOrder;
	this.postOrder=postOrder;

	//向二叉树插入节点函数
	function insert(data){
		var newNode=new Node(data,null,null);
		if(this.root===null){
			this.root=newNode;
		}else{
			var current=this.root;
			var parent;
			while(true){
				parent=current;
				if(newNode.value<current.value){
					current=current.left;
					if(current===null){
						parent.left=newNode;
						break;
					}
				}else{
					current=current.right;
					if(current===null){
						parent.right=newNode;
						break;
					}
				}
			}
		}
	}
	//前序遍历函数
	function preOrder(node){
		if(!(node==null)){
		orderList.push(node.show());
		preOrder(node.left);
		preOrder(node.right);
		}
	}
	//中序遍历函数
	function inOrder(node){
		if(!(node==null)){
		inOrder(node.left);
		orderList.push(node.show());
		inOrder(node.right);
		}
	}
	//前序遍历函数
	function postOrder(node){
		if(!(node==null)){
		postOrder(node.left);
		postOrder(node.right);
		orderList.push(node.show());
		}
	}
}
//遍历动画函数
function animation(arr) {
	var i=0,
	len=arr.length;
	changeBg();
	var clear=setInterval(changeBg,500);
	function changeBg(){
		for(var j=0;j<len;j++){
			arr[j].style.background="#fff";
		}
		if(i<arr.length){
			arr[i].style.background="red";
			i++;
		}else{
			alertText.innerHTML="";
			clearInterval(clear);
		}
	}
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	timeList=[],
	clickTime=new Date();
		if(target.nodeName==="BUTTON"){
			if(lastTime&&(clickTime.valueOf()-lastTime.valueOf())<7600){
				alertText.innerHTML="当前动画未结束，请稍后再试";
				return;
			}else{
				alertText.innerHTML="";
			orderList=[];
			var tree=new BST();
			for(var i=0;i<treeNodes.length;i++){
				tree.insert(treeNodes[i]);
			}
			lastTime=new Date();
			switch(target.className){
				case "preOrder":
					tree.preOrder(tree.root);
					animation(orderList);
					break;
				case "inOrder":
					tree.inOrder(tree.root);
					animation(orderList);
					break;
				case "postOrder":
					tree.postOrder(tree.root);
					animation(orderList);
					break;
			}
		}
	}
}
//给按钮绑定事件处理程序
function initButtonClick(){
	buttonArea.addEventListener("click",buttonClick,false);
}
//初始化函数
function init() {
	initButtonClick();
}
init();