import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchCity} from "../../store/features/city_Slice.js";
import cities from 'cities.json';

function SearchBar() {

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const [query, setQuery] = useState('');

    const uniqueCities = [...new Set(cities.map(cityObj => cityObj.name))];
    const filteredCities = uniqueCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 20);

    const setDatalistOptions = () => {
        return filteredCities.map((city, index) => (
            <option key={index} value={city}/>
        ));
    };

    const handleFocusOut = () => {
        dispatch(setSearchCity(inputRef.current.value));
    }

    return (
        <div className='block w-full mt-5'>
            <input type="text"
                   className="searchInput"
                   ref={inputRef}
                   list='cities'
                   placeholder="Search for a city..."
                   onBlur={handleFocusOut}
                   onChange={() => setQuery(inputRef.current.value)}
            />
            <datalist id='cities' className='datalist'>
                {setDatalistOptions()}
            </datalist>
        </div>
    )
}

export default SearchBar;