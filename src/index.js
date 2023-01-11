const weatherP = [];
const today = {};

async function getWeather(city = "Santos") {
    try {
        //get currrent temperature and forecast
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=362b4128cbee127097cbd92b54543c42&units=metric`)
        //const weatherF = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=362b4128cbee127097cbd92b54543c42&units=metric`);
        const weatherData = await weather.json();
        //const weatherDataF = await weatherF.json();
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
    } catch {
        alert("City not found, please try again!");
        location.reload();
    }
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

    //display weather description w/uppercase on first letters
    const currentDesc = today.weatherDesc;
    const words = currentDesc.split(" ");

    const upperDesc = words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
    dispWeatherDesc.innerHTML = upperDesc;

    //display current max/min/feels
    const dispFeels = document.querySelector(".feelsLike");
    const dispMax = document.querySelector(".tempMax");
    const dispMin = document.querySelector(".tempMin");

    dispFeels.innerHTML = "Feels like: " + Math.round(today.feelTemp) + "°C";
    dispMax.innerHTML = "Max: " + Math.round(today.maxTemp) + "°C";
    dispMin.innerHTML = "Min: " + Math.round(today.minTemp) + "°C";
}

const search = (()=> {
    //const btnSearch = document.getElementById("cityBtn");
    const formSearch = document.getElementById("searchForm");
    const inSearch = document.getElementById("citySearch");

    formSearch.addEventListener("submit", (e)=> {
        e.preventDefault();
        const cityName = inSearch.value;
        getWeather(cityName);
        inSearch.value = "";
    })
})();