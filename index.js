function fiveDay(req, res) {

  var name=(req.city.name)
  console.log(req);
  var listIndex = [5, 12, 19, 26, 33];
  var latitude = req.city.coord.lat;
  var longitude = req.city.coord.lon;

  function currentDay(req, res) {
 
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

  $.each(listIndex, function (i, listnum) {
    var div = `<div class="card">
    <img src="https://openweathermap.org/img/w/${
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
function clear() {
  $(".card-group").empty();
  $("#cardCurrent").empty();
}
$("#run-search").on("click", function (event) {

  event.preventDefault();

  clear();

  var value = $("#search-term").val();
  var pastSearchbutton = `<button class="historyButtons">${value}</button>`;

  var queryURL = `"https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=41ef25e98f82c2141b0b93aab399db3e"`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(fiveDay);

  $("#pastSearch").append(pastSearchbutton);
  $(".historyButtons").on("click", function () {
    var text = $(this).text();
    $("#search-term").val(text);
  });
});

