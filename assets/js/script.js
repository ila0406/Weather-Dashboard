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

//
//Open weather 5 day forcast

