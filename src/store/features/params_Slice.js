import {createSlice} from "@reduxjs/toolkit";

const initialParams = {
    temp_unit: 'C',
    distance_unit: 'km',
    clock_system: 'h24'
}

const params_Slice = createSlice({
    name: 'params',
    initialState: initialParams,
    reducers: {
        setClockSystem: (state, action) => {
            state.clock_system = action.payload;
        },
        setTempUnit: (state, action) => {
            state.temp_unit = action.payload;
        },
        setDistanceUnit: (state, action) => {
            state.distance_unit = action.payload;
        }
    }
})

export const {setClockSystem, setTempUnit, setDistanceUnit} = params_Slice.actions;
export default params_Slice.reducer;