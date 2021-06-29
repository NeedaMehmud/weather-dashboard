var apiKey = 'bd7825a30dfe9f79399ab02e7685f767';
var searchCityBtn = $('#searchCityButton');
var searchCityInput = $('#inputCity');
// var currentDay = moment().format("dddd, MMMM Do YYYY");


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
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
    let queryCityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=imperial';
    console.log(queryCityUrl);
    fetch(queryCityUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // add data to html
            console.log(data.main.temp);

            $('#temp').text("Temperature: " + data.main.temp + '°F');
            $('#wind').text("Wind Speed: " + data.wind.speed);
            $('#humidity').text("Humidity: " + data.main.humidity + '%');
            $('#location').text(data.name);
            $('#cloudy').text(data.weather.main);
            $('#date').append(currentDay);
        });

}