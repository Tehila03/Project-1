function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        random = getRandomValueFromArray(data);
        $("#quote").text(random.text);
        console.log(random)
        $("#author").text("- "+random.author);
        if (random.author === null){
            $("#author").text("- Unknown");
        }
      })
      }
    

function getRandomNumber(min, max) {
    var randomNumber=Math.random()
    var randomNumberUpToMax=randomNumber * max;
    var randomNumberInRange= min + randomNumberUpToMax;
  
    return Math.floor(randomNumberInRange);
    }
  
function getRandomValueFromArray(array) {
    var randomArrayPosition=getRandomNumber(0,array.length);
    return array[randomArrayPosition];
}

getApi("https://type.fit/api/quotes");