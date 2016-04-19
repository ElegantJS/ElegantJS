var elements={
	orderList:[],//用来保存遍历后节点
      	treeList:[],//保存有效div节点
      	lastTime:undefined,//记录上次点击按钮时间
      	refresh:undefined,//重置动画
      	container:document.getElementById("container"),
      	firstLevel:document.getElementById("first-level"),
      	buttonArea:document.getElementById("button-area"),
      	addInput:document.getElementById("add"),
      	searchInput:document.getElementById("search"),
      	alertText:document.getElementById("alert"),
      	index:0
	};
//给div元素设置class
function setClass(node){
	for(var i=0;i<node.children.length;i++){
		node.children[i].className=elements.index;
		elements.treeList.push(node.children[i]);
		elements.index++;
	}
	for(var j=0;j<node.children.length;j++){
		if(node.children[j].children){
			setClass(node.children[j]);
		}
	}
}
//渲染页面div函数
function renderDiv(){
	elements.index=0;
	elements.treeList=[];
	setClass(elements.container);
}
//多叉树生成构造函数
function Graph(v){
	this.vertices=v;
	this.edges=0;
	this.adj=[];
	this.marked=[];
	for(var i=0;i<this.vertices;++i){
		this.adj[i]=[];
		this.adj.push("");
		this.marked[i]=false;
	}
	this.addEdge=addEdge;
	this.dfs=dfs;
	this.bfs=bfs;

	function addEdge(v,w){
		this.adj[v].push(w);
		this.adj[w].push(v);
		this.edges++;
	}
	function dfs(v){
		this.marked[v]=true;
		if(this.adj[v]!=undefined){
			orderList.push(v);
		}
		for(var w=0; w<this.adj[v].length;w++){
			if(!this.marked[this.adj[v][w]]){
				this.dfs(this.adj[v][w]);
			}
		}
	}
	function bfs(s){
		var queue=[];
		this.marked[s]=true;
		queue.push(s);
		while(queue.length>0){
			var v=queue.shift();
			if(!(v==undefined)){
				orderList.push(v);
			}
			for(var w=0;w<this.adj[v].length;w++){
				if(!this.marked[this.adj[v][w]]){
					this.marked[this.adj[v][w]]=true;
					queue.push(this.adj[v][w]);
				}
			}
		}
	}
}
//多叉树节点绑定函数
function addEdgeFunc(node,graph){
	var len=node.children.length
	for(var i = 0; i < len; i++){
		graph.addEdge(parseInt(node.className),parseInt(node.children[i].className));
		if(node.children[i].children){
			addEdgeFunc(node.children[i],graph);
		}
	}
}
//生成多叉树
function createGraph(){
	var graph=new Graph(elements.treeList.length),
	      firstLevel=elements.firstLevel;
	addEdgeFunc(firstLevel,graph);
	return graph;
}
//遍历动画函数
function animation(arr,stop) {
	var i=0,
	treeList=elements.treeList,
	len=arr.length;
	changeBg();
	var clear=setInterval(changeBg,600);
	refresh=clear;
	function changeBg(){
		elements.index=0;
		elements.treeList=[];
		setClass(elements.container);
		if(i<arr.length){
			treeList[arr[i]].className+=" choosen";
			if(treeList[arr[i]].firstChild.nodeValue.trim()==stop){
				alert("已找到您要搜寻的内容");
				clearInterval(clear);
				return;
			}
			i++;
		}else{
			if(stop){
				alert("未找到您输入的内容");
			}
			clearInterval(clear);
		}
	}
}
//按钮点击事件处理程序
function buttonClick(){
	var target=event.target,
	graph=createGraph();
		if(target.nodeName==="BUTTON"){
			clearInterval(elements.refresh);
			orderList=[];
			lastTime=new Date();
			switch(target.className){
			case "bfsBtn":
				graph.bfs(0);
				animation(orderList);
				break;
			case "dfsBtn":
				graph.dfs(0);
				animation(orderList);
				break;
			case "searchBtn":
				renderDiv();
				graph.dfs(0);
				var searchContent=elements.searchInput.value;
				animation(orderList,searchContent);
				break;
			case "addBtn":
				var addValue=elements.addInput.value,
				      addParent=document.querySelector(".choosen");
				if (!addParent){
					alert("请选择被插入的节点");
				}else if (addValue===""){
					alert("请输入要插入的内容");
				}else {
					var newDiv=document.createElement("div");
					newDiv.innerHTML=addValue;
					addParent.appendChild(newDiv);
					renderDiv();
					elements.addInput.value="";
				}
				break;
			case "delBtn":
				var delElement=document.querySelector(".choosen");
				if(!delElement){
					alert("请先选择要删除的节点");
				}else{
					delElement.parentNode.removeChild(delElement);
					renderDiv();
				}
				break;
			}
		}
}
//div元素点击事件处理程序
function divClick(){
	renderDiv();
	var target=event.target;
	if(target.className){
		target.className+=" choosen";
	}
}
//初始化函数
function init() {
	setClass(elements.container);
	//给按钮绑定事件处理程序
	elements.buttonArea.addEventListener("click",buttonClick,false);
	//给div元素绑定事件处理程序
	elements.container.addEventListener("click",divClick,false);
}
init();