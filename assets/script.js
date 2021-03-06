//Variable that stores cities searched
var cities="";
// variables declaration
var citySearch = $("#city-search");
var btnSearch = $("#btn-search");
var clearBtn = $("#clear-history");
var presentCity = $("#present-city");
var presentTemp = $("#temp");
var presentHumidity = $("#humidity");
var presentWindS = $("#wind-speed");
var presentUVI = $("#uv-index");
var cSearch=[];

function locate(c){
    for (var i=0; i<cSearch.length; i++){
        if(c.toUpperCase()===cSearch[i]){
            return -1;
        }
    }
    return 1;

    //API Key
    var APIKey="68cbf1341d19c8d9fe9386af25ae8a00";
    //Grab the city and display present and future weather forecast 
    function showWeather(event){
        event.preventDefault();
        if(citySearch.val().trim()!==""){
            city=citySearch.val().trim();
            presentWeather(city);
        }
    }
    // Call Weather Data with API
function presentWeather(city){
    
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cities + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"get",
    }).then(function(response){

        console.log(response);

        var weatherimg= response.weather[0].icon;
        var imgurl="https://openweathermap.org/img/wn/"+weatherimg +"@2x.png";
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(presentCity).html(response.name +"("+date+")" + "<img src="+imgurl+">");

        //Temperature in Fahrenheit
        var tempFahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
        $(presentTemp).html((tempFahrenheit).toFixed(2)+"&#8457");
        // Display Humidity
        $(presentHumidity).html(response.main.humidity+"%");
        //Display Wind Speed in MPH
        var windspeed=response.wind.speed;
        var windspeedmph=(ws*2.237).toFixed(1);
        $(presentWindS).html(windspeedmph+"MPH");
        //Display UV Index
        UVI(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            cSearch=JSON.parse(localStorage.getItem("cityname"));
            console.log(cSearch);
            if (cSearch==null){
                cSearch=[];
                cSearch.push(cities.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(cSearch));
                addToList(cities);
            }
            else {
                if(find(cities)>0){
                    cSearch.push(cities.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(cSearch));
                    addToList(cities);
                }
            }
        }

    });
}
function UVI(ln,lt){
    //UV Index URL
    var uviURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uviURL,
            method:"get"
            }).then(function(response){
                $(presentUVI).html(response.value);
            });
}
    // 5 days forecast for the present city
    function fivedayforecast(cityid){
        var daycomplete= false;
        var queryforecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
        $.ajax({
            url:queryforecastURL,
            method:"get"
        }).then(function(response){

            for (i=0;i<5;i++){
                var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                var icon= response.list[((i+1)*8)-1].weather[0].icon;
                var iconsite="https://openweathermap.org/img/wn/"+icon+".png";
                var tempK= response.list[((i+1)*8)-1].main.temp;
                var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
                var humidity= response.list[((i+1)*8)-1].main.humidity;
            }
        
        });
    }

    