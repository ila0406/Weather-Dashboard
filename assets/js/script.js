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
var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=' + apiKey;
var weatherDetails = document.querySelector('ul');

fetch(queryOneCallURL)
    .then(function (res)   {
        return res.json()
    })
    .then(function (data) {
        // console.log(data);
        var temp = document.createElement('p');
        var conditions = document.createElement('p');
        var humdity = document.createElement('p');
        var uvIndex = document.createElement('p');
        var windSpeed = document.createElement('p');
        temp.textContent = data.current.temp;
        conditions.textContent = data.current.weather[0].description;
        humdity.textContent = data.current.humidity;
        uvIndex.textContent = data.current.uvi;
        windSpeed.textContent = data.current.wind_speed;
        console.log(temp);
        console.log(conditions);
        console.log(humdity);
        console.log(uvIndex);
        console.log(windSpeed);

        //for (var i = 0; i < data.length; i++) {
            var listItem1 = document.createElement('li');
            var listItem2 = document.createElement('li');
            var listItem3 = document.createElement('li');
            var listItem4 = document.createElement('li');
            var listItem5 = document.createElement('li');
            listItem1.textContent = data.current.temp;
            weatherDetails.appendChild(listItem1);
            listItem2.textContent = data.current.weather[0].description;
            weatherDetails.appendChild(listItem2);
            listItem3.textContent = data.current.humidity;
            weatherDetails.appendChild(listItem3);
            listItem4.textContent = data.current.uvi;
            weatherDetails.appendChild(listItem4);
            listItem5.textContent = data.current.wind_speed;
            weatherDetails.appendChild(listItem5);
          //}
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