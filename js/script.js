var apiKey = '65d1ed00266eb90ad5d1a2f983cb093f';
var searchCityBtn = $('#searchCityButton');
var searchCityInput = $('#inputCity');
var clearButton = $('#clearButton');
var currentDay = moment().format("dddd, MMMM Do YYYY");
console.log(currentDay);

var iconUrl = "https://openweathermap.org/img/wn/"
var iconExtension = ".png";

for (var i in localStorage) {
    if (i.startsWith('city')) {
        createSearchHistoryButton(localStorage[i])
    }
}

// clear history by clear search history button
clearButton.on("click", function (event) {
    event.preventDefault();
    for (var i in localStorage) {
        if (i.startsWith('city')) {
            localStorage.removeItem(i);
            $(`#${i}`).remove();
        }
    }
});

searchCityBtn.on("click", function (event) {
    event.preventDefault();
    var searchCity = searchCityInput.val();
    if (searchCity === "") {
        alert("Field can't be blank. Please enter a city!");
        return;
    }
    var localStorageKey = createKeyFromCityName(searchCity);
    localStorage.setItem(`city-${localStorageKey}`, searchCity);

    createSearchHistoryButton(searchCity);
    console.log("clicked button")
    getWeather(searchCity);

});

function createSearchHistoryButton(cityName) {
    var localStorageKey = createKeyFromCityName(cityName);
    $("#search-history").append(`<button id=city-${localStorageKey} type="button" class="btn btn-secondary btn-lg btn-block">${cityName}</button>`)
}

// remove spaces from the city key
function createKeyFromCityName(cityName) {
    return cityName.replace(/\s/g, "-");
}


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
                    var currentUvi = data.current.uvi;
                    $('#current-uvi').text("UV Index: " + currentUvi);
                    if (currentUvi <= 4) {
                        $('#current-uvi').attr("class", "uvIndexLow")
                    } else if (currentUvi <= 8) {
                        $('#current-uvi').attr("class", "uvIndexMid")
                    } else {
                        $('#current-uvi').attr("class", "uvIndexHigh")
                    }

                    for (var i = 1; i < data.daily.length; i++) {
                        var momentDate = moment.unix(data.daily[i].dt);
                        var day = momentDate.format('ddd');
                        $(`#day${i}`).text(day);
                        console.log(day);
                        // add data to five-day html
                        $(`#day${i}temp`).text("Temp: " + data.daily[i].temp.day + ' °F');
                        $(`#day${i}humidity`).text("Humidity: " + data.daily[i].humidity + ' %');
                        $(`#day${i}windspeed`).text("Wind: " + data.daily[i].wind_speed + ' MPH');
                        $(`#day${i}icon`).attr("src", `${iconUrl}${data.daily[i].weather[0].icon}${iconExtension}`);
                    }
                })
        })
}
