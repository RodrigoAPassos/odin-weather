const weatherP = [];
const today = {};

async function getWeather(city = "Santos") {
    //get currrent temperature and forecast
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=362b4128cbee127097cbd92b54543c42&units=metric`)
    const weatherF = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=362b4128cbee127097cbd92b54543c42&units=metric`);
    const weatherData = await weather.json();
    const weatherDataF = await weatherF.json();
    //console.log(weatherData);

    //process json current temperature data
    today.maxTemp = weatherData.main.temp_max;
    today.minTemp = weatherData.main.temp_min;
    today.nowTemp = weatherData.main.temp;
    today.feelTemp = weatherData.main.feels_like;
    today.humidity = weatherData.main.humidity;
    today.weatherDesc = weatherData.weather[0].description;
    today.weatherIcon = weatherData.weather[0].icon;
    today.name = weatherData.name;

    weatherP.push(today);
    //console.log(weatherP);
    //console.log(weatherDataF);
    display();
}

getWeather();

function display () {
    //display city name
    const dispCity = document.querySelector(".cityName");
    dispCity.innerHTML = today.name;

    //display temperature
    const dispTemp = document.querySelector(".currentTemp");
    dispTemp.innerHTML = Math.round(today.nowTemp);

    //display weather
    const dispWeatherIcon = document.querySelector(".wIcon");
    const icon = document.getElementById("weatherIcon");
    icon.src = `http://openweathermap.org/img/wn/${today.weatherIcon}@4x.png`;
    const dispWeatherDesc = document.querySelector(".wDesc");
    dispWeatherDesc.innerHTML = today.weatherDesc;
}

const search = (()=> {
    const btnSearch = document.getElementById("cityBtn");
    const inSearch = document.getElementById("citySearch");

    btnSearch.addEventListener("click", ()=> {
        const cityName = inSearch.value;
        getWeather(cityName);
    })
})();