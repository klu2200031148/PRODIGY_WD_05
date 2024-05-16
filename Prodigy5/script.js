let result=document.getElementById("result");
let searchButton=document.getElementById("search-btn");
let cityInput=document.getElementById("city");
const apiKey='e5fc364876ccf633e2fc4f7ac2fc8cb8';
let getWeather=() => {
  let cityValue=cityInput.value;
  if (cityValue.length===0) {
    result.innerHTML=`<h3 class="msg">Please enter a city name</h3>`;
  }
    else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
    cityInput.value = "";   
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let windSpeed=data.wind.speed;
        let humidity=data.main.humidity;

        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">Min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">Max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        <div class="extra-details">
            <br> <h3>Wind Speed: ${windSpeed} m/s</h3><br>
            <h3>Humidity: ${humidity}%</h3>
        </div>
        `;
      })
            .catch((error) => {
        result.innerHTML = `<h3 class="msg">${error.message}</h3>`;
      });
  }
};
searchButton.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
