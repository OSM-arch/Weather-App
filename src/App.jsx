import React from 'react';
import Header from "./components/Header/Header.jsx";
import {Provider} from "react-redux";
import store from "./store/store/store.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import WeatherDetailsToggle from "./components/WeatherDetailsToggle/WeatherDetailsToggle.jsx";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast.jsx";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast.jsx";
import WeatherAPI from "./services/weatherAPI.jsx";
import LoadingPage from "./components/LoadingPage/LoadingPage.jsx";
import {useState} from "react";

function App() {

    const [isReady, setIsReady] = useState(false);

    return (
      <Provider store={store}>
          <WeatherAPI onSetIsReady={setIsReady} />
          {!isReady && <LoadingPage />}
          {isReady && <>
              <Header />
              <main className='mt-5 w-full'>
                  <CurrentWeather />
                  <WeatherDetailsToggle />
                  <HourlyForecast />
                  <WeeklyForecast />
              </main>
          </>}
      </Provider>
    )
}

export default App;
