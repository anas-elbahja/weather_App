const apiKey = "37ecae12123b83e8a9e4bba2b42dfcbc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = $(".input");
const searchbtn = $("button");
const weatherIcon = $(".weather-icon");
const info = $(".weather");

async function changeInfo(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    $(".error").css("display", "block");
    info.css("display", "none");
  } else {
    var data = await response.json();
    console.log(data);
    const code = data.sys.country;
    info.css("display", "block");
    $(".error").css("display", "none");

    $("h1").text(Math.round(data.main.temp) + "°c");
    $("h2").text(data.name);
    $(".humidity").text(data.main.humidity + "%");
    $(".wind").text(data.wind.speed + " km/h");

    if (data.weather[0].main == "Clear") {
      weatherIcon.attr("src", "images/clear.png");
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.attr("src", "images/clouds.png");
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.attr("src", "images/rain.png");
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.attr("src", "images/drizzle.png");
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.attr("src", "images/mist.png");
    }
    getCountries(code);
  }
}

searchbtn.click(() => {
  changeInfo(searchBox.val());
});

searchBox.keypress((event) => {
  if (event.key === "Enter") {
    changeInfo(searchBox.val());
  }
});

async function getCountries(ourCode) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  // Map country codes to names
  const countryMapping = {};
  // const ourCode = "IT"; // Use a string for the country code
  countries.forEach((country) => {
    const code = country.cca2; // ISO Alpha-2 code
    const name = country.name.common;
    countryMapping[code] = name;
  });

  $("h3").text(countryMapping[ourCode]);
  // console.log(countryMapping[ourCode]); // Access the country name using the code
}
