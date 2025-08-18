import {createSlice} from "@reduxjs/toolkit";

const icon = {
    inverseBool: true,
    icon_lg    : 'lg'
};

const icon_Slice = createSlice({
    name: "icons",
    initialState: icon,
});

export default icon_Slice.reducer;