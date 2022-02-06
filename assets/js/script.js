// Variables for time
var currentCity = 'Today is';
var todayDate = moment().format('l');
var CityDate = currentCity + ' (' + todayDate + ') ';

var day1 = moment().add(1, 'days').format('l');
var day2 = moment().add(2, 'days').format('l'); 
var day3 = moment().add(3, 'days').format('l');
var day4 = moment().add(4, 'days').format('l');
var day5 = moment().add(5, 'days').format('l');


$("#currentSearch").text(CityDate);
$("#day1").text(day1); 
$("#day2").text(day2); 
$("#day3").text(day3);
$("#day4").text(day4);
$("#day5").text(day5); 

//////////////////////////////////////////////////////
////////////    Search Functionality   ///////////////
//////////////////////////////////////////////////////


var apiKey = 'ab1d33e89edaaf1e007ef532ee7c019c'
var searchButton = document.querySelector(".btn");

function searchForCity(event) {
    event.preventDefault();

    var searchInput = document.getElementById("search").value;
    CityDate = searchInput + ' (' + todayDate + ')';
    $("#currentSearch").text(CityDate);

    if (!searchInput) {
        console.error('You need a search input value!');
        return;
    }

    // Geocoding API https://openweathermap.org/api/geocoding-api
    var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=' + apiKey;
    
    fetch(queryGeoURL)
        .then(function (res)   {
            return res.json()
        })
        .then(function (data) {
            // console.log(data);
            var searchCity = document.createElement('p');
            var searchState = document.createElement('p');
            var searchLat = data[0].lat;
            var searchLon = data[0].lon;
            var queryLat = '38.833';
            var queryLon = '-104-82';
            searchCity.textContent = data[0].name;
            searchState.textContent = data[0].state;
            // searchLat.textContent = data[0].lat;
            // searchLon.textContent = data[0].lon;
            console.log(searchCity);
            console.log(searchState);
            console.log(searchLat);
            console.log(searchLon);

            
            queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + searchLat + '&lon=' + searchLon + '&appid=' + apiKey +'&units=imperial';
            console.log(queryOneCallURL);
        })

        // console.log(queryString);
        console.log(queryGeoURL);
}

searchButton.addEventListener('click', searchForCity);

// You will first need to use the geocoding api before using the one-call api ! 
// This is very important as you will need to first obtain latitude and longitude data of a given city for use with the one-call api.



//////////////////////////////////////////////////////
////////////   Results Functionality   ///////////////
//////////////////////////////////////////////////////


// var resultTextEl = document.querySelector('#result-text');
// var resultContentEl = document.querySelector('#result-content');
// var searchFormEl = document.querySelector('#search-form');

// function getParams(){
//     console.log("getParams");
// }

// function printResults(resultObj) {
//     console.log(resultObj);
// }

// function searchApi(query, format) {
//     console.log("SearchAPI");
// }

// function handleSearchFormSubmit(event) {
//     console.log("SearchForm");
// }






//OneCall API https://openweathermap.org/api/one-call-api
//function getWeather(){
 
    var newLat = '39.101';
    var newLon = '-84.512';
    var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=39.101' + '&lon=' + '-84.512' + '&appid=' + apiKey +'&units=imperial';
    //var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=39.101' + '&lon=' + '-84.512' + '&appid=' + apiKey +'&units=imperial';
    //var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.101&lon=-84.512&appid=' + apiKey +'&units=imperial';

    console.log(queryOneCallURL);
    var weatherDetails = document.querySelector('ul');

    fetch(queryOneCallURL)
        .then(function (res)   {
            return res.json()
        })
        .then(function (data) {
            // console.log(data);
            var temp = document.createElement('li');
            var conditions = document.createElement('li');
            var humdity = document.createElement('li');
            var uvIndex = document.createElement('li');
            var windSpeed = document.createElement('li');
            var dailyConditions = document.createElement('td');
            var dailytemp = document.createElement('td');
            var dailyhumdity = document.createElement('td');
            var dailywindSpeed = document.createElement('td');
            temp.textContent = data.current.temp;
            conditions.textContent = data.current.weather[0].description;
            humdity.textContent = data.current.humidity;
            uvIndex.textContent = data.current.uvi;
            windSpeed.textContent = data.current.wind_speed;
            
            // Weather Forecast for Today 
            temp.textContent = data.current.temp;
            weatherDetails.appendChild(temp);
            windSpeed.textContent = data.current.wind_speed;
            weatherDetails.appendChild(windSpeed);
            humdity.textContent = data.current.humidity;
            weatherDetails.appendChild(humdity);
            uvIndex.textContent = data.current.uvi;
            weatherDetails.appendChild(uvIndex);
            conditions.textContent = data.current.weather[0].description;
            weatherDetails.appendChild(conditions);

            
            var trConditions;
            var trTemp;
            var trWind;
            var trHumdity;
            
            // Weather Forecast for next 5 Days 
            for (var i = 1; i < 6; i++) {  
                trConditions = '#conditions'+ [i];
                trTemp = '#temp'+ [i];
                trWind = '#wind'+ [i];
                trHumdity = '#humdity'+ [i];
                dailyConditions.textContent = data.daily[i].weather[0].description;
                $(trConditions).text(dailyConditions.textContent);
                dailytemp.textContent = data.daily[i].temp.day;
                $(trTemp).text(dailytemp.textContent);
                dailywindSpeed.textContent = data.daily[i].wind_speed;
                $(trWind).text(dailywindSpeed.textContent);
                dailyhumdity.textContent = data.daily[i].humidity;
                $(trHumdity).text(dailyhumdity.textContent);
            }

        })

//}

// I had checked out https://stackoverflow.com/questions/65373299/how-can-i-use-city-name-instead-of-lat-and-log-in-openweather-api and found one of the comments said, You will need to make 2 API calls. 
// Use the lat, lon value from the first API to call the second API.
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// This will return current weather data for the city with lat, lon values.
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}





//OneCall API https://openweathermap.org/api/one-call-api
// var queryWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=39&lon=-84&appid=' + apiKey;

// fetch(queryWeatherURL)
//     .then(function (res)   {
//         return res.json()
//     })
//     .then(function (data) {
//         console.log(data);
        // var temp = document.createElement('p');
        // var conditions = document.createElement('p');
        // var humdity = document.createElement('p');
        // var uvIndex = document.createElement('p');
        // var windSpeed = document.createElement('p');
        // temp.textContent = data.main.temp;
        // conditions.textContent = data.weather[0].description;
        // humdity.textContent = data.main.humdity;
        // // uvIndex.textContent = data.current.uvi;
        // windSpeed.textContent = data.wind.speed;
        // console.log(temp);
        // console.log(conditions);
        // console.log(humdity);
        // // console.log(uvIndex);
        // console.log(windSpeed);
    // })