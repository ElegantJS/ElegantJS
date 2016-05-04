//创建日历构造函数
function CreateCalender(){
             this.defaultDate="2016/5/1";//设定日期的接口，指定具体日期
             this.dayArr=[];//创建数组，存放日期
             this.startDate=null;
             this.endDate=null;
             this.clickRange=[];
             this.isRange=false;
}
CreateCalender.prototype.initialize=function(choosenDate,dateRange,isRange){//初始化渲染页面
             this.defaultDate=choosenDate||this.defaultDate;
             this.startDate=dateRange.startDate;
             this.endDate=dateRange.endDate;
             this.isRange=isRange;
             var  today=new Date(this.defaultDate);
             this.drawCalendar(today.getFullYear(),today.getMonth()+1,today.getDate());
             return calendar;
};
CreateCalender.prototype.dayArray=function(year,month){//创建存放日期的函数
              var firstDay=new Date(year,month-1,1).getDay(),//求出当月第一天是星期几
              days=new Date(year,month,0).getDate(),//求出当月天数，下个月第零天就是当月最后一天
               arr=new Array(42);
              for(var i=0;i<days;i++,firstDay++){
                    arr[firstDay]=year+"/"+month+"/"+(i+1);
             }
            return arr;
};
    //绘制日历内容函数
