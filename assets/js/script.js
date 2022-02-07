var currentCity = 'Today is';
var todayDate = moment().format('l');
var CityDate = currentCity + ' (' + todayDate + ') ';
var apiKey = 'ab1d33e89edaaf1e007ef532ee7c019c'
var searchButton = document.querySelector(".btn");
var weatherScreenEl = document.getElementById("weather-screen");
var uvIndexColor = 'green';
var Localstorage = localStorage;
var cities = [];

// Screen to Start
weatherScreenEl.setAttribute("class", "hide");
$("#currentSearch").text(CityDate);

// Search for Weather
searchButton.addEventListener('click', searchForCity);

// Begin Weather API calls and displaying Forecast
function searchForCity(event) {
    event.preventDefault();
    weatherScreenEl.removeAttribute("class");

    var searchInput = document.getElementById("search").value;
    var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=' + apiKey;

    //Update Header and display
    CityDate = searchInput + ' (' + todayDate + ')';
    $("#currentSearch").text(CityDate);

    if (!searchInput) {
        console.error('You need a search input value!');
        return;
    }

    // Store searched cities in Local Storage for future use
    cities.push(searchInput);
    localStorage.setItem("cities", JSON.stringify(cities));
    var citiesArray = JSON.parse(Localstorage.getItem("cities"));

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
            var weatherDetails = document.querySelector('ul');

            // Testing GeoAPI fetch & Output for next API call
            // console.log(queryOneCallURL);
            // console.log('Lat: ' + searchLat + ' Lon: ' + searchLon + ' - For (' + searchCity + ', ' + searchState + ')');

            fetch(queryOneCallURL)
                .then(function (res)   {
                    return res.json()
                })
                .then(function (data) {
                    // variables for today's forecast
                    var temp = document.createElement('li');
                    var humdity = document.createElement('li');
                    var uvIndex = document.createElement('li');
                    var windSpeed = document.createElement('li');
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
                    temp.textContent = 'Temp: ' + data.current.temp + ' °F';
                    windSpeed.textContent = 'Wind: ' +  data.current.wind_speed + ' MPH';
                    humdity.textContent = 'Humidity: ' +  data.current.humidity + ' %';
                    uvIndex.textContent = 'UV Index: ' +  data.current.uvi + ' ';

                    console.log(data.current.uvi);
                    var checkUV = data.current.uvi;

                    if (checkUV == 0 || checkUV <= 2) {
                        uvIndexColor = '65CC1F';
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor = 'FFDE33';
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor = 'FEA500';
                    }
                    else if (checkUV > 2 && checkUV <=5)   {
                        uvIndexColor = 'E60072';
                    }
                    else    {
                        uvIndexColor = '9671FF';
                    }
                    console.log(uvIndexColor);

                    // Set weatherDetails
                    weatherDetails.appendChild(temp);
                    weatherDetails.appendChild(windSpeed);
                    weatherDetails.appendChild(humdity);
                    weatherDetails.appendChild(uvIndex);

                    $("#day1").text(day1); 
                    $("#day2").text(day2); 
                    $("#day3").text(day3);
                    $("#day4").text(day4);
                    $("#day5").text(day5); 
                    
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