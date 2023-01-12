const weatherP = [];
const today = {};

async function getWeather(city = "Santos", lang = "pt_br", units = "metric") {
    try {
        //get currrent temperature and forecast
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=362b4128cbee127097cbd92b54543c42&units=${units}`)
        const weatherData = await weather.json();

        //process json current temperature data
        today.maxTemp = weatherData.main.temp_max;
        today.minTemp = weatherData.main.temp_min;
        today.nowTemp = weatherData.main.temp;
        today.feelTemp = weatherData.main.feels_like;
        today.humidity = weatherData.main.humidity;
        today.weatherDesc = weatherData.weather[0].description;
        today.weatherIcon = weatherData.weather[0].icon;
        today.name = weatherData.name;
        today.unit = units;
        today.lang = lang;

        weatherP.push(today);
        display();
    } catch {
        console.log(city, lang, units, today);
        if (today.lang == "pt_br") {
            alert("Erro, por favor tente outra vez!");
            location.reload();
        }else {
            alert("Error, please try again!");
            location.reload();
        }
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
    if (today.lang == "pt_br" && today.unit == "metric") {
        dispFeels.innerHTML = "Sensação de: " + Math.round(today.feelTemp) + "°C";
        dispMax.innerHTML = "Max: " + Math.round(today.maxTemp) + "°C";
        dispMin.innerHTML = "Min: " + Math.round(today.minTemp) + "°C";
    } else if (today.lang == "en" && today.unit == "metric") {
        dispFeels.innerHTML = "Feels like: " + Math.round(today.feelTemp) + "°C";
        dispMax.innerHTML = "Max: " + Math.round(today.maxTemp) + "°C";
        dispMin.innerHTML = "Min: " + Math.round(today.minTemp) + "°C";
    } else if (today.lang == "en" && today.unit == "imperial") {
        dispFeels.innerHTML = "Feels like: " + Math.round(today.feelTemp) + "°F";
        dispMax.innerHTML = "Max: " + Math.round(today.maxTemp) + "°F";
        dispMin.innerHTML = "Min: " + Math.round(today.minTemp) + "°F";
    }else {
        dispFeels.innerHTML = "Sensação de: " + Math.round(today.feelTemp) + "°F";
        dispMax.innerHTML = "Max: " + Math.round(today.maxTemp) + "°F";
        dispMin.innerHTML = "Min: " + Math.round(today.minTemp) + "°F";
    }
    
    const container = document.querySelector(".container");
    const citySearch = document.getElementById("citySearch");
    const cityBtn = document.getElementById("cityBtn");
    if (today.unit == "metric") {
            //change the color of container by temperature °C

        Math.round(today.nowTemp) >= 30 ? container.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 29 && Math.round(today.nowTemp) >= 20 ? container.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 19 && Math.round(today.nowTemp) >= 15 ? container.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 14 && Math.round(today.nowTemp) >= 10 ? container.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 9 && Math.round(today.nowTemp) >= 0 ? container.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            container.style.backgroundColor = "rgba(56, 163, 165, 0.7)";

        Math.round(today.nowTemp) >= 30 ? citySearch.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 29 && Math.round(today.nowTemp) >= 20 ? citySearch.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 19 && Math.round(today.nowTemp) >= 15 ? citySearch.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 14 && Math.round(today.nowTemp) >= 10 ? citySearch.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 9 && Math.round(today.nowTemp) >= 0 ? citySearch.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            citySearch.style.backgroundColor = "rgba(56, 163, 165, 0.7)";

        Math.round(today.nowTemp) >= 30 ? cityBtn.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 29 && Math.round(today.nowTemp) >= 20 ? cityBtn.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 19 && Math.round(today.nowTemp) >= 15 ? cityBtn.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 14 && Math.round(today.nowTemp) >= 10 ? cityBtn.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 9 && Math.round(today.nowTemp) >= 0 ? cityBtn.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            cityBtn.style.backgroundColor = "rgba(56, 163, 165, 0.7)";
    } else {

        //change the color of container by temperature °F
        Math.round(today.nowTemp) >= 86 ? container.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 84 && Math.round(today.nowTemp) >= 68 ? container.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 66 && Math.round(today.nowTemp) >= 59 ? container.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 57 && Math.round(today.nowTemp) >= 50 ? container.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 48 && Math.round(today.nowTemp) >= 32 ? container.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            container.style.backgroundColor = "rgba(56, 163, 165, 0.7)";

        Math.round(today.nowTemp) >= 86 ? citySearch.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 84 && Math.round(today.nowTemp) >= 68 ? citySearch.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 66 && Math.round(today.nowTemp) >= 59 ? citySearch.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 57 && Math.round(today.nowTemp) >= 50 ? citySearch.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 48 && Math.round(today.nowTemp) >= 32 ? citySearch.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            citySearch.style.backgroundColor = "rgba(56, 163, 165, 0.7)";

        Math.round(today.nowTemp) >= 86 ? cityBtn.style.backgroundColor = "rgba(240, 97, 97, 0.7)" : 
        Math.round(today.nowTemp) <= 84 && Math.round(today.nowTemp ) >= 68 ? cityBtn.style.backgroundColor = "rgba(235, 120, 107, 0.7)" : 
        Math.round(today.nowTemp) <= 66 && Math.round(today.nowTemp ) >= 59 ? cityBtn.style.backgroundColor = "rgba(243, 168, 113, 0.7)" : 
        Math.round(today.nowTemp) <= 57 && Math.round(today.nowTemp ) >= 50 ? cityBtn.style.backgroundColor = "rgba(128, 237, 15, 0.7)" : 
        Math.round(today.nowTemp) <= 48 && Math.round(today.nowTemp ) >= 32 ? cityBtn.style.backgroundColor = "rgba(87, 204, 153, 0.7)" : 
            cityBtn.style.backgroundColor = "rgba(56, 163, 165, 0.7 )";
    }

    //change texts if pt-br
    if (today.lang == "pt_br") {
        document.querySelector("input[type='text']").placeholder = "Busque por uma cidade...";
    } else {
        document.querySelector("input[type='text']").placeholder = "Search for a new city...";
    }

    //change current temperature unit if necessary
    const currentUnit = document.querySelector(".degree");
    if (today.unit == "metric") {
        currentUnit.innerHTML = "°C";
    }else {
        currentUnit.innerHTML = "°F";
    }
}

const search = (()=> {
    //const btnSearch = document.getElementById("cityBtn");
    const formSearch = document.getElementById("searchForm");
    const inSearch = document.getElementById("citySearch");

    formSearch.addEventListener("submit", (e)=> {
        e.preventDefault();
        const cityName = inSearch.value;
        const units = document.querySelector("input[name='degrees']:checked").value;
        const lang = document.querySelector("input[name='lan']:checked").value;
        getWeather(cityName, lang, units);
        inSearch.value = "";
    })
})();