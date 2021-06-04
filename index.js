// var value=  document.getElementById('search-term').value;



function fiveDay(req, res) {

  var name=(req.city.name)
  console.log(req);
  var listIndex = [5, 12, 19, 26, 33];
  var latitude = req.city.coord.lat;
  var longitude = req.city.coord.lon;

  function currentDay(req, res) {
    console.log(req);
    console.log(listIndex);
    
    // var value=  document.getElementById('search-term').value;
    // console.log(value)
    var currentDiv = `   <h5 class="card-title" id="demodemo">${name}</h5>
    <p class="card-text">Current temperature:${Math.floor(
      ((req.current.temp - 273.15) * 9) / 5 + 32
    )}</p>
    <p class="card-text">Humidity:${req.current.humidity}%</p>
    <p class="card-text">Wind speed:${req.current.wind_speed}</p>
    `;
    var currentCard = $("#cardCurrent");

    currentCard.append(currentDiv);
  }

  console.log(latitude);

  // Here we loop through our array using the .each() method and append a new div with each iteration
  $.each(listIndex, function (i, listnum) {
    var div = `<div class="card">
    <img src="http://openweathermap.org/img/w/${
      req.list[listnum].weather[0].icon
    }.png" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${req.list[listnum].dt_txt.substring(0, 10)}</h5>
        <p class="card-text">${
          Math.floor(((req.list[listnum].main.temp - 273.15) * 9) / 5 + 32) +
          "\u00B0" +
          "<br>" +
          "<br>" +
          req.list[listnum].main.humidity +
          "%rh"
        }</p>
    </div>
   
  </div>`;
    var demoDiv = $(".card-group");

    demoDiv.append(div);
  });
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily,minutely,alerts&appid=41ef25e98f82c2141b0b93aab399db3e`,
    method: "GET",
  }).then(currentDay);
}

$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  // clear();

  
  var value = $('#search-term').val();
    
  var queryURL =
    `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=41ef25e98f82c2141b0b93aab399db3e`;

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(fiveDay);

  // $('#pastSearch')

 
});

//  .on("click") function associated with the clear button
// $("#clear-all").on("click", clear);
