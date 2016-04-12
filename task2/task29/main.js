var input=document.getElementById("input"),
      validate=document.getElementById("validate"),
      tip=document.getElementById("tip");

//验证输入函数
function checkInput(value){
	var len=0,//输入总长度
	      itemLen,//每个字符对应长度
	      valueList=[];//用来存放分割后输入值
	if(value==""){
		return "null";
	}else{
		valueList=value.split("");
		for(var i=0;i<valueList.length;i++){
			if(/[\u4e00-\u9fa5]/.test(valueList[i])){
				itemLen=2;
			}else{
				itemLen=1;
			}
			len+=itemLen;
		}
		if(len<4){
			return "tooShort";
		}else if(len>16){
			return "tooLong";
		}else{
			return "right";
		}
	}
}
//验证按钮点击事件处理程序
function buttonClick(){
	var value=input.value;
	var result=checkInput(value);
	input.className="";
	tip.className="";
	tip.innerHTML="必填，长度为4~16个字符";
	switch(result){
		case "null":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="姓名不能为空";
			break;
		case "tooShort":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="输入过短，字符数应为4~16位";
			break;
		case "tooLong":
			input.className="wrong-input";
			tip.className="wrong-tip";
			tip.innerHTML="输入过长，字符数应为4~16位";
			break;
		case "right":
			input.className="right-input";
			tip.className="right-tip";
			tip.innerHTML="名称格式正确";
			break;
	}
}
//给button绑定事件处理程序
function bindClickFunc(){
	validate.addEventListener("click",buttonClick,false);
}
//初始化事件
function init(){
	bindClickFunc();
}
init();
