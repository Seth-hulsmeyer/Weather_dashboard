$("document").ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault();
    var userInput = $("#inlineFormInputName2").val();
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
        //dynamically create forecast
        $("#weatherNow").append(
          "<h3>" +
            data.name +
            " (" +
            moment(data.dt).format("L") +
            ")" +
            "</h3>"
        );

        $("#weatherNow").append(data.main.temp);
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
      });
  });
});
