import {configureStore} from "@reduxjs/toolkit";
import icon_Slice from "../features/icon_Slice.js";
import city_Slice from "../features/city_Slice.js";
import weatherForecast_Slice from "../features/weatherForcast_Slice.js";
import params_Slice from "../features/params_Slice.js";

const store = configureStore({
    reducer: {
        iconStore: icon_Slice,
        cityStore: city_Slice,
        weatherForecastStore: weatherForecast_Slice,
        paramsStore: params_Slice
    }
})

export default store;