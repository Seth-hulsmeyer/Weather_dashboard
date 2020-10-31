$("document").ready(function () {
  //event listener for button clicked
  $(".btn").click(function (event) {
    event.preventDefault();
    var userInput = $("#inlineFormInputName2").val();
    //fetch api info function
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
        console.log(data);
        //dynamically create current weather forecast
        $("#weatherNow").append(
          "<h3>" + data.name + " (" + moment().format("L") + ")" + "</h3>"
        );
        //appends current Weather Icon
        var weatherIcon = data.weather[0].icon;
        console.log(weatherIcon);
        var iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        // $("#weatherNow").append("<img>").addClass("iconImg");
        // $("iconImg").attr("src", iconURL);
        $("#weatherNow").append(`<img src = "${iconURL}"/>`);
        console.log(iconURL);
        //appends current Temp
        $("#weatherNow").append(
          "<h5>" + "Temp: " + data.main.temp + "F" + "</h5>"
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
    console.log(userInput);
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
        console.log(data);
        //for loop to append 5 dat forecast
        for (i = 0; i < data.list.length; i += 8) {
          $("#forecastFive")
            .addClass("card-body card-title")
            .append(data.dt_txt);
        }
      });
  });
});
