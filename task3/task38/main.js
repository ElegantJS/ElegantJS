(function(){
	//更新表头函数
	var createTabTitle=function(id,tabTitle){
		var newTr=document.createElement("tr");
		for(var i=0;i<tabTitle["list"].length;i++){
			var newTh=document.createElement("th");
			newTh.innerHTML=tabTitle["list"][i].title;
			if(tabTitle["list"][i].sortable){
				var newUp=document.createElement("span"),
				      newDown=document.createElement("span");
				newUp.className="up";
				newDown.className="down";
				(function(){
					var j=i;
					newUp.addEventListener("click",function(){
						clearTable(id);
						sortTable(id,data,tableTitle,tabTitle["list"][j]["name"],"up");
					},false);
					newDown.addEventListener("click",function(){
						clearTable(id);
						sortTable(id,data,tableTitle,tabTitle["list"][j]["name"],"down");
					},false);
					newTh.appendChild(newUp);
					newTh.appendChild(newDown);
				})();
			}
			newTr.appendChild(newTh);
		}
		id.appendChild(newTr);
	};
	//更新表格内容
	var createTabContent=function(id,data){
		for(var i=0;i<data.length;i++){
			var newTr=document.createElement("tr");
			for(key in data[i]){
				if(data[i].hasOwnProperty(key)){
					var newTd=document.createElement("td");
					newTd.innerHTML=data[i][key];
					newTr.appendChild(newTd);
				}
			}
			id.appendChild(newTr);
		}
	};
	//清空table函数
	function clearTable(id){
		while(id.children.length>0){
			id.removeChild(id.children[0]);
		}
	}
	//重新对data排序
	var sortTable=function(id,data,tabTitle,name,drec){
		data.sort(function(obj1,obj2){
				return obj1[name]-obj2[name];
			});
		if(drec=="down"){
			data=data.reverse();
		}
		createTabTitle(id,tabTitle);
		createTabContent(id,data);
	};
	//将创建table函数绑定到全局变量中
	window.createTable=function(id,tableTitle,data){
		createTabTitle(id,tableTitle);
		createTabContent(id,data);
	};
})();