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
    },1000);
}

clock();
