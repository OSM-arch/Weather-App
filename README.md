# 🌦️ Weather App

A modern, responsive weather application built with **React**, **Tailwind**.  
The app fetches real-time weather data and displays the **current, hourly, and weekly forecasts** with a clean UI.  

---

## 📑 Table of Contents
- [Introduction](#-introduction)  
- [Features](#-features)  
- [Project Structure](#-project-structure)   
- [Configuration](#-configuration)  
- [Dependencies](#-dependencies)  
- [Contributors](#-contributors)   

---

## 🚀 Introduction
The **Weather App** provides users with up-to-date weather information for any location.  
It integrates with a weather API to deliver:  
- Current conditions  
- Hourly forecasts  
- 7-day forecasts  
- Weather icons and details  

Designed for simplicity and speed.

---

## ✨ Features
- 🌍 Search for any city worldwide  
- 🌡️ Display of current temperature, humidity, wind, and conditions  
- ⏳ Hourly forecast with weather icons  
- 📅 Weekly forecast with expandable details  
- 🎨 Responsive design with reusable components  

---

## 📂 Project Structure
```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   └── SearchBar.jsx
│   ├── CurrentWeather/
│   │   ├── CurrentWeather.jsx
│   │   ├── CurrentWeather.css
│   │   └── WeatherIcon.jsx
│   ├── WeatherDetailsToggle/
│   │   ├── WeatherDetailsToggle.jsx
│   │   └── WeatherDetailsToggle.css
│   ├── HourlyForecast/
│   │   ├── HourlyForecast.jsx
│   │   ├── HourlyForecast.css
│   │   └── HourlyForecastItem.jsx
│   └── WeeklyForecast/
│       ├── WeeklyForecast.jsx
│       ├── WeeklyForecast.css
│       └── DailyForecastItem.jsx
│
├── services/
│   └── weatherAPI.jsx   # Handles API calls
│
├── assets/
│   ├── icons/
│   └── images/
│
├── App.jsx
├── App.css
└── index.js
```
---

## ▶️ Usage
1. Open the app in your browser https://osm-arch.github.io/Weather-App/.  
2. Enter a city name in the search bar.  
3. View the **current, hourly, and weekly forecasts**.  

---

## 📦 Dependencies
- **React** (UI framework)  
- **Axios / Fetch API** (for HTTP requests)  
- **Tailwind** (for styling)
- 
---

## 👥 Contributors
- [OSM-arch](https://github.com/OSM-arch)  
