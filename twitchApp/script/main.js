//渲染页面
function renderLive (live){
    var container = $("<div class='col-md-4'></div>"),
    channel = $("<div class='channel'></div>"),
    liveSRC = $("<a class='liv-source' target='_blank'></a>"),
    figure = $("<figure></figure>"),
    previewImg = $("<img class='preview-img'>"),
    liveHover = $("<div class='liv-hover'></div>"),
    figcaption = $("<figcaption class='liv-mes'></figcaption>"),
    hoverIcon = $("<i class='fa fa-play fa-3x hover-icon'></i>"),
    liveFace = $("<div class='liv-face'></div>"),
    liveTitle = $("<div class='liv-title'></div>"),
    liveInfo = $("<div class='liv-info'></div>"),
    liveStatus = $("<p class='liv-status'></p>"),
    faceImg = $("<img class='face-img'>"),
    user = $("<h3 class='user ellipsis'>"),
    liveTag = $("<span class='liv-tag ellipsis'></span>"),
    userIcon = $("<i class='fa fa-user'>"),
    tagIcon= $("<i class='fa fa-tag'></i>"),
    statusIcon = $("<i class='fa fa-circle'></i>");

    liveSRC.attr("href",live.url);
    previewImg.attr("src",live.previewImg);
    faceImg.attr("src",live.logo);
    liveTitle.text(live.status||"nothing  is here");
    liveTitle.attr("title",live.status||"nothing  is here");
    user.append(userIcon);
    userIcon.after(" "+live.name);
    user.attr("title",live.name);
    liveTag.append(tagIcon);
    tagIcon.after(" "+live.game||"unknow");
    liveTag.attr("title",live.game);
    if(live.isOnline) {
        statusIcon.addClass("online");
        container.addClass("onlineLiv");
        liveStatus.append(statusIcon);
        statusIcon.after(" Online");
    } else {
        statusIcon.addClass("offline");
        container.addClass("offlineLiv");
        liveStatus.append(statusIcon);
        statusIcon.after(" Offline");
    }
    liveInfo.append(user).append(liveTag);
    liveFace.append(faceImg);
    liveHover.append(hoverIcon);
    figcaption.append(liveFace).append(liveTitle).append(liveInfo).append(liveStatus);
    figure.append(previewImg).append(liveHover).append(figcaption);
    liveSRC.append(figure);
    channel.append(liveSRC);
    container.append(channel);
    if (live.isOnline){
        $(".channel_container").prepend(container);
    }else {
        $(".channel_container").append(container);
    }

}

$(document).ready(function () {
    var liveList =[];
    $.getJSON("https://api.twitch.tv/kraken/users/inkblotty/follows/channels?limit=20&callback=?",function (data) {
        var follows=data.follows;
        for(var i = 0; i < follows.length; i ++) {
            var liveItem = {"isOnline":false};
            liveItem.url = follows[i].channel.url;
            liveItem.logo = follows[i].channel.logo;
            liveItem.status = follows[i].channel.status;
            liveItem.name = follows[i].channel.name;
            liveItem.game = follows[i].channel.game;
            liveList.push(liveItem);
        }
        liveList.forEach(function(live){
        $.getJSON("https://api.twitch.tv/kraken/streams/" +
            live.name+"?callback=?",function (data) {
                if (data.stream) {
                    live.isOnline = true;
                    live.previewImg = data.stream.preview.medium;
                } else {
                    live.previewImg="http://img.qianduanmei.com/usr/uploads/2011/02/24/404pages29.jpg";
                }
                renderLive(live);
            });
        });
    });
    $(".allOption").click(function(){
        $(".col-md-4").css("display","block");
        $("nav>ul>li").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".onlineOption").click(function(){
        $(".offlineLiv").css("display","none");
        $(".onlineLiv").css("display","block");
        $("nav>ul>li").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".offlineOption").click(function(){
        $(".offlineLiv").css("display","block");
        $(".onlineLiv").css("display","none");
        $("nav>ul>li").removeClass("selected");
        $(this).addClass("selected");
    });
});