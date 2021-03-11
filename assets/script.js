//variable to store the searched city
var cities = JSON.parse(localStorage.getItem("saveCity")) || [];
// variable declarations
var sCity = cities[0] || "Denver";
var pdate = moment().format('MM-DD-YYYY');
var day0 = moment().add(0, 'days').calendar();
var day1 = moment().add(1, 'days').calendar();
var day2 = moment().add(2, 'days').calendar();
var day3 = moment().add(3, 'days').calendar();
var day4 = moment().add(4, 'days').calendar();
var futforecast;
var latitude;
var uvi = 0;
var weatherIcon;

// Display the present and future weather
function showWeather() {
giveCity()
preForecast()
futureFore()       
}
showWeather()

//when city entered, adds to list of searched cities
$("#search-button").on("click", function (event) {
  event.preventDefault()
  sCity = $("#searchCity").val().trim()
  if (sCity !== "")      {
  cities.push(sCity);
  $("#searchCity").val("");
    showWeather(sCity)      

  }      
})

// Displaying cities on the left column
function giveCity() {
for (var i = 0; i < cities.length; i++) {
        var checkCity = $("<button>");
        checkCity.addClass("btn btn-block checkCity");
        checkCity.attr("id", "cBtn");
        checkCity.attr("city-name", cities[i]);
        checkCity.text(cities[i]);
        $("#cityBtn").append(checkCity);
        savCities();
      }
    }
// save in local storage

    function savCities() {
            localStorage.setItem("saveCity", JSON.stringify(cities));
    }

    // Displays weather and forecast for present city
    $(document).on("click", "#cBtn", function () {
      sCity = $(this).text()
      preForecast()
      futureFore()
    })
    
  
    //Set up the API, create an AJAX call
    function preForecast() {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + sCity + '&APPID=68cbf1341d19c8d9fe9386af25ae8a00',
        method: "GET"
      }).then(function (response) {
        forecast = response  
    weatherIcon = $("<img src=https://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png />")
    $("#present-city").text(sCity + " - " + pdate)
    $("#present-city").append(weatherIcon)
    // add text for temp, humidity, and wind speed
    $("#temperature").text("Temperature: " + ((((forecast.main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#humidity").text("Humidity: " + forecast.main.humidity + "%")
    $("#wind-speed").text("Wind Speed: " + (forecast.wind.speed) + " MPH")
    // assign latitude and longitude for api call to get UV information
    lat = forecast.coord.lat
    long = forecast.coord.lon
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/uvi?appid=68cbf1341d19c8d9fe9386af25ae8a00&lat=' + lat + '&lon=' + long,
      method: "GET"
    }).then(function (response) {
      uvi = response.value
        if (uvi < 2.0) {
          $(".uviButton").attr("id", "fav");
        }
        if (uvi <= 5.0 && uvi >=2.01) {
          $(".uviButton").attr("id", "mod");
        }
        if (uvi <= 6.9 && uvi >=5.9) {
          $(".uviButton").attr("id", "high");
        }
        if (uvi <= 10.9 && uvi >=7.01) {
          $(".uviButton").attr("id", "vHigh");
        }
        if (uvi > 11) {
          $(".uviButton").attr("id", "severe");
        }
      $(".uviButton").text(uvi)
    })
  })
};

// Display 5 Day forecast data
function futureFore() {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + sCity + '&APPID=68cbf1341d19c8d9fe9386af25ae8a00',
    method: "GET"
  }).then(function (response) {
    var day = response.list
    $("#nday0").text(day[2].dt_txt.split(" ")[0])
    $("#nday0I").html($("<img src=https://openweathermap.org/img/wn/" + day[2].weather[0].icon + ".png />"))
    $("#nday0T").text("Temp: " + ((((day[2].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#nday0H").text("Humidity: " + day[2].main.humidity + "%")

    $("#nday1").text(day[10].dt_txt.split(" ")[0])
    $("#nday1I").html($("<img src=https://openweathermap.org/img/wn/" + day[10].weather[0].icon + ".png />"))
    $("#nday1T").text("Temp: " + ((((day[10].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#nday1H").text("Humidity: " + day[10].main.humidity + "%")

    $("#nday2").text(day[18].dt_txt.split(" ")[0])
    $("#nday2I").html($("<img src=https://openweathermap.org/img/wn/" + day[18].weather[0].icon + ".png />"))
    $("#nday2T").text("Temp: " + ((((day[18].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#nday2H").text("Humidity: " + day[18].main.humidity + "%")

    $("#nday3").text(day[26].dt_txt.split(" ")[0])
    $("#nday3I").html($("<img src=https://openweathermap.org/img/wn/" + day[26].weather[0].icon + ".png />"))
    $("#nday3T").text("Temp: " + ((((day[26].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#nday3H").text("Humidity: " + day[26].main.humidity + "%")

    $("#nday4").text(day[34].dt_txt.split(" ")[0])
    $("#nday4I").html($("<img src=https://openweathermap.org/img/wn/" + day[34].weather[0].icon + ".png />"))
    $("#nday4T").text("Temp: " + ((((day[34].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#nday4H").text("Humidity: " + day[34].main.humidity + "%")
  }
  )
}

    