var orderList=[],//用来保存遍历后节点
      treeList=[],//保存有效div节点
      lastTime,//记录上次点击按钮时间
      refresh,//重置动画
      treeNodes=document.getElementsByTagName("div"),
      buttonArea=document.getElementById("button-area"),
      alertText=document.getElementById("alert");
//消除chrome中自动出现的shadow root对treeNodes的影响并对treeList排序
for (var i =0; i<treeNodes.length; i++) {
	if(!(treeNodes[i].className=="")){
		treeList.push(treeNodes[i]);
	}
}
treeList.sort(function(item1,item2){
	return (Number(item1.className)-Number(item2.className));
});

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
//生成多叉树
function createGraph(){
	var graph=new Graph(treeList.length);
	graph.addEdge(0,1);
	graph.addEdge(0,2);
	graph.addEdge(0,3);
	graph.addEdge(1,4);
	graph.addEdge(1,5);
	graph.addEdge(1,6);
	graph.addEdge(1,7);
	graph.addEdge(1,8);
	graph.addEdge(1,9);
	graph.addEdge(2,10);
	graph.addEdge(2,11);
	graph.addEdge(10,12);
	graph.addEdge(10,13);
	graph.addEdge(10,14);
	graph.addEdge(11,15);
	graph.addEdge(11,16);
	graph.addEdge(15,17);
	return graph;
}
//遍历动画函数
function animation(arr,stop) {
	var i=0,
	len=arr.length;
	changeBg();
	var clear=setInterval(changeBg,600);
	refresh=clear;
	function changeBg(){
		for(var j=0;j<len;j++){
			treeList[arr[j]].style.background="#fff";
		}
		if(i<arr.length){
			treeList[arr[i]].style.background="red";
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
			clearInterval(refresh);
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
					graph.dfs(0);
					var searchContent=document.getElementById("search").value;
					animation(orderList,searchContent);
					break;
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