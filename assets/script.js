//Declare variables for city searches
var cities = JSON.parse(localStorage.getItem("saveCity")) || [];
var sCity = city[0] || "Paris";
var pdate = moment().format('MM-DD-YYYY');
var day0 = moment().add(0, 'days').calendar();
var day1 = moment().add(1, 'days').calendar();
var day2 = moment().add(2, 'days').calendar();
var day3 = moment().add(3, 'days').calendar();
var day4 = moment().add(4, 'days').calendar();
var futforecast;
var latitude;
var uvi = 0;
var weathericon;

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

// Here we create the AJAX call

// Here we build the URL so we can get a data from server side.

// parse the response to display the current weather including the City name. the Date and the weather icon. 

//Data object from server side Api for icon property.

// The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

//parse the response for name of city and concanatig the date and icon.

// parse the response to display the current temperature.
        // Convert the temp to fahrenheit
// Display the Humidity

//Display Wind speed and convert to MPH

// Display UVIndex.
        //By Geographic coordinates method and using appid and coordinates as a parameter we are going build our uv query url inside the function below

  // This function returns the UVIindex response.
  //lets build the url for uv index.

  // Here we display the 5 days forecast for the current city.
  
  //Set up the API key