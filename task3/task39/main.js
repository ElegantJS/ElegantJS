(function(){
	var freezLine=document.getElementById("freezLine"),
	      table=document.getElementById("table");

	//滚动事件处理函数
	function scrollFunc(){
		if(document.body.scrollTop<=100){
			table.className="";
			freezLine.className="";
		}else if(document.body.scrollTop<1180){
			freezLine.className="freezLine";
			table.className="freezing";
		}else{
			freezLine.className="";
			table.className="freezing";
		}
	}
	window.addEventListener("scroll",scrollFunc,false);
})();