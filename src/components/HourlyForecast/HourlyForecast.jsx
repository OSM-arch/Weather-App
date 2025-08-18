import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";
import './HourlyForecast.css';
import {useSelector} from "react-redux";
import {
    hourlyForecast_Selector
} from "../../store/selectors/weatherForcast_Selectors/main_Selectors/hourlyForecast_Selector.js";

function HourlyForecast() {

    const hourlyForecast = useSelector(hourlyForecast_Selector);

    const cards = () => hourlyForecast.map((item, index) => <div key={index}
        className='hourlyForecastCard bg_glass'
    >
        <div>{item.time}</div>
        <div>
            {
                item.icon.length > 0 ? <img
                    src={item.icon}
                    alt="Weather icon"
                /> : ''
            }
        </div>
        <div>{item.temperature}</div>
    </div>)

    return (
        <div className='mt-5'>
            <div className='text-2xl p-2'>Hourly Forecast</div>
            <div className='hourlyForecastContainer scrollbar'>
                {cards()}
            </div>
        </div>
    )
}

export default HourlyForecast;