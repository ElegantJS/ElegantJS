var clearAnimate;
//动画函数
 function runAnimate(time) {
    if (time>=0) {
        var min = Math.floor(time/60),
              second = time%60<10?"0"+time%60:time%60;
        $(".minutes").text(min);
        $(".seconds").text(second);
        time = time -1;
        clearAnimate = setTimeout(function() {
            runAnimate(time);
        },1000);
    } else {
        $(".animate").height(0);
        if($(".pomodoro").hasClass("break")){
            $(".pomodoro").removeClass("running").addClass("pause");
            alert("休息时间结束，点击开始番茄");
            $(".minutes").text($(".mission-length .num").text());
            $(".tips").text("点击开始番茄");
        } else {
            alert("番茄时间结束");
            $(".minutes").text($(".break-length .num").text());
            $(".tips").text("点击取消休息");
            time = parseInt($(".minutes").text())*60;
            $(".animate").animate({"height":parseInt($(".animate-area").height())},time*1000,"linear");
            clearAnimate = setTimeout (function() {
                 runAnimate(time);
            },1000);
        }
        $(".pomodoro").toggleClass("break").toggleClass("mission");
        $(".animate").toggleClass("breakAm").toggleClass("missionAm");
    }
}

$(document).ready(function () {
    $('body').bind("selectstart", function () { return false; });
    //点击+/-按钮事件
    $(".button").click(function () {
        var numNode,
            length;
        if ($(".pomodoro").hasClass("pause")){
            if ($(this).hasClass("add")){
                numNode =$(this).prev();
                length = parseInt(numNode.text());
                if (length < 30) {
                    numNode.text(length + 1);
                    if (($(this).hasClass("mission-add")&&$(".mission").length>0)||
                        ($(this).hasClass("break-add")&&$(".break").length>0)){
                        $(".minutes").text(length + 1);
                    }
                }
            } else {
                numNode = $(this).next();
                length = parseInt(numNode.text());
                if (length > 1){
                    numNode.text(length - 1);
                    if (($(this).hasClass("mission-minus")&&$(".mission").length>0)||
                        ($(this).hasClass("break-minus")&&$(".break").length>0)){
                        $(".minutes").text(length - 1);
                    }
                }
            }
        }
    });
    //点击番茄
    $(".pomodoro").click(function () {
        var isCancel ;
        if($(this).hasClass("running")) {
            $(this).addClass("pause").removeClass("running");
            if($(this).hasClass("mission")){
                isCancel = confirm("是否取消番茄？");
            } else {
                isCancel = confirm("是否取消休息");
            }
            if (isCancel) {
                clearTimeout(clearAnimate);
                $(this).addClass("mission").removeClass("break");
                $(".animate").stop().addClass("missionAm").removeClass("breakAm").height(0);
                $(".minutes").text($(".mission-length .num").text());
                $(".seconds").text("00");
                $(".tips").text("点击开始番茄");
            }
        } else {
            $(".tips").text("点击取消番茄");
            var time = parseInt($(".minutes").text())*60;
            $(".animate").animate({"height":parseInt($(".animate-area").height())},time*1000,"linear");
            $(this).toggleClass("running").toggleClass("pause");
            runAnimate(time);
        }
    });
});