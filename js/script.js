var apiKey = 'bd7825a30dfe9f79399ab02e7685f767';
var searchCityBtn = $('#searchCityButton');
var searchCityInput = $('#inputCity');
let humidityElement = $(".humidity");
let uvIndexElement = $(".uvIndex");
let windSpeedElement = $(".windSpeed");
let temperatureElement = $(".temp");


searchCityBtn.on("click", function (event) {
    event.preventDefault();
    var searchCity = searchCityInput.val();
    if (searchCity === "") {
        alert("Field can't be blank. Please enter a city!");
        return;
    }
    $("#search-history").append(`<button type="button" class="btn btn-secondary btn-lg btn-block">${searchCity}</button>`)
    console.log("clicked button")
    getWeather(searchCity);

});

console.log(searchCityBtn)

function getWeather(cityName) {
    let queryCityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=imperial';
    console.log(queryCityUrl);
    fetch(queryCityUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // add data to html

        });
    
}