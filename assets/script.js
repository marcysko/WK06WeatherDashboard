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
        $("#cityButton").append(checkCity);
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
        if (uvi < 3) {
          $(".uv-index").attr("id", "low");
        }
        if (uvi <= 6 && uvi >=3) {
          $(".uv-index").attr("id", "med");
        }
        if (uvi <= 9 && uvi >=6.01) {
          $(".uv-index").attr("id", "high");
        }
        if (uvi > 9) {
          $(".uv-index").attr("id", "v-high");
        }
      $(".uv-index").text(uvi)
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
    $("#day1").text(day[2].dt_txt.split(" ")[0])
    $("#day1Icon").html($("<img src=https://openweathermap.org/img/wn/" + day[2].weather[0].icon + ".png />"))
    $("#day1Temp").text("Temp: " + ((((day[2].main.temp) - 273.15) * (9 / 5) + 32).toFixed(1)) + "°F")
    $("#day1Humid").text("Humidity: " + day[2].main.humidity + "%")


  }



  )
}

    