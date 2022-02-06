// Variables for time
var currentCity = 'Cincinnati';
var todayDate = moment().format('l');
var CityDate = currentCity + ' - ' + todayDate;

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

    console.log(searchInput);
    var searchInput = document.getElementById("search").value;
    console.log(searchInput);

    if (!searchInput) {
        console.error('You need a search input value!');
        return;
    }

    var queryString = './search-results.html?q=' + searchInput + '&format=';
    console.log(queryString);
    currentCity = searchInput;
    CityDate = currentCity + ' - ' + todayDate;
    console.log(CityDate);
    $("#currentSearch").text(CityDate);
}

searchButton.addEventListener('click', searchForCity);

// You will first need to use the geocoding api before using the one-call api ! 
// This is very important as you will need to first obtain latitude and longitude data of a given city for use with the one-call api.



//////////////////////////////////////////////////////
////////////   Results Functionality   ///////////////
//////////////////////////////////////////////////////


var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams(){
    console.log("getParams");
}

function printResults(resultObj) {
    console.log(resultObj);
}

function searchApi(query, format) {
    console.log("SearchAPI");
}

function handleSearchFormSubmit(event) {
    console.log("SearchForm");
}



//Geocoding API https://openweathermap.org/api/geocoding-api
var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=Cincinnati&limit=1&appid=' + apiKey;

fetch(queryGeoURL)
    .then(function (res)   {
        return res.json()
    })
    .then(function (data) {
        // console.log(data);
        var searchCity = document.createElement('p');
        var searchState = document.createElement('p');
        var searchLat = document.createElement('p');
        var searchLon = document.createElement('p');
        searchCity.textContent = data[0].name;
        searchState.textContent = data[0].state;
        searchLat.textContent = data[0].lat;
        searchLon.textContent = data[0].lon;
        console.log(searchCity);
        console.log(searchState);
        console.log(searchLat);
        console.log(searchLon);
    })


//OneCall API https://openweathermap.org/api/one-call-api
var newLat = '39.101';
var newLon = '-84.512';
var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=39.101' + '&lon=' + '-84.512' + '&appid=' + apiKey +'&units=imperial';
//var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=39.101' + '&lon=' + '-84.512' + '&appid=' + apiKey;
//var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.101&lon=-84.512&appid=' + apiKey;

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
        
        // console.log(temp);
        // console.log(conditions);
        // console.log(humdity);
        // console.log(uvIndex);
        // console.log(windSpeed);
       

        //for (var i = 0; i < data.length; i++) {
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
          //}
        
        var trConditions;
        var trTemp;
        var trWind;
        var trHumdity;
          
        for (var i = 1; i < 6; i++) {  
            trConditions = '#conditions'+ [i];
            trTemp = '#temp'+ [i];
            trWind = '#wind'+ [i];
            trHumdity = '#humdity'+ [i];
            console.log(trConditions);
            dailyConditions.textContent = data.daily[i].weather[0].description;
            //console.log(dailyConditions);
            $(trConditions).text(dailyConditions.textContent);
            dailytemp.textContent = data.daily[i].temp.day;
            $(trTemp).text(dailytemp.textContent);
            //console.log(dailytemp);
            dailywindSpeed.textContent = data.daily[i].wind_speed;
            $(trWind).text(dailywindSpeed.textContent);
            //console.log(dailywindSpeed);
            dailyhumdity.textContent = data.daily[i].humidity;
            $(trHumdity).text(dailyhumdity.textContent);
            //console.log(dailyhumdity);
            console.log(i);
        }

        // //5-day Forcast weather loops
        // var forecastDay = 0;
        // while (forecastDay < 6){
        //     var tableBody = document.getElementById('forecast-table');
        //     var createTableRow = document.createElement('tr');
        //     //5-day - daily Conditions
        //     for (var i = 1; i < 6; i++) { 
        //         var tableData = document.createElement('td');
        //         dailyConditions.textContent = data.daily[i].weather[0].description;
        //         console.log(dailyConditions);
        //         tableData.appendChild(dailyConditions);
        //         createTableRow.appendChild(tableData);
        //         tableBody.appendChild(createTableRow);
        //     }
        //     forecastDay++;
        //     console.log(forecastDay);

        // }
    })
    
    // var queryCovidURL = 'https://corona.lmao.ninja/v2/countries?yesterday=&sort=?&limit=1';
    // //console.log(queryCovidURL);
    // fetch(queryCovidURL)
    //     .then(function (res)   {
    //         return res.json()
    //     })
    // .then(function (data) {
    //     console.log(data);
    //     for(var i=0; i<data.length; i++){
    //         var searchCity = data[i].country;
    //         var searchTodayCount = data[i].todayCases;
    //         console.log(searchCity);
    //         console.log(searchTodayCount);
    //     }
    // })


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