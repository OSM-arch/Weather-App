import './CurrentWeather.css';
import {useSelector} from "react-redux";
import {currentWeather_Selector} from "../../store/selectors/weatherForcast_Selectors/main_Selectors/currentWeather_Selector.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";

function CurrentWeather() {

    const currentWeather = useSelector(currentWeather_Selector);

    return (
        <div className='flex_col_center_center_gap_2'>
            <div>{currentWeather.current_date}</div>
            <div>{currentWeather.current_time}</div>

            <div>
                {
                    currentWeather.icon.length > 0 ? <img
                        src={currentWeather.icon}
                        alt="Weather icon"
                        className="w-full max-w-full h-25 object-cover"
                    /> : <FontAwesomeIcon icon={faSun} size='3x' className='text-orange-400' />
                }
            </div>
            <div className='text-6xl'>{currentWeather.temperature}</div>

            <div className='text-3xl'>{currentWeather.condition_text}</div>
            <div className='font-medium'>Feels like {currentWeather.feels_like}</div>
        </div>
    )
}

export default CurrentWeather;