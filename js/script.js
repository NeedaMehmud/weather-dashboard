var apiKey = '65d1ed00266eb90ad5d1a2f983cb093f';
var searchCityBtn = $('#searchCityButton');
var searchCityInput = $('#inputCity');
var currentDay = moment().format("dddd, MMMM Do YYYY");
console.log(currentDay);

var iconUrl = "https://openweathermap.org/img/wn/"
var iconExtension = ".png";

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
    let queryCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    console.log(queryCityUrl);
    fetch(queryCityUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // add data to html
            console.log(data.main.temp);

            $('#temp').text("Temperature: " + data.main.temp + '°F');
            $('#wind').text("Wind Speed: " + data.wind.speed + 'MPH');
            $('#humidity').text("Humidity: " + data.main.humidity + '%');
            $('#location').text(data.name);
            $('#cloudy').text(data.weather.main);
            $('#date').text(currentDay);
            $('#daily-icon').attr("src", `${iconUrl}${data.weather[0].icon}${iconExtension}`);

            var latt = data.coord.lat;
            var long = data.coord.lon;
            let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${long}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;

            console.log(fiveDayUrl);
            fetch(fiveDayUrl)
                .then(response => response.json())
                .then(data => {
                    for (var i = 1; i < data.daily.length; i++) {
                        var momentDate = moment.unix(data.daily[i].dt);
                        var day = momentDate.format('ddd');
                        $(`#day${i}`).text(day);
                        console.log(day);
                        // add data to five-day html
                        $(`#day${i}temp`).text("Temp: " + data.daily[i].temp.day + '°F');
                        $(`#day${i}humidity`).text("Humidity: " + data.daily[i].humidity + '%');
                        $(`#day${i}windspeed`).text("Wind: " + data.daily[i].wind_speed + 'MPH');
                        $(`#day${i}icon`).attr("src", `${iconUrl}${data.daily[i].weather[0].icon}${iconExtension}`);



                    }
                })

        });

}