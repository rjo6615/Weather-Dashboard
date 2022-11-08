
// Global Variables
var units = "units=imperial";
var APIKey = "appid=26ba3a7e283acb9cd1e8665c6c3b319a";
// var APIKey = "appid=ce9cf9f240e5f73b22d7ec2394c97ed6";
var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastWeather ="https://api.openweathermap.org/data/2.5/forecast?";
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
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            getForecast(latitude, longitude);
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

var getForecast = function (latitude, longitude) {
  var weeklyWeatherApiUrl = forecastWeather + 'lat=' + latitude + "&lon=" + longitude + "&" + APIKey + "&" + units;
    //trying to get api to work
    fetch(weeklyWeatherApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        for(var i = 0; i < 33; i+=8) {
        var getDate1 = response.list[i].dt;
        var date1 = moment.unix(getDate1).format("MM/DD/YYYY");
        var getTemp1 = response.list[i].main.temp;
        var getWind1 = response.list[i].wind.speed;  
        var getHumidity1 = response.list[i].main.humidity;
        var weatherIcon1 = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
        $("#date" + [i]).html(date1);
        $("#temp" + [i]).html(getTemp1 + "\u00B0F");
        $("#wind" + [i]).html(getWind1 + "MPH");
        $("#humidity" + [i]).html(getHumidity1 + "%");        
        $("#weatherIcon" + [i]).attr("src", weatherIcon1);
}});
  };

$(citySearchForm).on("submit", function () {
   searchCity = $("#searchCity").val().trim();
    getWeather();
  });