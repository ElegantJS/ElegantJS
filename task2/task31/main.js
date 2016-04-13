//获取所需要的html元素
var elements=(function(){
	return {
		form:document.getElementById("form"),
		underGraduateForm:document.getElementById("undergraduate-form"),
		graduateForm:document.getElementById("graduate-form"),
		school:document.getElementById("school"),
		city:document.getElementById("city")
	};
})();
//更新学校选项函数
function updateSchool(city){
	var beiJingSchool=["北京大学","清华大学","北京师范大学","北京工业大学"],
	      nanJingSchool=["南京大学","东南大学","南京师范大学","南京工业大学","南京邮电大学"],
	      shangHaiSchool=["上海大学","复旦大学","上海理工大学","华东师范大学"],
	      len=elements.school.children.length;
	      for(var i=0;i<len;i++){
	      	elements.school.removeChild(elements.school.children[0]);
	      }
	switch(city){
		case "北京":
			 createOption(beiJingSchool);
			 break;
		case "南京":
			createOption(nanJingSchool);
			 break;
		case "上海":
			createOption(shangHaiSchool);
			 break;
	}
	function createOption(arr){
		var fragment=document.createDocumentFragment(),
		      newOption;
		for(var i=0;i<arr.length;i++){
			newOption=document.createElement("option");
			newOption.innerHTML=arr[i];
			fragment.appendChild(newOption);
		}
		elements.school.appendChild(fragment);
	}
}
//radio点击事件处理程序
function radioClick(){
	var target=event.target,
	      student;
	if(target.nodeName=="INPUT"){
		if(target.checked){
			student=target.id;
		}
	}
	switch(student){
		case "undergraduate":
			elements.graduateForm.style.display="none";
			elements.underGraduateForm.style.display="block";
			break;
		case "graduate":
			elements.graduateForm.style.display="block";
			elements.underGraduateForm.style.display="none";
			break;
	}
}
//select元素change事件处理程序
 function selectChange(){
 	var city=event.target.value;
 	updateSchool(city);
 }
//给表单绑定点击事件处理程序
function bindClickFun(){
	elements.form.addEventListener("click",radioClick,false);
}
//给select元素绑定change事件处理程序
function bindChangeFun(){
	elements.city.addEventListener("change",selectChange,false);
}
//初试话函数
function init(){
	bindClickFun();
	bindChangeFun();
	updateSchool("北京");
}
init();