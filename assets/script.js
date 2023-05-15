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




/*var currentPosition = {};

function coordinates(callback) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
    currentPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    callback(currentPosition);
  });
}

  coordinates(function(currentPosition){
    var geoLocationLat = currentPosition.latitude;
    var geoLocationLon = currentPosition.longitude;
    var key='2c5bcf8987116e3df22f7b64c6a46515';
    var requestWeatherUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocationLat}&lon=${geoLocationLon}&appid=${key}`
        weatherNow(requestWeatherUrl)
      });

  function weatherNow() {
    fetch(requestWeatherUrl)  
    .then(function(resp) { 
      return resp.json() 
    })
    .then(function(data) {
      weather(data);
    })
    .catch(function() {
    });
  }
  
  var timeWeather=document.getElementById('timeWeather');
  timeWeather.innerHTML=weatherNow();


  window.onload = function() {
    weatherNow();
  }
  
  function weather(d) {
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    
    document.getElementById('condition').innerHTML=d.weather[0].description;
    document.getElementById('temp').innerHTML=fahrenheit+'&deg;'+'F';
    document.getElementById('location').innerHTML=d.name;
  }*/