CreateCalender.prototype.drawCalendar=function(year,month,date,startDate,endDate){
            var weeks="日一二三四五六".split(""),
                  fragment=document.createDocumentFragment(),
                  calendar=document.createElement("div"),
                  body=document.getElementsByTagName("body")[0],
                  _calendar=document.getElementById("calendar"),
                  a=document.createElement("a"),
                  bt=document.createElement("b"),
                  span=document.createElement("span"),
                  button=document.createElement("button"),
                  bts=[];
            this.dayArr=this.dayArray(year,month);
            if(_calendar){//如果已存在calendar，删除之后再重新渲染
                           _calendar.parentNode.removeChild(_calendar);
            }
                           calendar.style.display="none";
                           body.insertBefore(calendar,null);//将calender插入DOM中
                           calendar.setAttribute("id","calendar");//给calender设置id
            //生成四个改变月份和年份的按钮
            for(var i=0;i<4;i++){
                          var newA=bt.cloneNode(true),
                         self=this;
                          newA.addEventListener("click",(function(index){
                                        return function(){
                                                   self.redrawCalendar(year,month,date,index);
                                                   self.clickRange=[];
                                         };
                           })(i),false);
                          if(i==2) {
                                         span.appendChild(document.createTextNode(year+"年"+month+"月"));
                           }
                          span.appendChild(newA);
                          newA.className="btn";
                          bts[i]=newA;//保存按钮的引用
                          }
            bts[0].innerHTML = '<<';
            bts[1].innerHTML = '<';
            bts[2].innerHTML = '>';
            bts[3].innerHTML = '>>';
            fragment.appendChild(span);
            //创建星期显示区
            for(var j=0;j<7;j++){
                    var weekItem=a.cloneNode(true);
                    weekItem.innerHTML=weeks[j];
                    weekItem.className="week";
                    fragment.appendChild(weekItem);
             }
            //创建日期显示区
            for(var k=0;k<this.dayArr.length;k++){
                           var dayItem=a.cloneNode(true);
                            if(this.dayArr[k]===undefined){
                            fragment.appendChild(dayItem);
                            }else{
                                    dayItem.innerHTML=this.dayArr[k].split("/")[2];//获取要显示的具体日期
                                    dayItem.className="day";
                                    var newDay=Date.parse(new Date(this.dayArr[k]));
                                    //判断是否超过给定时间区间
                                    if(newDay<Date.parse(new Date(this.startDate))||newDay>Date.parse(new Date(this.endDate))){
                                        dayItem.className+=" exceed";
                                    }
                                    //判断是否是周末
                                    if(k%7===0||k%7===6){
                                            dayItem.className+=" weekend";
                                    }
                                    fragment.appendChild(dayItem);
                            }
            }
            //创建按钮区域
            for(var s=0;s<2;s++){
            		var buttonItem=button.cloneNode(true);
            		if(s==0){
            			buttonItem.className="button confirm";
            			buttonItem.innerHTML="确认";
            		}else{
            			buttonItem.className="button cancel";
            			buttonItem.innerHTML="取消";
            		}
            		fragment.appendChild(buttonItem);
            }
            calendar.appendChild(fragment);
                //为日历元素添加点击事件处理程序
            calendar.addEventListener("click",function(){
            		var clickDate,
            		       elements=document.getElementsByClassName("day");
            		if(self.isRange){
            			clickDate=self.getDateRange(self);
            			if(clickDate){
            				for(var j=0;j<elements.length;j++){
            					elements[j].className=elements[j].className.replace(/choosenArea/,"");
            				}
            				if(elements[clickDate[0][0]].className.indexOf("choosen")==-1){
            					elements[clickDate[0][0]].className+=" choosen";
            				}
            				if(elements[clickDate[0][1]]&&elements[clickDate[0][1]].className.indexOf("choosen")==-1){
            					elements[clickDate[0][1]].className+=" choosen";
            				}
            				if(elements[clickDate[1]]){
            					elements[clickDate[1]].className=elements[clickDate[1]].className.replace(/choosen/,"");
            				}
            				for(var i=Math.min.apply(Math,clickDate[0])+1;i<Math.max.apply(Math,clickDate[0]);i++){
            					elements[i].className+=" choosenArea";
            				}
            			}
            		}else{
            			clickDate=self.getDate(self);
            			if(clickDate){
            				for(var j=0;j<elements.length;j++){
            					elements[j].className=elements[j].className.replace(/choosen/,"");
            				}
            				if(elements[clickDate].className.indexOf("choosen")==-1){
            					elements[clickDate].className+=" choosen";
            				}
            			}
            		}
            	},false);
            	//给按钮添加点击事件处理程序
           calendar.addEventListener("click",function(){
            		var target=event.target,
            		      _calendar=document.getElementById("calendar"),
            		      days=document.getElementsByClassName("choosen");
            		      startDay=[].indexOf.call([].slice.call(document.getElementsByTagName("a"),7),days[0]);
            		      endDay=[].indexOf.call([].slice.call(document.getElementsByTagName("a"),7),days[1]);
            		if(target.className.indexOf("button")>-1){
            			if(target.className.indexOf("confirm")>-1){
            				if(endDay>-1){
            					if(self.checkDateRange(startDay,endDay)!=0){
            						return;
            					}
            					self.clickRange=[];
            					data.showInput.value=self.dayArr[startDay]+"-"+self.dayArr[endDay];
            				}else{
            					data.showInput.value=self.dayArr[startDay];
            				}
            				document.body.removeChild(_calendar);
            			}else if(target.className.indexOf("cancel")>-1){
            				document.body.removeChild(_calendar);
            			}
            		}
            	},false);
};
CreateCalender.prototype.getDate=function(self){
                     var target=event.target,
                            day=[].indexOf.call(document.getElementsByClassName("day"),target);
                     if(target.className.indexOf("day")>-1&&target.className.indexOf("exceed")==-1){
                             return day;
                     }
};
CreateCalender.prototype.getDateRange=function(self){
                     var  remove,
                            target=event.target,
                            _calendar=document.getElementById("calendar"),
                            day=[].indexOf.call(document.getElementsByClassName("day"),target);
                     if(target.className.indexOf("day")>-1&&target.className.indexOf("exceed")==-1){
                     	self.clickRange.push(day);
                            if(self.clickRange.length>2){
                            	remove=self.clickRange.shift();
                            }
                            return [self.clickRange,remove];
                     }
};
//检查日期区间是否允许
CreateCalender.prototype.checkDateRange=function(startDate,endDate){
	if(endDate-startDate>data.allowMaxLength){
		alert("最大日期区间为"+data.allowMaxLength+"天，超过允许日期区间");
		return 1;
	}else if(endDate-startDate<data.allowMinLength){
		alert("最小日期区间为"+data.allowMinLength+"天，低于允许日期区间");
		return 1;
	}else{
		return 0;
	}
};
 //点击按钮重新绘制日历内容
CreateCalender.prototype.redrawCalendar=function(year,month,date,index){
             switch(index){
             case 0 ://preyear
                           year--;
                           break;
             case 1://premonth
                          month--;
                          if(month < 1){
                                    year--;
                                    month = 12;
                           }
                        break;
             case 2://nextmonth
                          month++;
                           if(month > 12){
                                    year++;
                                    month = 1;
                           }
                          break;
             case 3://nextyear
                        year++;
                        break;
        }
            this.drawCalendar(year,month,date);
            document.getElementById("calendar").style.display="block";
};