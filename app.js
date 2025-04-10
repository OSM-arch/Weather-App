document.addEventListener('DOMContentLoaded', async () => {
    setDate();
    const city = 'london';
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error) {
            displayError("Weather service unavailable. Please try again later.");
        }
    }
})

function setDate() {
    const date = new Date();
    document.querySelector('.date').textContent = `${weekDay(date.getDay())}, ${monthDay(date.getMonth())}, ${date.getDate()}, ${date.getFullYear()}`;
}

function weekDay(day) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[day];
}

function monthDay(month) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[month];
}



const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const APIkey = 'your_api_key_here';

searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const city = searchInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error) {
            displayError("Could not find weather for that location. Please check the city name.");
        }
    }
})


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
        if (!response.ok) {
            throw new Error("Weather data unavailable for this city. Please check the name and try again.");
        }
        else {
            return response;
        }
    }catch(error) {
        displayError("Weather data unavailable for this city. Please check the name and try again.");
    }
    
}


async function displayWeatherInfo(data) {
    const jsonData = await data.json();

    const city = jsonData.name;
    const feels_like = jsonData.main.feels_like;
    const temp = jsonData.main.temp;
    const humidity = jsonData.main.humidity;
    const weather = jsonData.weather[0].description;
    const iconCode = jsonData.weather[0].icon;
    const iconClass = getWeatherIconClass(iconCode);
    const iconColor = getWeatherIconColor(iconCode);
    
    document.querySelector('.city-name').textContent = city;
    document.querySelector('.temp-value').textContent = `${tempConvertion(temp)}°C`;
    document.querySelector('.temp-description').textContent = weather;
    document.querySelector('.weather-icon i').className = `${iconClass} icon`;
    document.querySelector('.weather-icon i').style.color = iconColor;
    document.querySelectorAll('.detail-value')[0].textContent = `${humidity}%`;
    document.querySelectorAll('.detail-value')[1].textContent = `${tempConvertion(feels_like)}`;
}

function getWeatherIconClass(iconCode) {
    const iconMap = {
        "01d": "wi-day-sunny",
        "01n": "wi-night-clear",
        "02d": "wi-day-cloudy",
        "02n": "wi-night-alt-cloudy",
        "03d": "wi-cloud",
        "03n": "wi-cloud",
        "04d": "wi-cloudy",
        "04n": "wi-cloudy",
        "09d": "wi-showers",
        "09n": "wi-showers",
        "10d": "wi-day-rain",
        "10n": "wi-night-alt-rain",
        "11d": "wi-thunderstorm",
        "11n": "wi-thunderstorm",
        "13d": "wi-snow",
        "13n": "wi-snow",
        "50d": "wi-fog",
        "50n": "wi-fog"
    };
    return `wi ${iconMap[iconCode] || "wi-na"}`;
}

function getWeatherIconColor(iconCode) {
    const colorMap = {
        "01d": "#FFD700",
        "01n": "#E6E6FA",
        "02d": "#87CEEB",
        "02n": "#708090",
        "03d": "#A9A9A9",
        "03n": "#A9A9A9",
        "04d": "#696969",
        "04n": "#696969",
        "09d": "#4682B4",
        "09n": "#4682B4",
        "10d": "#5F9EA0",
        "10n": "#1E3F66",
        "11d": "#9370DB",
        "11n": "#9370DB",
        "13d": "#B0E0E6",
        "13n": "#B0E0E6",
        "50d": "#D3D3D3",
        "50n": "#D3D3D3"
    };

    return colorMap[iconCode] || "#666666";
}

function tempConvertion(temp) {
    return Math.floor(temp - 273.15);
}


function displayError(error) {
    const errorMessageContainer = document.querySelector('.error-message-container');
    errorMessageContainer.style.display = 'flex';
    document.querySelector('.error-message span').textContent = error;
}

document.querySelector('.clear-button').addEventListener('click', () => {
    document.querySelector('.error-message-container').style.display = 'none';
})
