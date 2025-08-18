import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faLocationDot, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {icon_inverseBool_Selector} from "../../store/selectors/icon_Selectors/inverseBool_Selector.js";
import {icon_lg_Selector} from "../../store/selectors/icon_Selectors/icon_lg_Selector.js";
import {useState} from "react";
import SearchBar from "./SearchBar.jsx";
import './Header.css';
import {
    city_country_Selector
} from "../../store/selectors/weatherForcast_Selectors/header_Selectors/city_country_Selector.js";
import Params from "./Params.jsx";

function Header() {
    const inverseBool = useSelector(icon_inverseBool_Selector);
    const icon_lg       = useSelector(icon_lg_Selector);
    const city_country = useSelector(city_country_Selector);

    const [viewSearchBar, setViewSearchBar] = useState(false);
    const [viewParams, setViewParams] = useState(false);

    return (
        <header className='flex-wrap flex_row_nowrap_between_center'>
            <div className='flex_row_nowrap_evenly_center'>
                <FontAwesomeIcon icon={faLocationDot}
                                 inverse={inverseBool}
                                 size={icon_lg}
                />
                <div>{city_country}</div>
            </div>

            <div className='flex_row_nowrap_evenly_center gap-2'>
                <FontAwesomeIcon className='bg_glass cursor-pointer hover:backdrop-brightness-105'
                                 onClick={() => setViewSearchBar(!viewSearchBar)}
                                 icon={faMagnifyingGlass}
                                 inverse={inverseBool}
                                 size={icon_lg}
                />
                <FontAwesomeIcon className='bg_glass cursor-pointer hover:backdrop-brightness-105'
                                 onClick={() => setViewParams(true)}
                                 icon={faGear}
                                 inverse={inverseBool}
                                 size={icon_lg}
                />
            </div>
            {viewSearchBar && (<SearchBar />)}
            {viewParams && (<Params onSetViewParams={setViewParams} />)}
        </header>
    )
}

export default Header;