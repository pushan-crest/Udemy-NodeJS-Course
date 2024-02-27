const request = require("postman-request");

// =======================================================

// formatting address
function addressformatter(address) {
  return address.split(" ").join("+");
}

// Geocoding - Nominatim

const geocode = function (address, findweather) {
  const geo_url = `https://nominatim.openstreetmap.org/search?q=${addressformatter(
    address
  )}&format=json&addressdetails=1&limit=1&polygon_svg=1`;
  fetch(geo_url)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      findweather(response[0].lat, response[0].lon);
    })
    .catch((err) => {
      console.log(err);
    });
};

// =======================================================

// Weather API - OpenWeatherMap

const findweather = function (lat, lon) {
  const url_unit = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d81654ee77493e14857e7684590abb66&units=metric`;

  request({ url: url_unit, json: true }, (error, response) => {
    // to convert response to json
    //   const data = JSON.parse(response.body);
    //   console.log(data.body);
    // with {json: true} we dont need to convert the output into json format
    //   console.log(response.body);
    //   if we want to avoid this we can use a parameter units= metric
    //   https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=imperial
    //   function to_celcius(temp) {
    //     return (temp - 273).toFixed(2);
    //   }

    // Enabling error handling
    if (error) {
      console.log("Could not fetch data");
    } else if (response.body.message) {
      console.log(response.body.message);
    } else {
      console.log(
        `there is currently ${response.body.main.temp} degree out but it feels like ${response.body.main.feels_like} at ${response.body.name}`
      );
    }
  });
};

// =======================================================

geocode("bhavnagar", findweather);
