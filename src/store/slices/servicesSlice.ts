import {createSlice} from "@reduxjs/toolkit";

type T_ServicesSlice = {
    service_name: string
}

const initialState:T_ServicesSlice = {
    service_name: "",
}


const servicesSlice = createSlice({
    name: 'services',
    initialState: initialState,
    reducers: {
        updateServiceName: (state, action) => {
            state.service_name = action.payload
        }
    }
})

export const { updateServiceName} = servicesSlice.actions;

export default servicesSlice.reducer