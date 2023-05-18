var sortButtons =[$('#all'),$('#work'),$('#school'),$('#exercise'),$('#social'),$('#other')];
var sortBar = $('#main-nav');
var inputButton = $('#inputButton');
var activities = $("#timeslots");
var editScreen = $("#editScreen");
var closeEditButton = $("#closeEdit");
var deleteButton = $("#deleteActivity");
var editName = $("#edit-input-name");
var editDescription = $("#edit-input-description");
var editType = $("#edit-input-type");
var editSubmit = $("#editSubmit");

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


if (currentQuote === 0) {
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
  $(this).css("background-color","var(--green)");
}

function updateList(){
  $(".activity").css("display","none");

  var buttonValues = ["all","work","school","exercise","social","other"]
  var type = $(this).val();

  console.log(type)
  console.log(buttonValues[1])

  if (type === buttonValues[0]){
    $(".activity").css("display","flex");
  }
  if (type === buttonValues[1]){
    console.log("works")
    $(".Work").css("display","flex");
  }
  if (type === buttonValues[2]){
    $(".School").css("display","flex");
  }
  if (type === buttonValues[3]){
    $(".Exercise").css("display","flex");
  }
  if (type === buttonValues[4]){
    $(".Social").css("display","flex");
  }
  if (type === buttonValues[5]){
    $(".Other").css("display","flex");
  }
}

function openEdit(){
  editScreen.css("display","block");
  currentActivity = $(this).parent();
  currentTitle = $(this).parent().children(".activityText").children(".activityTitle");
  currentDescription = $(this).parent().children(".activityText").children(".activityDescription");
}
function closeEdit(){
  editScreen.css("display","none")
}

var currentActivity = "";
var currentTitle = "";
var currentDescription = "";

function submitEdit(event){
  event.preventDefault();
  
  if(editName.val()==""){
    editName.val(currentTitle.text());
  } else {
    currentTitle.text(editName.val() + " - " + editType.val())
  }

  if(editDescription.val()==""){
    editDescription.val(currentDescription.text());
  } else {
    currentDescription.text(editDescription.val())
  }
  if (editType.val()!==null) {
    currentActivity.removeClass();
    currentActivity.addClass("activity");
    currentActivity.addClass(editType.val());
  }

  editName.val('')
  editDescription.val('')
  editType.val('Other')

  closeEdit()
}


sortBar.on('click','button', changeTab);
sortBar.on('click','button', updateList);
activities.on('click','button', openEdit);
closeEditButton.on('click', closeEdit);
deleteButton.on('click', function(){
  if (confirm("Are you sure you want to delete this Activity")){
    currentActivity.remove();
    editScreen.css("display","none");
  }
})
editSubmit.on('click', submitEdit);

inputButton.on('click', function (event){
  event.preventDefault();

  activity = $("#input-name").val();
  type = $("#input-type").val();
  start = $("#input-start-hour").val() +":"+ $("#input-start-minute").val() +" "+ $("#input-start-ampm").val();
  end = $("#input-end-hour").val() +":"+ $("#input-end-minute").val() +" "+ $("#input-end-ampm").val();

  if (activity===''){
    activity = "Unnamed"
  }
  if (start.includes("null")){
    start = "Unknown"
  }
  if (end.includes("null")){
    end = "Unknown"
  }
  if (type===null){
    type = 'Other'
  }

  military = ''

  if ($("#input-start-ampm").val()=="am"){
    if($("#input-start-hour").val()=="12"){
      military = -1200
    } else{
      military = 0
    }
  } else {
    if ($("#input-start-hour").val()=="12"){
      military = 0
    } else{
        military = 1200
    }
  }

  level = parseInt($("#input-start-hour").val())*100 + parseInt(($("#input-start-minute").val())) + military;

  $("#input-name").val("");
  $("#input-type").val("Other");
  $("#input-start-hour").val("")
  $("#input-start-minute").val("");
  $("#input-start-ampm").val("");
  $("#input-end-hour").val("")
  $("#input-end-minute").val("");
  $("#input-end-ampm").val("");

  var newInput = $("<div>", { class: "activity "+type, value:level});
  var newTime = $("<div>", {class:"timeLength"});
  var newTimeStart = $("<p>", {class:"start"});
  var newTimeEnd = $("<p>", {class:"end"});
  var newText = $("<div>", { class:"activityText"});
  var newTitle = $("<h2>", { class:"activityTitle"});
  var newDesc = $("<p>", { class:"activityDescription"});
  var buttonEdit = $("<button>", {class:"edit"});
  var buttonEditImg = $("<img>", {src:"assets/images/edit.png"});
  var newLabel = $("<label>", {class:"container"});
  var newCheck = $("<input>", {type:"checkbox"});
  var newSpan = $("<span>", {class:"checkmark"});

  newTimeStart.text(start);
  newTimeEnd.text(end);

  newTime.append(newTimeStart);
  newTime.append(newTimeEnd);

  newTitle.text(activity +" - "+ type);
  newDesc.text("")

  
  newLabel.append(newCheck);
  newLabel.append(newSpan);

  buttonEdit.append(buttonEditImg);

  newText.append(newTitle);
  newText.append(newDesc);

  newInput.append(newTime);
  newInput.append(newText);
  newInput.append(buttonEdit);
  newInput.append(newLabel);

  var activityList = $(".activity");

  for (var i = 0;i<activityList.length;i++){
    console.log(level)
    console.log(activityList[i].getAttribute("value"))
    console.log(activities.children()[i])
    if (parseInt(level)<parseInt(activityList[i].getAttribute("value"))){
      newInput.insertBefore(activityList[i])
      break
    }
    if (i===activityList.length-1){
      newInput.insertBefore($(".spacer"));
    }
  }
});