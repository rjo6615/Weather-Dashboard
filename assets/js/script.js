
// Global Variables
var units = "units=imperial";
var APIKey = "appid=ce9cf9f240e5f73b22d7ec2394c97ed6";
var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastWeather ="https://api.openweathermap.org/data/2.5/onecall?";

// Element Variables
var citySearchForm = $("#citySearchForm");
var searchedCities = $("#searchedCityLi");
var searchCity = "";


var getWeather = function () {
    event.preventDefault();
    var dailyWeatherApiUrl = dailyWeather + searchCity + "&" + APIKey + "&" + units;
    fetch(dailyWeatherApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })};


$(citySearchForm).on("submit", function () {
   searchCity = $("#searchCity").val().trim();
    getWeather();
  });