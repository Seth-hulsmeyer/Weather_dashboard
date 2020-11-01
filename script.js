$("document").ready(function () {
  //event listener for button clicked
  $(".btn").click(function (event) {
    event.preventDefault();
    var userInput = $("#search-input").val();

    //storing userInput in local storage and prepend to page
    localStorage.setItem("userInput", userInput);
    var prevInput = localStorage.getItem("userInput");
    $("#prev-input").prepend(`<ul class = "list-group">
    <li class= "list-group-item">${prevInput}</li>
    </ul>`);

    //call to current weather API--------------------------------------------------------------
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        userInput +
        "&APPID=29711aee18e9085caaa1327ad7463a32&units=imperial",
      {
        method: "GET",
        cache: "reload",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#weatherNow").empty();
        //dynamically create current weather forecast
        $("#weatherNow").append(
          "<h3>" + data.name + " (" + moment().format("L") + ")" + "</h3>"
        );
        //appends current Weather Icon
        var weatherIcon = data.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        $("#weatherNow").append(`<img src = "${iconURL}"/>`);

        //appends current Temp
        $("#weatherNow").append(
          "<h5>" + "Temp: " + data.main.temp + "°F" + "</h5>"
        );
        //appends current humidity
        $("#weatherNow").append(
          "<h5>" + "Humidity: " + data.main.humidity + "%" + "</h5>"
        );

        //appends wind speed
        $("#weatherNow").append(
          "<h5>" + "Wind Speed: " + data.wind.speed + "MPH" + "</h5>"
        );
      });

    //calling to the 5-day forecast API--------------------------------------------------
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userInput +
        "&appid=29711aee18e9085caaa1327ad7463a32&units=imperial",
      {
        method: "GET",
        cache: "reload",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //for loop to append 5 dat forecast
        $("#forecastFive").empty();
        for (i = 0; i < data.list.length; i += 8) {
          var date = moment(data.list[i].dt_txt).format("L");
          var temp = data.list[i].main.temp;
          var humidity = data.list[i].main.humidity;
          var weatherIconCard = data.list[i].weather[0].icon;
          var cardIconURL =
            "http://openweathermap.org/img/w/" + weatherIconCard + ".png";

          //dynamically create forecast cards
          $("#forecastFive").append(`
            <div class= "col mb-4">
                <div class= "card">${date}
                <img src = "${cardIconURL}" width="40";> 
                <p>Temp: ${temp}</p>
                <p>Humidity: ${humidity}</p>
                </div>
            </div>
            `);
        }
      });
  });
});
