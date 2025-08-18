import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {temperatureUnit_Selector} from "../../store/selectors/params_Selectors/temperatureUnit_Selector.js";
import {distanceUnit_Selector} from "../../store/selectors/params_Selectors/distanceUnit_Selector.js";
import {clock_system_Selector} from "../../store/selectors/params_Selectors/clock_system_Selector.js";
import {setClockSystem, setDistanceUnit, setTempUnit} from "../../store/features/params_Slice.js";

function Params({onSetViewParams}) {

    // ------------------ Selectors ------------------- //
    const temp_unit = useSelector(temperatureUnit_Selector);
    const distance_unit = useSelector(distanceUnit_Selector);
    const clock_system = useSelector(clock_system_Selector);

    // ------------------ Dispatch ------------------- //
    const dispatch = useDispatch();

    // ------------------ Refs ------------------- //
    const cInputRef = useRef(null);
    const fInputRef = useRef(null);
    const kmInputRef = useRef(null);
    const milesInputRef = useRef(null);
    const h24InputRef = useRef(null);
    const h12InputRef = useRef(null);

    // ------------------ States ------------------- //
    const [isOpen, setIsOpen] = useState(true);

    // ------------------ Hooks ------------------- //
    useEffect(() => {
        // temp_unit
        switch (true) {
           case cInputRef.current.value === temp_unit:
               cInputRef.current.checked = true;break;
           case fInputRef.current.value === temp_unit:
               fInputRef.current.checked = true;break;
        }

        // distance_unit
        switch (true) {
            case kmInputRef.current.value === distance_unit:
                kmInputRef.current.checked = true;break;
            case milesInputRef.current.value === distance_unit:
                milesInputRef.current.checked = true;break;
        }

        // clock_system
        switch (true) {
            case h24InputRef.current.value === clock_system:
                h24InputRef.current.checked = true;break;
            case h12InputRef.current.value === clock_system:
                h12InputRef.current.checked = true;break;
        }
    }, []);

    useEffect(() => {
        [h24InputRef, h12InputRef, cInputRef, fInputRef, kmInputRef, milesInputRef].forEach((ref) => {
            ref.current.addEventListener('click', (event) => {
                handleClick(event);
            })
        });
    }, [h24InputRef, h12InputRef, cInputRef, fInputRef, kmInputRef, milesInputRef]);

    // ------------------ Methods ------------------- //
    const handleClick = (event) => {
        const fieldset = event.currentTarget.parentElement.parentElement.dataset.field;
        const value = event.currentTarget.value;

        switch (fieldset) {
            case 'clock_system':
                dispatch(setClockSystem(value));break;
            case 'temp_unit':
                dispatch(setTempUnit(value));break;
            case 'distance_unit':
                dispatch(setDistanceUnit(value));break;
        }
    }

    return (<>
        {isOpen && (
            <div className='modalContainer'>
                <div className='modalSubContainer'>

                    <fieldset className='fieldset' data-field='clock_system'>
                        <legend className='legend'>Time Format</legend>
                        <label className='label1'>
                            <input type="radio" name="timeFormat" value="h24" ref={h24InputRef} />
                            24-hour
                        </label>
                        <label className='label2'>
                            <input type="radio" name="timeFormat" value="h12" ref={h12InputRef} />
                            12-hour (AM/PM)
                        </label>
                    </fieldset>

                    <fieldset className='fieldset' data-field='distance_unit'>
                        <legend className='legend'>Distance Unit</legend>
                        <label className='label1'>
                            <input type="radio" name="distanceUnit" value="km" ref={kmInputRef} />
                            Kilometers (km)
                        </label>
                        <label className='label2'>
                            <input type="radio" name="distanceUnit" value="miles" ref={milesInputRef} />
                            Miles
                        </label>
                    </fieldset>

                    <fieldset className='fieldset' data-field='temp_unit'>
                        <legend className='legend'>Temperature Unit</legend>
                        <label className='label1'>
                            <input type="radio" name="tempUnit" value="C" ref={cInputRef} />
                            Celsius (C°)
                        </label>
                        <label className='label2'>
                            <input type="radio" name="tempUnit" value="F" ref={fInputRef} />
                            Fahrenheit
                        </label>
                    </fieldset>

                    {/* Close button */}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onSetViewParams(false);
                        }}
                        className="close_button"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )}
    </>)
}

export default Params;