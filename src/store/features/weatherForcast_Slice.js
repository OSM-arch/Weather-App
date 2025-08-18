import {createSlice} from "@reduxjs/toolkit";

const weatherForecast_initial = {
    header: {
        city_country: ''
    },
    main: {
        currentWeather : {
            temperature: '',
            feels_like: '',
            icon: '',
            condition_text: '',
            current_date: '',
            current_time: ''
        },
        weatherDetails: {
            wind_speed: '',
            uv: {
                index: '',
                level: ''
            },
            humidity: '',
            visibility: '',
            sunrise: '',
            sunset: ''
            },
        hourlyForecast: [{
            time: '',
            icon: '',
            temperature: ''
        }],
        weeklyForecast: [{
            day: '',
            icon: '',
            max_temperature: '',
            average_temperature: ''
        }]
    }
}

const weatherForecast_Slice = createSlice({
    name: 'weatherForecast',
    initialState: weatherForecast_initial,
    reducers: {
        setCityCountry: (state, action) => {
            state.header.city_country = action.payload;
        },
        setCurrentWeather: (state, action) => {
            state.main.currentWeather = action.payload;
        },
        setWeatherDetails: (state, action) => {
            state.main.weatherDetails = action.payload;
        },
        setHourlyForecast : (state, action) => {
            state.main.hourlyForecast = action.payload;
        },
        setWeeklyForecast : (state, action) => {
            state.main.weeklyForecast = action.payload;
        }
    }
})

export const {
    setCityCountry,
    setCurrentWeather,
    setWeatherDetails,
    setHourlyForecast,
    setWeeklyForecast
} = weatherForecast_Slice.actions;
export default weatherForecast_Slice.reducer;