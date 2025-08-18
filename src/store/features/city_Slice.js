import {createSlice} from "@reduxjs/toolkit";

const initialCity = {
    geoCity: '',
    searchCity: ''
};

const city_Slice = createSlice({
    name: 'city',
    initialState: initialCity,
    reducers: {
        setGeoCity: (state, action) => {state.geoCity = action.payload},
        setSearchCity: (state, action) => {state.searchCity = action.payload}
    }
})

export const { setSearchCity, setGeoCity } = city_Slice.actions;
export default city_Slice.reducer;