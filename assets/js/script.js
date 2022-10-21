
// Global Variables
var units = "units=imperial";
var APIKey = "appid=ce9cf9f240e5f73b22d7ec2394c97ed6";
var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastWeather ="https://api.openweathermap.org/data/2.5/onecall?";
var weatherIcon = "http://openweathermap.org/img/wn/";

// Element Variables
var citySearchForm = $("#citySearchForm");
var searchedCities = $("#searchedCityLi");
var searchCity = "";


var getWeather = function () {
    event.preventDefault();
    var dailyWeatherApiUrl = dailyWeather + searchCity + "&" + APIKey + "&" + units;
    fetch(dailyWeatherApiUrl).then(function (response) {
        if (response.ok) {
        return response.json().then(function (response) {
            $("#cityName").html(response.name);
            var date = moment.unix(response.dt).format("MM/DD/YY");
            $("#currentDate").html(date);
            var weatherIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            $("#weatherIcon").attr("src", weatherIcon);
            $("#temp").html(response.main.temp + "\u00B0F");
            $("#wind").html(response.wind.speed + "MPH");
            $("#humidity").html(response.main.humidity + "%");            
    });
    }else {
        alert("Enter a city name");    
    }
});
};

$(citySearchForm).on("submit", function () {
   searchCity = $("#searchCity").val().trim();
    getWeather();
  });