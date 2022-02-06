//////////////////////////////////////////////////////
////////////    Time & Day             ///////////////
//////////////////////////////////////////////////////
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

searchButton.addEventListener('click', searchForCity);

function searchForCity(event) {
    event.preventDefault();

    var searchInput = document.getElementById("search").value;
    var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput + '&limit=1&appid=' + apiKey;

    CityDate = searchInput + ' (' + todayDate + ')';
    $("#currentSearch").text(CityDate);

    if (!searchInput) {
        console.error('You need a search input value!');
        return;
    }
    
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

            // queryOneCallURL works when inside the searchForCity function
            var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + searchLat + '&lon=' + searchLon + '&appid=' + apiKey +'&units=imperial';
            
            // Testing GeoAPI fetch & Output for next API call
            console.log(queryOneCallURL);
            console.log('Lat: ' + searchLat + ' Lon: ' + searchLon + ' - For (' + searchCity + ', ' + searchState + ')');

            getWeather(queryOneCallURL);
        })
}


//////////////////////////////////////////////////////
////////////   Results Functionality   ///////////////
//////////////////////////////////////////////////////


//OneCall API https://openweathermap.org/api/one-call-api
function getWeather(){
    var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=39.101' + '&lon=' + '-84.512' + '&appid=' + apiKey +'&units=imperial';

    //console.log(queryOneCallURL);
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
}


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