var data={
            //配置可选日期的上下限
            dateRange: {startDate:"1990/1/1",
            		     endDate:"2016/9/30"},
            showInput:document.getElementById("showDate"),
            choosenDate:"2016/05/01",
            isRange:true,
            allowMinLength:3,
            allowMaxLength:20
};
var createCalender=new CreateCalender();
//为showDate输入框添加点击事件处理程序
data.showInput.addEventListener("click",function(){
       var _calendar=document.getElementById("calendar");
       if(_calendar){
            document.body.removeChild(_calendar);
       }else{
          var calendar=createCalender.initialize(data.choosenDate,data.dateRange,data.isRange);
          calendar.style.display="block";

       }
},false);
