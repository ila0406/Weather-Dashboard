//ab1d33e89edaaf1e007ef532ee7c019c API key
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

//Geocoding API

//OneCall API



//var queryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=ab1d33e89edaaf1e007ef532ee7c019c';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=ab1d33e89edaaf1e007ef532ee7c019c';

fetch(queryURL)
    .then(function (res)   {
        return res.json()
    })
    .then(function (data) {
        console.log(data);
    })



//Sample Fetch
// fetch('https://api.github.com/repos/nodejs/node/issues?per_page=5', {
//     // The browser fetches the resource from the remote server without first looking in the cache.
//     // The browser will then update the cache with the downloaded resource.
//     cache: 'reload',
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
