function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        $("#motivation").text(data[5].text +" - "+ data[5].author);
      })
    }

    // getApi("https://zenquotes.io/api/today");
    getApi("https://type.fit/api/quotes");

    // pull random quote daily

