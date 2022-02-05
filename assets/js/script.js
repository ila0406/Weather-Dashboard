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


//Geocoding API https://openweathermap.org/api/geocoding-api
var queryGeoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=' + apiKey;

fetch(queryGeoURL)
    .then(function (res)   {
        return res.json()
    })
    .then(function (data) {
        console.log(data);
    })

//OneCall API https://openweathermap.org/api/one-call-api
var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=' + apiKey;

fetch(queryOneCallURL)
    .then(function (res)   {
        return res.json()
    })
    .then(function (data) {
        console.log(data);
    })



// I had checked out https://stackoverflow.com/questions/65373299/how-can-i-use-city-name-instead-of-lat-and-log-in-openweather-api and found one of the comments said, You will need to make 2 API calls. 
// Use the lat, lon value from the first API to call the second API.
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// This will return current weather data for the city with lat, lon values.
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}