var currentCity = 'Today is';
var todayDate = moment().format('l');
var cityDate = currentCity + ' (' + todayDate + ') ';
var apiKey = 'ab1d33e89edaaf1e007ef532ee7c019c'
var searchButton = document.querySelector(".btn");
var weatherForecastEl = document.getElementById("weather-forecast");
var weatherTodayEl = document.getElementById("weather-today");
var uvIndexColor = document.getElementById("uvIndex0");
var Localstorage = localStorage;
var cities = [];

// Screen to Start
weatherForecastEl.setAttribute("class", "hide");
weatherTodayEl.setAttribute("class", "hide");
$("#currentSearch").text(cityDate);

// Search for Weather
searchButton.addEventListener('click', searchForCity);

// Begin Weather API calls and displaying Forecast
function searchForCity(event) {
    event.preventDefault();

    var searchInput = document.getElementById("search").value;
    var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=' + apiKey;

    //Update Header and display
    cityDate = searchInput + ' (' + todayDate + ')';
    $("#currentSearch").text(cityDate);

    if (!searchInput) {
        cityDate = 'Invalid Search Criteria';
        $("#currentSearch").text(cityDate);
        return;
    }
    else    {
        weatherForecastEl.removeAttribute("class");
        weatherTodayEl.removeAttribute("class");
    }

    // Store searched cities in Local Storage for future use
    cities.push(searchInput);
    localStorage.setItem("cities", JSON.stringify(cities));
    var citiesArray = JSON.parse(Localstorage.getItem("cities"));

    var repoList = document.querySelector('ul');
    var newCity = citiesArray.length - 1;
        console.log(citiesArray[newCity]);
        var listItem = document.createElement('li');
        listItem.textContent = citiesArray[newCity];
        repoList.appendChild(listItem);

    // Use GeoAPI to find Lat/Long for city inputed in search box
    fetch(queryGeoURL)
        .then(function (res)   {
            return res.json()
        })
        .then(function (data) {
            // console.log(data);
            var searchCity = data[0].name;
            var searchState = data[0].state;
            var searchLat = data[0].lat;
            var searchLon = data[0].lon;
            var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + searchLat + '&lon=' + searchLon + '&appid=' + apiKey +'&units=imperial';
            //var weatherDetails = document.querySelector('ul');

            fetch(queryOneCallURL)
                .then(function (res)   {
                    return res.json()
                })
                .then(function (data) {
                    // Icon data
                    var wiconEl = document.createElement("img");
                    var currentIcon = data.current.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
                    console.log(iconUrl);
                    $(wiconEl).attr("id", "wicon");
                    $(wiconEl).attr("src", iconUrl);
                    $(wiconEl).attr("alt", "weather icon");
                    $('#icon0').attr("src", iconUrl);
                    // var uvIndexColor = document.getElementById("uvIndex0");
                    // uvIndexColor.setAttribute("class", "uvLow"); 
                    // $(wiconEl).attr("id", "wicon");
                    // $(wiconEl).attr("src", iconUrl);
                    // $(wiconEl).attr("alt", "weather icon");

                    // variables for today's forecast
                    var icon = document.createElement('td');
                    var temp = document.createElement('td');
                    var humdity = document.createElement('td');
                    var uvIndex = document.createElement('td');
                    var windSpeed = document.createElement('td');
                    //variables for daily loop
                    var dailyConditions = document.createElement('td');
                    var dailytemp = document.createElement('td');
                    var dailyhumdity = document.createElement('td');
                    var dailywindSpeed = document.createElement('td');
                    // variables for 5-day forecast loop
                    var trConditions;
                    var trTemp;
                    var trWind;
                    var trHumdity;
                    // variables for dates of 5-day forecast
                    var day1 = moment().add(1, 'days').format('l');
                    var day2 = moment().add(2, 'days').format('l'); 
                    var day3 = moment().add(3, 'days').format('l');
                    var day4 = moment().add(4, 'days').format('l');
                    var day5 = moment().add(5, 'days').format('l');

                    // Weather Forecast for Today
                    // $('#icon0').text('Conditions: ' + data.current.weather[0].icon); 
                    $('#temp0').text('Temp: ' + data.current.temp + ' °F');
                    $('#wind0').text('Wind: ' +  data.current.wind_speed + ' MPH');
                    $('#humdity0').text('Humidity: ' +  data.current.humidity + ' %');
                    $('#uvIndex0').text('UV Index: ' +  data.current.uvi + ' ');
                    
                    // Set style attributes to change the color of todays UV Index
                    var checkUV = data.current.uvi;
                    if (checkUV == 0 || checkUV <= 2) {
                        uvIndexColor.setAttribute("class", "uvLow");        
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor.setAttribute("class", "uvModerate");
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor.setAttribute("class", "uvHigh");
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor.setAttribute("class", "uvVeryHigh");
                    }
                    else    {
                        uvIndexColor.setAttribute("class", "uvExtreme");
                    }

                    // Populate row of tables with Dates
                    $('#day1').text(day1); 
                    $('#day2').text(day2); 
                    $('#day3').text(day3);
                    $('#day4').text(day4);
                    $('#day5').text(day5); 
                    
                    // Weather Forecast for next 5 Days 
                    for (var i = 1; i < 6; i++) {  
                        trConditions = '#conditions'+ [i];
                        trTemp = '#temp'+ [i];
                        trWind = '#wind'+ [i];
                        trHumdity = '#humdity'+ [i];
                        // dailyConditions.textContent = data.daily[i].weather[0].description;
                        dailyConditions.textContent = data.daily[i].weather[0].icon;
                        $(trConditions).text(dailyConditions.textContent);
                        dailytemp.textContent = data.daily[i].temp.day + ' °F';
                        $(trTemp).text(dailytemp.textContent);
                        dailywindSpeed.textContent = data.daily[i].wind_speed + ' MPH';
                        $(trWind).text(dailywindSpeed.textContent);
                        dailyhumdity.textContent = data.daily[i].humidity + ' %';
                        $(trHumdity).text(dailyhumdity.textContent);
                    }
                })
        })
   
}

function clearScores() {
    window.localStorage.clear();
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;
