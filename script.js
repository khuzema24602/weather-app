const apiKey = "daaa065c9955b2b139e5dbcca8bf8a10";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityName = document.getElementById("city");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");

async function getWeather(city) {

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        console.log(response);

        // ✅ FIX: Sirf ek baar data ko parse karein
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.message);
        }

        // Ab data ko use karein
        cityName.innerHTML = data.name + ", " + data.sys.country;

        temperature.innerHTML = Math.round(data.main.temp) + "°C";

        description.innerHTML = data.weather[0].description;

        humidity.innerHTML = data.main.humidity + "%";

        wind.innerHTML = data.wind.speed + " m/s";

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const now = new Date();

        date.innerHTML = now.toLocaleString();

    }

    catch (error) {
        console.log(error);
        alert(error.message);
    }

}

searchBtn.addEventListener("click", () => {

    getWeather(cityInput.value.trim());

});

cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        getWeather(cityInput.value.trim());

    }

});

// Default City
getWeather("Lahore");