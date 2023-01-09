const weatherP = [];
const today = {};

async function getWeather() {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=362b4128cbee127097cbd92b54543c42&units=metric`);
    const weatherData = await weather.json();
    console.log(weatherData);

    today.maxTemp = weatherData.main.temp_max;
    today.minTemp = weatherData.main.temp_min;
    today.nowTemp = weatherData.main.temp;
    today.feelTemp = weatherData.main.feels_like;
    today.humidity = weatherData.main.humidity;
    today.weatherDesc = weatherData.weather[0].description;
    today.weatherIcon = weatherData.weather[0].icon;

    weatherP.push(today);
    console.log(weatherP);
}
let cityName = "Santos";
getWeather();