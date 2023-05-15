var sortButtons =[$('#all'),$('#work'),$('#school'),$('#exercise'),$('#social'),$('#other')];
var sortBar = $('#main-nav');
var inputButton = $('#inputButton');
var activities = $("#timeslots");

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      $("#quote").text(data[currentQuote].text);
      $("#author").text("- " + data[currentQuote].author);
      if (data[currentQuote].author === null) {
        $("#author").text("- Unknown");
      }
    })
}
var newDate = localStorage.getItem("newDate");
  if (newDate === null ){
  newDate = dayjs().date();
}

var currentQuote = localStorage.getItem("currentQuote");

if (currentQuote === null ){
    currentQuote = 0;
}

if (newDate != dayjs().date()) {
  newDate = dayjs().date();
  currentQuote++;
  localStorage.setItem("newDate", newDate);
  localStorage.setItem("currentQuote", currentQuote);
}


getApi("https://type.fit/api/quotes");

var now = dayjs().format("h:mm a")

$("#timeWeather").text(now);

function clock(){
  timeInterval = setInterval(function() {
    now = dayjs().format("h:mm a")
    $("#timeWeather").text(now)
    },10000);
}

clock();

var returnValue = {};
var currentWeather = {};

updateCoordinate(function (returnValue) {
  console.log(returnValue);
  var geoLocationLat=returnValue.latitude;
      var geoLocationLon=returnValue.longitude;
      var key='2c5bcf8987116e3df22f7b64c6a46515';
      var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocationLat}&lon=${geoLocationLon}&exclude=hourly,daily&units=imperial&appid=${key}`;
      setWeatherIcon(requestWeatherUrl)
    });

function updateCoordinate(callback) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        returnValue = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        callback(returnValue);
      }
    )
}

function setWeatherIcon(requestWeatherUrl){
  fetch(requestWeatherUrl)
      .then(function (response){
        return response.json();
      })
      .then(function (data) {
                var currentDayForecast_Icon = data.weather[0].icon;
                var img = $('<img>',{ src: `https://openweathermap.org/img/wn/${currentDayForecast_Icon}@2x.png`})
                $("#weatherIcon").prepend(img);
            }
      )};

function changeTab() {
  for (var i = 0; i<sortButtons.length; i++){
    sortButtons[i].css("background-color","var(--blue)")
  }
  $(this).css("background-color","var(--green)")
}

sortBar.on('click','button', changeTab);

inputButton.on('click', function (event){
  event.preventDefault();

  activity = $("#input-name").val();
  type = $("#input-type").val();
  start = $("#input-start-hour").val() +":"+ $("#input-start-minute").val();
  amPm = $("#input-start-ampm").val();

  var newInput = $("<div>", { class:"activity", type});
  var newText = $("<div>", { class:"title"});
  var newTitle = $("<h2>");
  var newDesc = $("<p>");
  var buttonEdit = $("<button>", {class:"edit"});
  var buttonEditImg = $("<img>", {src:"assets/images/edit.png"});
  var newLabel = $("<label>", {class:"container"});
  var newCheck = $("<input>", {type:"checkbox"});
  var newSpan = $("<span>", {class:"checkmark"});

  newTitle.text(activity)
  newDesc.text("Add extra info with the edit function")

  
  newLabel.append(newCheck);
  newLabel.append(newSpan);

  buttonEdit.append(buttonEditImg);

  newText.append(newTitle);
  newText.append(newDesc);

  newInput.append(newText);
  newInput.append(buttonEdit);
  newInput.append(newLabel);

  activities.prepend(newInput);
});