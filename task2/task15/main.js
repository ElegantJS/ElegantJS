var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(cityInput,valueInput) {
	      aqiData[cityInput]=parseInt(valueInput);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table"),
	      len=Object.keys(aqiData).length,
	      newTr=document.createElement("tr"),
	      newCity=Object.keys(aqiData)[len-1];
	      newTr.innerHTML="<td>"+newCity+"</td>"+"<td>"+aqiData[newCity]+"</td>"
	      +"<td><button class='del-btn'>删除</button></td>";
	table.firstElementChild.appendChild(newTr);
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var cityInput=document.getElementById("aqi-city-input").value.trim(),
	      valueInput=document.getElementById("aqi-value-input").value.trim(),
	      cityAlert=document.getElementById("city-alert"),
	      valueAlert=document.getElementById("value-alert");
	if(/[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]+/.test(cityInput)&&/^[0-9]*[1-9][0-9]*$/.test(valueInput)){//此条件判断城市名和空气值均输入正确
		if(cityInput in aqiData){
			cityAlert.innerHTML="您输入的城市已存在,请重新输入!";
		} else{
			cityAlert.innerHTML="";
  			valueAlert.innerHTML="";
 			addAqiData(cityInput,valueInput);
  			renderAqiList();
  			document.getElementById("aqi-city-input").value="";
  			document.getElementById("aqi-value-input").value="";
		}
  	} else if(!(/[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]+/.test(cityInput))&&!(/^[0-9]*[1-9][0-9]*$/.test(valueInput))){//此条件判断城市名和空气值均输入错误
  		cityAlert.innerHTML="您输入的城市名有误,请输入中文或者英文字母!";
  		valueAlert.innerHTML="你输入的空气质量值有误,请输入3位以内正整数!";
  	} else if(!(/[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]+/.test(cityInput))){//此条件判断城市名输入错误
  		cityAlert.innerHTML="您输入的城市名有误,请输入中文或者英文字母!";
  		valueAlert.innerHTML="";
  	}  else if(!(/^[0-9]*[1-9][0-9]*$/.test(valueInput))){//此条件判断空气值均输入错误
  		cityAlert.innerHTML="";
  		valueAlert.innerHTML="你输入的空气质量值有误,请输入3位以内正整数!";
  	}
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  	var delCity=target.parentNode.parentNode.children[0].innerHTML;
  	var delTr=target.parentNode.parentNode;
  	delete aqiData[delCity];
  	delTr.parentNode.removeChild(delTr);
}
function init() {
	var addBtn=document.getElementById("add-btn"),
	      aqiTable=document.getElementById("aqi-table");
	addBtn.onclick=addBtnHandle;
	aqiTable.onclick=function(){
		target=event.target;
		if(target.className==="del-btn"){
			delBtnHandle(target);
		}
	}

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();