import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faDroplet, faEye, faSun, faWind} from "@fortawesome/free-solid-svg-icons";
import './WeatherDetailsToggle.css';
import {useSelector} from "react-redux";
import {icon_lg_Selector} from "../../store/selectors/icon_Selectors/icon_lg_Selector.js";
import {
    weatherDetails_Selector
} from "../../store/selectors/weatherForcast_Selectors/main_Selectors/weatherDetails_Selector.js";

function WeatherDetailsToggle() {

    const icon_lg = useSelector(icon_lg_Selector);
    const weatherDetails = useSelector(weatherDetails_Selector);

    return (
        <div className='w-full mt-5 bg_glass'>
            <input type="checkbox" id="toggle-details" className="peer hidden"/>

            <label htmlFor="toggle-details"
                   className='flex_row_between text-xl p-2 cursor-pointer'
                   onClick={(event) => event.currentTarget.firstElementChild.classList.toggle("rotate-180")}
            >
                Weather Details
                <span>
                    <FontAwesomeIcon className='rotate-180'
                                     icon={faAngleUp}
                    />
                </span>
            </label>

            <div className='weather_details_container'>
                <div className='grid_cols_2 px-6'>

                    <div className='grid_rows_3'>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faWind}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>Wind</div>
                                <div className='section_subtitle'>{weatherDetails.wind_speed}</div>
                            </div>
                        </div>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faSun}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>UV Index</div>
                                <div className='section_subtitle'>{weatherDetails.uv.index} ({weatherDetails.uv.level})</div>
                            </div>
                        </div>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faSun}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>Sunrise</div>
                                <div className='section_subtitle'>{weatherDetails.sunrise}</div>
                            </div>
                        </div>
                    </div>

                    <div className='grid_rows_3'>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faDroplet}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>Humidity</div>
                                <div className='section_subtitle'>{weatherDetails.humidity}%</div>
                            </div>
                        </div>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faEye}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>Visibility</div>
                                <div className='section_subtitle'>{weatherDetails.visibility}</div>
                            </div>
                        </div>
                        <div className='section grid_cols_20_75'>
                            <FontAwesomeIcon icon={faSun}
                                             size={icon_lg}
                            />
                            <div>
                                <div className='section_title'>Sunset</div>
                                <div className='section_subtitle'>{weatherDetails.sunset}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeatherDetailsToggle;