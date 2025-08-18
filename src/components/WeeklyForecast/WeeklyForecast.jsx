import './WeeklyForecast.css';
import {useSelector} from "react-redux";
import {
    weeklyForecast_Selector
} from "../../store/selectors/weatherForcast_Selectors/main_Selectors/weeklyForecast_Selector.js";

function WeeklyForecast() {

    const weeklyForecast = useSelector(weeklyForecast_Selector);

    const barWidth = (item) => {
        const average = item.average_temperature;
        const max = item.max_temperature;

        return (average * 100) / max;
    }

    const rows = () => weeklyForecast.map((item, index) => <div key={index}
        className='grid grid-cols-[30%_20%_50%]'
    >
        <div className='flex flex-row flex-nowrap justify-start items-center'>{item.day}</div>
        <div className='flex flex-col flex-nowrap justify-center items-center'>
            {
                item.icon.length > 0 ? <img
                    src={item.icon}
                    alt="Weather icon"
                    className='h-full'
                /> : ''
            }
        </div>
        <div className='flex flex-row flex-nowrap gap-4 justify-center items-center'>
            <div>{item.average_temperature}</div>
            <div className='temperatureBarWrapper'>
                <div className='temperatureBar' style={{width: `${barWidth(item)}%`}}></div>
            </div>
            <div>{item.max_temperature}</div>
        </div>
    </div>)

    return (
        <div className='mt-5'>
            <div className='text-2xl p-2'>7-Day Forecast</div>
            <div className='grid grid-cols-1 w-full bg_glass '>
                <div className='weeklyForecastRowsContainer'>
                    {rows()}
                </div>
            </div>
        </div>
    )
}

export default WeeklyForecast;