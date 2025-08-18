import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {geoCity_Selector} from "../store/selectors/city_Selectors/geoCity_Selector.js";
import {searchCity_Selector} from "../store/selectors/city_Selectors/searchCity_Selector.js";
import {useCallback, useEffect, useState} from "react";
import {
    setCityCountry,
    setCurrentWeather,
    setHourlyForecast,
    setWeatherDetails, setWeeklyForecast
} from "../store/features/weatherForcast_Slice.js";
import {temperatureUnit_Selector} from "../store/selectors/params_Selectors/temperatureUnit_Selector.js";
import {clock_system_Selector} from "../store/selectors/params_Selectors/clock_system_Selector.js";
import {distanceUnit_Selector} from "../store/selectors/params_Selectors/distanceUnit_Selector.js";
import {setGeoCity} from "../store/features/city_Slice.js";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function WeatherAPI({onSetIsReady}) {

    // ------------------ Selectors ------------------- //
    const geoCity = useSelector(geoCity_Selector);
    const searchCity = useSelector(searchCity_Selector);
    const temp_unit = useSelector(temperatureUnit_Selector);
    const clock_system = useSelector(clock_system_Selector);
    const distance_unit = useSelector(distanceUnit_Selector);

    // ------------------ Dispatch ------------------- //
    const dispatch = useDispatch();

    // ------------------ States ------------------- //
    const [city, setCity] = useState('');
    const [weatherApi, setWeatherApi] = useState(null);

    // ------------------ Callbacks ------------------- //
    const getFullWeatherCallback = useCallback((city) => {
        getFullWeather(city);
    }, [city]);

    // ------------------ Hooks ------------------- //
    useEffect(() => {
        getGeoCity();
        if (geoCity.length <= 0) dispatch(setGeoCity('Rabat'));
    }, []);

    useEffect(() => {
        setCity(searchCity.length > 0 ? searchCity : geoCity);
    }, [searchCity, geoCity]);

    useEffect(() => {
        getFullWeatherCallback(city);
    }, [city]);

    useEffect( () => {
        if (!weatherApi) return;

        // Header : city_country;
        getCityCountry(weatherApi).then((city_country) => {
            dispatch(setCityCountry(city_country));
        });

        // Main : currentWeather;
        getCurrentWeather(weatherApi).then((currentWeather) => {
           dispatch(setCurrentWeather(currentWeather));
        });

        // Main : weatherDetails;
        getWeatherDetails(weatherApi).then((weatherDetails) => {
            dispatch(setWeatherDetails(weatherDetails));
        });

        // Main : hourlyForecast;
        getHourlyForecast(weatherApi).then((hourlyForecast) => {
            dispatch(setHourlyForecast(hourlyForecast));
        });

        // Main : weeklyForecast;
        getWeeklyForecast(weatherApi).then((weeklyForecast) => {
            dispatch(setWeeklyForecast(weeklyForecast));
        });

        onSetIsReady(true);
    }, [temp_unit, clock_system, distance_unit, weatherApi, dispatch]);

    // ------------------ Methods ------------------- //
    const getGeoCity = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch(setGeoCity(`${position.coords.latitude},${position.coords.longitude}`));
        });
    }

    const getFullWeather = q => {
        /*
            Query parameter based on which data is sent back. It could be following:
            -- Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
            -- city name e.g.: q=Paris
        */

        if (!q) return;

         axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=7`)
            .then(function (response) {
                // handle success
                setWeatherApi(response);
                // console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const getCityCountry = async (weatherApi) => {
         if (!weatherApi || !weatherApi.data || !weatherApi.data.location) {
             return;
         }
        return `${weatherApi.data.location.name}, ${weatherApi.data.location.country}`;
    }

    const getCurrentWeather = async (weatherApi) => {
        if (!weatherApi || !weatherApi.data || !weatherApi.data.current) {
            return;
        }

        const date_time = weatherApi.data.current.last_updated.split(' ');
        // current_date
        const date = new Date(date_time[0]);
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
        };
        const current_date = new Intl.DateTimeFormat("en-US", options).format(date);

        // current_time
        let current_time = '';
        switch (clock_system) {
            case 'h24':
                current_time = date_time[1];
                break;
            case 'h12':
                current_time = formatTo12Hour(date_time);
                break;
        }

        // condition_text
        const condition_text = weatherApi.data.current.condition.text;

        // icon
        const icon = weatherApi.data.current.condition.icon;

        // temperature && feels_like
        let feels_like = ''
        let temperature = '';
        switch (temp_unit) {
            case 'C':
                 temperature = `${Math.round(weatherApi.data.current.temp_c)}°`;
                 feels_like = `${Math.round(weatherApi.data.current.feelslike_c)}°`
                 break;
            case 'F':
                 temperature = `${Math.round(weatherApi.data.current.temp_f)}`;
                feels_like = `${Math.round(weatherApi.data.current.feelslike_f)}`
                 break;
        }

        return {
            temperature: temperature,
            feels_like: feels_like,
            icon: icon,
            condition_text: condition_text,
            current_date: current_date,
            current_time: current_time
        }
    }

    const getWeatherDetails = async (weatherApi) => {
        if (!weatherApi || !weatherApi.data || !weatherApi.data.current || !weatherApi.data.forecast) {
            return;
        }

        // wind_speed && visibility
        let wind_speed = '';
        let visibility = '';
        switch (distance_unit) {
            case 'km':
                wind_speed = `${weatherApi.data.current.wind_kph}kph`;
                visibility = `${weatherApi.data.current.vis_km}km`;
                break;
            case 'miles':
                wind_speed = `${weatherApi.data.current.wind_mph}mil`;
                visibility = `${weatherApi.data.current.vis_milies}`;
                break;
        }

        // uv
        const uv = {
            index: Math.round(weatherApi.data.current.uv),
            level: uv_level(Number(Math.round(weatherApi.data.current.uv)))
        }

        // humidity
        const humidity = weatherApi.data.current.humidity;

        // sunrise && sunset
        let sunrise = '';
        let sunset = '';
        switch (clock_system) {
            case 'h24':
                sunrise = formatTo24Hour(weatherApi.data.forecast.forecastday[0].astro.sunrise);
                sunset = formatTo24Hour(weatherApi.data.forecast.forecastday[0].astro.sunset);
                break;
            case 'h12':
                sunrise = weatherApi.data.forecast.forecastday[0].astro.sunrise;
                sunset = weatherApi.data.forecast.forecastday[0].astro.sunset;
                break;
        }

        return {
            wind_speed: wind_speed,
            uv: {
                index: uv.index,
                level: uv.level
            },
            humidity: humidity,
            visibility: visibility,
            sunrise: sunrise,
            sunset: sunset
        }
    }

    const getHourlyForecast = async (weatherApi) => {
        if (!weatherApi || !weatherApi.data || !weatherApi.data.forecast) {
            return;
        }

        const weather_24_array = weatherApi.data.forecast.forecastday[0].hour;
        const hourlyForecast = [];

        weather_24_array.forEach((obj) => {

            // time
            let time = ''
            switch (clock_system) {
                case 'h24':
                    time = obj.time.split(' ')[1];
                    break;
                case 'h12':
                    time = formatTo12Hour(obj.time);
                    break;
            }

            // icon
            const icon = obj.condition.icon;

            // temperature
            let temperature = '';
            switch (temp_unit) {
                case 'C':
                    temperature = `${Math.round(obj.temp_c)}°` ;
                    break;
                case 'F':
                    temperature = `${Math.round(obj.temp_f)}`;
                    break;
            }

            hourlyForecast.push({
                time: time,
                icon: icon,
                temperature: temperature
            });

        });

        return hourlyForecast;
    }

    const getWeeklyForecast = async (weatherApi) => {
        if (!weatherApi || !weatherApi.data || !weatherApi.data.forecast) {
            return;
        }

        const weeklyForecast_array = weatherApi.data.forecast.forecastday;
        const weeklyForecast = [];

        weeklyForecast_array.forEach((obj) => {
            // day
            const day = getStringDay(obj.date);

            // icon
            const icon = obj.day.condition.icon

            // max temperature && average temperature
            let maxTemperature = '';
            let averageTemperature = '';
            switch (temp_unit) {
                case 'C':
                    maxTemperature = `${Math.round(obj.day.maxtemp_c)}`;
                    averageTemperature = `${Math.round(obj.day.avgtemp_c)}`;
                    break;
                case 'F':
                    maxTemperature = `${Math.round(obj.day.maxtemp_f)}`;
                    averageTemperature = `${Math.round(obj.day.avgtemp_f)}`;
                    break;
            }

            weeklyForecast.push({
                day: day,
                icon: icon,
                max_temperature: maxTemperature,
                average_temperature: averageTemperature
            });

        });

        return weeklyForecast;
    }

    return <>
    </>
}

function getStringDay(stringDate) {
    let date = new Date(stringDate);
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return weekdays[date.getDay()];
}

function formatTo12Hour(time) {
    let date = new Date(time);
    let options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

function formatTo24Hour(time12h) {
    let [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    hours = parseInt(hours, 10);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    // Ensure two-digit hours
    let hoursStr = hours.toString().padStart(2, '0');
    return `${hoursStr}:${minutes}`;
}

function uv_level(uv) {
    switch (true) {
        case (uv >= 0 && uv <= 2):
            return "Low";
        case (uv >= 3 && uv <= 5):
            return "Mod";
        case (uv >= 6 && uv <= 7):
            return "High";
        case (uv >= 8 && uv <= 10):
            return "V.High";
        case (uv >= 11):
            return "Extreme";
        default:
            return "Invalid UV Index";
    }
}