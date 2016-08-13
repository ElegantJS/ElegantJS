$(document).ready(function () {
    $(".button").click(function (){
        var calText=$(".display").text(),
              result,
              isWrong = false;
        if($(this).hasClass( "clear-button")){
            $(".display").text("");
            $(".result").text("0");
        } else if ($(this).hasClass( "del-button")) {
            $(".display").text(calText.replace(/.$/,""));
        } else if ($(this).hasClass( "equal-button")) {
                calText = calText.replace(/[×]/g,"*");
                calText = calText.replace(/[÷]/g,"/");
                try {
                    result = eval(calText);
                } catch(error){
                    result="error";
                    isWrong = true;
                }
                if (!isWrong){
                    result = eval(calText);
                    result = (result.toFixed(6)+"").replace(/\.?0+$/,"");
                }
                $(".result").text(result||"error");
                $(".display").text("");
        } else {
            $(".display").text(calText+$(this).text());
        }
    });
});