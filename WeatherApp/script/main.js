// 百度地图API功能
    var map = new BMap.Map("map");    // 创建Map实例

    //载入地图函数
    function loadMap (lat,lon) {
      lat = lat||59.915;
      lon = lon ||116.404;
      var ggPoint = new BMap.Point(lon, lat);
      //将google地图中的经纬度转化为百度地图的经纬度
      BMap.Convertor.translate(ggPoint, 2, function(point){
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            map.centerAndZoom(point, 13);
            $(".BMap_noprint").remove();
            $(".anchorBL").remove();
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs){
              var addComp = rs.addressComponents;
              //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
              });
            });
      //map.centerAndZoom(new BMap.Point(lon, lat), 11);  // 初始化地图,设置中心点坐标和地图级别
      //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
      //逆地址解析
      map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.setMapStyle({//去除道路
            styleJson:[
                  {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": {
                                "color": "#ffffff",
                                "visibility": "off"
                          }
                  }
            ]
      });
  }

  //更新天气函数
   function updateWeather (data) {
      $(".currentWeather .city").text(data.today.city);
      $(".currentWeather .weatherImg").attr("src","images/"+data.today.weather_id.fa+".png");
      $(".currentWeather .curTemperature .temp").text(data.sk.temp);
      $(".currentWeather .ltlText").text(data.today.weather);
      $(".currentWeather .ltlTime").text(data.sk.time);
      $(".weatherInfo .visibility").text((Math.random()*2+6).toFixed(1));
      $(".weatherInfo .dressing_index").text(data.today.dressing_index);
      $(".weatherInfo .uv_index").text(data.today.uv_index);
      $(".weatherInfo .wind_strength").text(data.sk.wind_strength);
      $(".weatherInfo .humidity").text(data.sk.humidity);
      $(".weatherInfo .exercise_index").text(data.today.exercise_index);
      for (var i = 0 ; i < 3; i++) {
        var date = data.future[i+1].date,
              week = data.future[i+1].week;
        $($(".forecastWeather .forecastDay")[i]).text(date.slice(5,6)+"/"+date.slice(6)+" "+week);
        $($(".forecastWeather .weatherIcon")[i]).attr("src","images/"+data.future[i+1].weather_id.fa+".png");
        $($(".forecastWeather .forecastText")[i]).text(data.future[i+1].weather);
        $($(".forecastWeather .forecastTemp")[i]).text(data.future[i+1].temperature);
      }
     }

     function geo_error (err) {
        switch (err.code) {
          case 1:
                alert("用户拒绝请求位置信息");
                break;
          case 2:
                alert("您的位置信息不可用");
                break;
          case 3:
                alert("位置信息请求超时");
                break;
          default:
                alert("未知错误");
        }
      }

      function geo_success (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
         loadMap (latitude,longitude);
         $.getJSON("http://v.juhe.cn/weather/geo?format=2&key=5320e2c3ed6ca34147539f5030a3356c&lon="+longitude+"&lat="+latitude,
          function (data) {
            if(data && data.resultcode =="200") {
              updateWeather(data.result);
            }
          });
      }

$(document).ready(function () {
      //定位当前经纬度
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geo_success,geo_error);
      } else {
          alert("当前浏览器不支持定位，请手动选择您的城市");
      }
      $("#weatherBoard .currentWeather .btn").click(function() {
        var newCity = $("#weatherBoard .currentWeather .search").val();
          map.centerAndZoom(newCity,10);
          $.getJSON("http://v.juhe.cn/weather/index?format=2&cityname="+encodeURIComponent(newCity)+"&key=5320e2c3ed6ca34147539f5030a3356c",
          function (data) {
            if(data && data.resultcode =="200") {
              updateWeather(data.result);
            } else {
              alert("请输入有效城市名");
            }
          });
          $("#weatherBoard .currentWeather .search").val("");
      });
});